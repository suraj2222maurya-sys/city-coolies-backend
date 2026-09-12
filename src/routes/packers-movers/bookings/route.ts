import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/payments/razorpay";

import {
  calculatePackersMoversEstimate,
  type AccessType,
  type InventoryTier,
  type PackingTier,
} from "@/lib/services/packersMoversCatalog";

const COMPANY_WHATSAPP_NUMBER =
  process.env.CITY_COOLIES_WHATSAPP_NUMBER ||
  "919710946484";

type AddressData = {
  houseNumber?: unknown;
  buildingName?: unknown;
  street?: unknown;
  area?: unknown;
  landmark?: unknown;
  city?: unknown;
  state?: unknown;
  pinCode?: unknown;
  googleMapsUrl?: unknown;
};

type RequestBody = {
  customer?: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    movingDate?: unknown;
  };

  pickup?: AddressData;
  drop?: AddressData;

  move?: {
    serviceId?: unknown;
    distanceKm?: unknown;
    inventoryTier?: unknown;
    packingTier?: unknown;
    accessType?: unknown;
  };

  payment?: {
    razorpayOrderId?: unknown;
    razorpayPaymentId?: unknown;
    razorpaySignature?: unknown;
  };
};

type CleanAddress = {
  houseNumber: string;
  buildingName: string;
  street: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
  googleMapsUrl: string;
};

function clean(
  value: unknown,
  max = 180,
): string {
  return typeof value === "string"
    ? value.trim().slice(0, max)
    : "";
}

function bookingId(): string {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  return `CC-PM-${date}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;
}

function isGoogleMapsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      (
        host === "google.com" ||
        host.endsWith(".google.com") ||
        host === "maps.app.goo.gl" ||
        host === "goo.gl"
      )
    );
  } catch {
    return false;
  }
}

function cleanAddress(
  value: AddressData | undefined,
): CleanAddress {
  return {
    houseNumber: clean(value?.houseNumber, 120),
    buildingName: clean(value?.buildingName, 120),
    street: clean(value?.street, 180),
    area: clean(value?.area, 120),
    landmark: clean(value?.landmark, 120),
    city: clean(value?.city, 100),
    state: clean(value?.state, 100),
    pinCode: clean(value?.pinCode, 6),
    googleMapsUrl: clean(
      value?.googleMapsUrl,
      500,
    ),
  };
}

function validAddress(
  address: CleanAddress,
): boolean {
  return Boolean(
    address.houseNumber &&
    address.street &&
    address.area &&
    address.city &&
    address.state &&
    /^[0-9]{6}$/.test(address.pinCode) &&
    isGoogleMapsUrl(address.googleMapsUrl),
  );
}

function formatAddress(
  address: CleanAddress,
): string {
  return [
    address.houseNumber,
    address.buildingName,
    address.street,
    address.area,
    address.landmark,
    address.city,
    address.state,
    address.pinCode,
  ]
    .filter(Boolean)
    .join(", ");
}

function signaturesMatch(
  expectedSignature: string,
  receivedSignature: string,
): boolean {
  const expectedBuffer =
    Buffer.from(expectedSignature);

  const receivedBuffer =
    Buffer.from(receivedSignature);

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  );
}

function noteValue(value: unknown): string {
  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  return "";
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as RequestBody;

    const customerName =
      clean(body.customer?.name, 80);

    const phone =
      clean(body.customer?.phone, 20)
        .replace(/\D/g, "");

    const email =
      clean(body.customer?.email, 150);

    const movingDate =
      clean(body.customer?.movingDate, 20);

    const today =
      new Date().toISOString().slice(0, 10);

    if (
      customerName.length < 2 ||
      !/^[0-9]{10}$/.test(phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      ) ||
      !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(
        movingDate,
      ) ||
      movingDate < today
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter valid customer and moving-date details.",
        },
        { status: 400 },
      );
    }

    const pickup =
      cleanAddress(body.pickup);

    const drop =
      cleanAddress(body.drop);

    if (!validAddress(pickup)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter the complete Pickup Address and exact Google Maps location.",
        },
        { status: 400 },
      );
    }

    if (!validAddress(drop)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter the complete Drop Address and exact Google Maps location.",
        },
        { status: 400 },
      );
    }

    const serviceId =
      clean(body.move?.serviceId, 120);

    const distanceKm =
      Number(body.move?.distanceKm);

    const inventoryTier =
      clean(
        body.move?.inventoryTier,
        30,
      ) as InventoryTier;

    const packingTier =
      clean(
        body.move?.packingTier,
        30,
      ) as PackingTier;

    const accessType =
      clean(
        body.move?.accessType,
        30,
      ) as AccessType;

    if (
      !serviceId ||
      !Number.isFinite(distanceKm) ||
      distanceKm <= 0 ||
      !["light", "standard", "heavy"].includes(
        inventoryTier,
      ) ||
      !["basic", "standard", "premium"].includes(
        packingTier,
      ) ||
      ![
        "lift",
        "stairs-1",
        "stairs-2",
        "stairs-3",
        "stairs-4plus",
      ].includes(accessType)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected moving details are invalid.",
        },
        { status: 400 },
      );
    }

    const estimate =
      calculatePackersMoversEstimate({
        serviceId,
        distanceKm,
        inventoryTier,
        packingTier,
        accessType,
      });

    if (!estimate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected moving plan is invalid.",
        },
        { status: 400 },
      );
    }

    const orderId =
      clean(
        body.payment?.razorpayOrderId,
        150,
      );

    const paymentId =
      clean(
        body.payment?.razorpayPaymentId,
        150,
      );

    const receivedSignature =
      clean(
        body.payment?.razorpaySignature,
        250,
      );

    if (
      !orderId ||
      !paymentId ||
      !receivedSignature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Complete online payment details are required.",
        },
        { status: 400 },
      );
    }

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Online payment is not configured yet.",
        },
        { status: 503 },
      );
    }

    const expectedSignature =
      createHmac(
        "sha256",
        keySecret,
      )
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    if (
      !signaturesMatch(
        expectedSignature,
        receivedSignature,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification failed.",
        },
        { status: 400 },
      );
    }

    const razorpay =
      getRazorpayClient();

    const [payment, order] =
      await Promise.all([
        razorpay.payments.fetch(paymentId),
        razorpay.orders.fetch(orderId),
      ]);

    const advanceAmount =
      Math.round(estimate.total * 0.5);

    const expectedAmount =
      advanceAmount * 100;

    const notes =
      order.notes as
        | Record<string, unknown>
        | undefined;

    if (
      payment.order_id !== orderId ||
      Number(payment.amount) !==
        expectedAmount ||
      payment.currency !== "INR" ||
      Number(order.amount) !==
        expectedAmount ||
      order.currency !== "INR" ||
      noteValue(notes?.packageId) !==
        "packers-movers-plan" ||
      noteValue(notes?.serviceId) !==
        serviceId ||
      Number(noteValue(notes?.distanceKm)) !==
        estimate.distanceKm ||
      noteValue(notes?.inventoryTier) !==
        inventoryTier ||
      noteValue(notes?.packingTier) !==
        packingTier ||
      noteValue(notes?.accessType) !==
        accessType ||
      Number(
        noteValue(notes?.estimatedTotal),
      ) !== estimate.total
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment details do not match the selected move.",
        },
        { status: 400 },
      );
    }

    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          success: false,
          paymentPending: true,
          message:
            "Payment is processing. Booking will be confirmed after payment capture.",
        },
        { status: 202 },
      );
    }

    const id = bookingId();

    const pickupAddress =
      formatAddress(pickup);

    const dropAddress =
      formatAddress(drop);

    const remainingAmount =
      estimate.total - advanceAmount;

    const message = [
      "CITY COOLIES - NEW PACKERS & MOVERS BOOKING",
      "",
      `Booking ID: ${id}`,
      `Customer Name: ${customerName}`,
      `Phone Number: ${phone}`,
      `Email Address: ${email}`,
      `Moving Date: ${movingDate}`,
      "",
      `Move Service: ${estimate.service.name}`,
      `Distance: ${
        estimate.distanceApplicable
          ? `${estimate.distanceKm} km`
          : "Not applicable"
      }`,
      `Inventory: ${inventoryTier}`,
      `Packing: ${packingTier}`,
      `Floor / Lift: ${accessType.replaceAll("-", " ")}`,
      "",
      `Pickup Address: ${pickupAddress}`,
      `Pickup Google Maps: ${pickup.googleMapsUrl}`,
      "",
      `Drop Address: ${dropAddress}`,
      `Drop Google Maps: ${drop.googleMapsUrl}`,
      "",
      `Estimated Move Price: INR ${estimate.total.toLocaleString("en-IN")}`,
      "Payment Method: 50% Advance Online Payment",
      `Paid Now: INR ${advanceAmount.toLocaleString("en-IN")}`,
      `Amount Due: INR ${remainingAmount.toLocaleString("en-IN")}`,
      `Razorpay Payment ID: ${paymentId}`,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${COMPANY_WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    return NextResponse.json(
      {
        success: true,
        message:
          "Payment verified and Packers & Movers booking confirmed.",
        bookingId: id,
        paymentVerified: true,
        whatsappUrl,
        pickupGoogleMapsUrl:
          pickup.googleMapsUrl,
        dropGoogleMapsUrl:
          drop.googleMapsUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Packers & Movers booking error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Booking could not be completed. Please try again.",
      },
      { status: 500 },
    );
  }
}
