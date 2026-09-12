import {
  createHash,
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/payments/razorpay";
import {
  calculateAdvanceAmount,
  calculateCustomCleaningPlan,
  calculateCustomKitchenCleaningPlan,
  calculateCustomBathroomCleaningPlan,
  getServicePackage,
} from "@/lib/services/serviceCatalog";

import { calculateCobwebCleaningPlan } from "@/lib/services/cobwebCleaningCatalog";

import { calculateCommercialCleaningPlan } from "@/lib/services/commercialCleaningCatalog";

import { calculateIndustrialCleaningPlan } from "@/lib/services/industrialCleaningCatalog";

import { calculateOfficeCleaningPlan } from "@/lib/services/officeCleaningCatalog";
import { calculateVillaCleaningPlan } from "@/lib/services/villaCleaningCatalog";
import { calculateUpholsteryCleaningPlan } from "@/lib/services/upholsteryCleaningCatalog";
import { calculateWaterTankCleaningPlan } from "@/lib/services/waterTankCleaningCatalog";
import { calculateApplianceRepairPlan } from "@/lib/services/applianceRepairCatalog";
import { calculatePlumbingPlan, calculatePlumbingSiteVisit } from "@/lib/services/plumbingCatalog";

import { calculatePaintingPlan, calculatePaintingSiteSurvey } from "@/lib/services/paintingCatalog";
import { calculateCarpentryInteriorBooking, calculateCarpentryInteriorSurvey } from "@/lib/services/carpentryInteriorCatalog";
import { calculateFabricationSurvey } from "@/lib/services/fabricationCatalog";
const COMPANY_WHATSAPP_NUMBER = "919710946484";

type AddressData = {
  houseNumber?: string;
  buildingName?: string;
  street?: string;
  area?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  googleMapsUrl?: string;
};

type PaymentData = {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
};

type BookingRequest = {
  packageId?: string;
  customServices?: unknown;
  paymentMethod?: "advance" | "cash";
  payment?: PaymentData;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    preferredDate?: string;
    address?: AddressData;
  };
};

function cleanValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function createBookingId(): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  return `CC-${datePart}-${randomPart}`;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-IN");
}

function signaturesMatch(
  expectedSignature: string,
  receivedSignature: string,
): boolean {
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequest;

    const packageId = cleanValue(body.packageId);
    const customer = body.customer;
    const address = customer?.address;

    if (
      body.paymentMethod !== "advance" &&
      body.paymentMethod !== "cash"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid payment method.",
        },
        { status: 400 },
      );
    }

   let trustedCustomServices: Array<{
  id: string;
  name: string;
  quantity: number;
  days?: number;
  unitPrice: number;
  lineTotal: number;
}> = [];

let servicePackage = getServicePackage(packageId);

if (
  packageId ===
  "full-house-electrical-site-survey"
) {
  servicePackage = {
    id: "full-house-electrical-site-survey",
    name:
      "Full House Electrical Wiring - Site Survey",
    originalPrice: 500,
    offerPrice: 500,
    advancePercentage: 100,
  };
}

if (packageId === "plumbing-site-visit") {
  const siteVisit = calculatePlumbingSiteVisit(body.customServices);

  if (!siteVisit) {
    return NextResponse.json(
      { success: false, message: "Please select a valid plumbing inspection service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...siteVisit.services];
  servicePackage = {
    id: "plumbing-site-visit",
    name: siteVisit.services[0]!.name,
    originalPrice: siteVisit.total,
    offerPrice: siteVisit.total,
    advancePercentage: 100,
  };
}

if (packageId === "new-home-plumbing-site-visit") {
  servicePackage = {
    id: "new-home-plumbing-site-visit",
    name: "New Home Complete Plumbing Work - Site Visit",
    originalPrice: 500,
    offerPrice: 500,
    advancePercentage: 100,
  };
}

if (packageId === "plumbing-works-plan") {
  const plumbingPlan = calculatePlumbingPlan(body.customServices);

  if (!plumbingPlan) {
    return NextResponse.json(
      { success: false, message: "Please select a valid plumbing service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...plumbingPlan.services];
  servicePackage = {
    id: "plumbing-works-plan",
    name: "Plumbing Works Booking",
    originalPrice: plumbingPlan.total,
    offerPrice: plumbingPlan.total,
    advancePercentage: 50,
  };
}


if (packageId === "painting-works-plan") {
  const paintingPlan = calculatePaintingPlan(body.customServices);

  if (!paintingPlan) {
    return NextResponse.json(
      { success: false, message: "Please select a valid painting service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...paintingPlan.services];
  servicePackage = {
    id: "painting-works-plan",
    name: "Painting Works Booking",
    originalPrice: paintingPlan.total,
    offerPrice: paintingPlan.total,
    advancePercentage: 50,
  };
}

if (packageId === "fabrication-site-survey") {
  const fabricationSurvey = calculateFabricationSurvey(body.customServices);

  if (!fabricationSurvey) {
    return NextResponse.json(
      { success: false, message: "Please select at least one valid fabrication requirement." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...fabricationSurvey.services];
  servicePackage = {
    id: "fabrication-site-survey",
    name: "Fabrication Works - Site Survey",
    originalPrice: fabricationSurvey.total,
    offerPrice: fabricationSurvey.total,
    advancePercentage: 100,
  };
}

if (packageId === "painting-site-survey") {
  const survey = calculatePaintingSiteSurvey(body.customServices);

  if (!survey) {
    return NextResponse.json(
      { success: false, message: "Please select at least one valid painting service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...survey.services];
  servicePackage = {
    id: "painting-site-survey",
    name: "Painting Works - Site Survey",
    originalPrice: 500,
    offerPrice: 500,
    advancePercentage: 100,
  };
}

if (packageId === "carpentry-interior-site-survey") {
  const survey = calculateCarpentryInteriorSurvey(body.customServices);

  if (!survey) {
    return NextResponse.json(
      { success: false, message: "Please select at least one valid carpentry or interior service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...survey.services];
  servicePackage = {
    id: "carpentry-interior-site-survey",
    name: "Carpentry & Interior - Site Survey",
    originalPrice: survey.total,
    offerPrice: survey.total,
    advancePercentage: 100,
  };
}

if (packageId === "carpentry-interior-booking") {
  const plan = calculateCarpentryInteriorBooking(body.customServices);

  if (!plan) {
    return NextResponse.json(
      { success: false, message: "Please select a valid carpentry or interior service." },
      { status: 400 },
    );
  }

  trustedCustomServices = [...plan.services];
  servicePackage = {
    id: "carpentry-interior-booking",
    name: plan.surveyFee > 0 ? "Carpentry & Interior Booking" : "Professional Carpenter Labour Booking",
    originalPrice: plan.total,
    offerPrice: plan.total,
    advancePercentage: 100,
  };
}


if (packageId === "appliance-repair-plan") {
  const appliancePlan = calculateApplianceRepairPlan(body.customServices);

  if (!appliancePlan) {
    return NextResponse.json(
      {
        success: false,
        message: "Please select at least one valid appliance service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = [...appliancePlan.services];
  servicePackage = {
    id: "appliance-repair-plan",
    name: "Appliance Repair Plan",
    originalPrice: appliancePlan.total,
    offerPrice: appliancePlan.total,
    advancePercentage: 50,
  };
}

if (packageId === "custom-cleaning-plan") {
  const customPlan = calculateCustomCleaningPlan(
    body.customServices,
  );

  if (!customPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customPlan.services;

  servicePackage = {
    id: "custom-cleaning-plan",
    name: "Customized Cleaning Plan",
    originalPrice: customPlan.total,
    offerPrice: customPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "custom-kitchen-cleaning-plan") {
  const customKitchenPlan =
    calculateCustomKitchenCleaningPlan(
      body.customServices,
    );

  if (!customKitchenPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid kitchen-cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customKitchenPlan.services;

  servicePackage = {
    id: "custom-kitchen-cleaning-plan",
    name: "Custom Kitchen Cleaning Plan",
    originalPrice: customKitchenPlan.total,
    offerPrice: customKitchenPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "custom-bathroom-cleaning-plan") {
  const customBathroomPlan =
    calculateCustomBathroomCleaningPlan(
      body.customServices,
    );

  if (!customBathroomPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid bathroom-cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customBathroomPlan.services;

  servicePackage = {
    id: "custom-bathroom-cleaning-plan",
    name: "Custom Bathroom Cleaning Plan",
    originalPrice: customBathroomPlan.total,
    offerPrice: customBathroomPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "industrial-cleaning-plan") {
  const industrialPlan = calculateIndustrialCleaningPlan(
    body.customServices,
  );

  if (!industrialPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please enter a valid industrial service quantity.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = [...industrialPlan.services];

  servicePackage = {
    id: "industrial-cleaning-plan",
    name: "Industrial Cleaning Plan",
    originalPrice: industrialPlan.total,
    offerPrice: industrialPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "commercial-cleaning-plan") {
  const commercialPlan = calculateCommercialCleaningPlan(
    body.customServices,
  );

  if (!commercialPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please enter a valid commercial cleaning area.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = [...commercialPlan.services];

  servicePackage = {
    id: "commercial-cleaning-plan",
    name: "Commercial Cleaning Plan",
    originalPrice: commercialPlan.total,
    offerPrice: commercialPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "cobweb-cleaning-plan") {
  const cobwebPlan = calculateCobwebCleaningPlan(
    body.customServices,
  );

  if (!cobwebPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please enter a valid cobweb cleaning quantity.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = [...cobwebPlan.services];

  servicePackage = {
    id: "cobweb-cleaning-plan",
    name: "Cobweb Cleaning Plan",
    originalPrice: cobwebPlan.total,
    offerPrice: cobwebPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "office-cleaning-plan") {
  const officePlan = calculateOfficeCleaningPlan(body.customServices);
  if (!officePlan) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid office cleaning area." },
      { status: 400 },
    );
  }
  trustedCustomServices = [...officePlan.services];
  servicePackage = {
    id: "office-cleaning-plan",
    name: "Office Cleaning Plan",
    originalPrice: officePlan.total,
    offerPrice: officePlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "villa-cleaning-plan") {
  const villaPlan = calculateVillaCleaningPlan(body.customServices);
  if (!villaPlan) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid villa cleaning area." },
      { status: 400 },
    );
  }
  trustedCustomServices = [...villaPlan.services];
  servicePackage = {
    id: "villa-cleaning-plan",
    name: "Villa Cleaning Plan",
    originalPrice: villaPlan.total,
    offerPrice: villaPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "water-tank-cleaning-plan") {
  const waterTankPlan = calculateWaterTankCleaningPlan(body.customServices);
  if (!waterTankPlan) {
    return NextResponse.json(
      { success: false, message: "Please select a valid tank capacity and quantity." },
      { status: 400 },
    );
  }
  trustedCustomServices = [...waterTankPlan.services];
  servicePackage = {
    id: "water-tank-cleaning-plan",
    name: "Water Tank Cleaning Plan",
    originalPrice: waterTankPlan.total,
    offerPrice: waterTankPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "upholstery-cleaning-plan") {
  const upholsteryPlan = calculateUpholsteryCleaningPlan(body.customServices);
  if (!upholsteryPlan) {
    return NextResponse.json(
      { success: false, message: "Please select valid upholstery-cleaning quantities." },
      { status: 400 },
    );
  }
  trustedCustomServices = [...upholsteryPlan.services];
  servicePackage = {
    id: "upholstery-cleaning-plan",
    name: "Mattress & Sofa Cleaning Plan",
    originalPrice: upholsteryPlan.total,
    offerPrice: upholsteryPlan.total,
    advancePercentage: 50,
  };
}
if (!servicePackage) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Selected service package is not available.",
    },
    { status: 404 },
  );
}

if (
  packageId === "painting-site-survey" &&
  body.paymentMethod !== "advance"
) {
  return NextResponse.json(
    { success: false, message: "â‚¹500 site survey payment is required before booking confirmation." },
    { status: 400 },
  );
}

if (
  packageId === "carpentry-interior-site-survey" &&
  body.paymentMethod !== "advance"
) {
  return NextResponse.json(
    { success: false, message: "â‚¹500 site survey payment is required before booking confirmation." },
    { status: 400 },
  );
}

if (
  packageId === "carpentry-interior-booking" &&
  body.paymentMethod !== "advance"
) {
  return NextResponse.json(
    { success: false, message: "Full online payment is required to confirm this booking." },
    { status: 400 },
  );
}

    if (
      packageId === "plumbing-site-visit" &&
      body.paymentMethod !== "advance"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "â‚¹500 site visit / survey payment is required before this booking can be confirmed.",
        },
        { status: 400 },
      );
    }

    const customerName = cleanValue(customer?.name);
    const phone = cleanValue(customer?.phone);
    const email = cleanValue(customer?.email);
    const preferredDate = cleanValue(
      customer?.preferredDate,
    );

    const houseNumber = cleanValue(address?.houseNumber);
    const buildingName = cleanValue(address?.buildingName);
    const street = cleanValue(address?.street);
    const area = cleanValue(address?.area);
    const landmark = cleanValue(address?.landmark);
    const city = cleanValue(address?.city);
    const state = cleanValue(address?.state);
    const pinCode = cleanValue(address?.pinCode);

    if (!customerName || !phone || !preferredDate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, phone number and preferred date are required.",
        },
        { status: 400 },
      );
    }

    if (
      !houseNumber ||
      !street ||
      !area ||
      !city ||
      !state ||
      !pinCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your complete service address.",
        },
        { status: 400 },
      );
    }

    const completeAddress = [
      houseNumber,
      buildingName,
      street,
      area,
      landmark,
      city,
      state,
      pinCode,
    ]
      .filter(Boolean)
      .join(", ");

    const googleMapsUrl =
      cleanValue(address?.googleMapsUrl) ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        completeAddress,
      )}`;

    // CITY_COOLIES_ONLINE_ONLY_PAID_BOOKINGS
    if (
      body.paymentMethod === "cash" &&
      servicePackage.offerPrice > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Online payment is required to confirm this service booking.",
        },
        { status: 400 },
      );
    }
    const advanceAmount =
      calculateAdvanceAmount(servicePackage);

    let paidAmount = 0;
    let remainingAmount = servicePackage.offerPrice;
    let paymentId = "";
    let paymentLabel = servicePackage.offerPrice === 0 ? "Quotation Request" : "Online Payment";

    if (body.paymentMethod === "advance") {
      const orderId = cleanValue(
        body.payment?.razorpayOrderId,
      );

      paymentId = cleanValue(
        body.payment?.razorpayPaymentId,
      );

      const receivedSignature = cleanValue(
        body.payment?.razorpaySignature,
      );

      if (!orderId || !paymentId || !receivedSignature) {
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

      const expectedSignature = createHmac(
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
            message: "Payment verification failed.",
          },
          { status: 400 },
        );
      }

      const razorpay = getRazorpayClient();

      const [payment, order] = await Promise.all([
        razorpay.payments.fetch(paymentId),
        razorpay.orders.fetch(orderId),
      ]);

      const expectedAmount = advanceAmount * 100;
      const orderNotes = order.notes as
        | Record<string, unknown>
        | undefined;
        const expectedCustomServiceIdsRaw =
  trustedCustomServices
    .map(
      (service) =>
        `${service.id}:${service.quantity}${packageId === "carpentry-interior-booking" ? `:${service.days ?? 0}` : ""}`,
    )
    .join("|");
        const expectedCustomServiceIds = packageId === "carpentry-interior-booking" || packageId === "carpentry-interior-site-survey"
          ? `sha256:${createHash("sha256").update(expectedCustomServiceIdsRaw).digest("hex")}`
          : expectedCustomServiceIdsRaw;
     const expectedCustomPlanType =
        packageId === "carpentry-interior-booking"
          ? "carpentry-interior-booking"
        : packageId === "carpentry-interior-site-survey"
          ? "carpentry-interior-site-survey"
        : packageId === "appliance-repair-plan"
          ? "appliance"
          : (packageId === "painting-site-survey"
          ? "painting-site-survey"
        : packageId === "painting-works-plan"
          ? "painting"
          : 
        packageId === "plumbing-site-visit"
          ? "plumbing-site-visit"
          : packageId === "plumbing-works-plan"
            ? "plumbing"
          : packageId === "water-tank-cleaning-plan"
            ? "water-tank"
          : packageId === "upholstery-cleaning-plan"
          ? "upholstery"
          : packageId === "villa-cleaning-plan"
          ? "villa"
          : packageId === "office-cleaning-plan"
          ? "office"
          : packageId === "cobweb-cleaning-plan"
          ? "cobweb"
          : packageId === "commercial-cleaning-plan"
            ? "commercial"
            : packageId === "industrial-cleaning-plan"
              ? "industrial"
              : packageId === "custom-bathroom-cleaning-plan"
                ? "bathroom"
                : packageId === "custom-kitchen-cleaning-plan"
                  ? "kitchen"
                  : packageId === "custom-cleaning-plan"
                    ? "home"
                    : "fixed");
      if (
        payment.order_id !== orderId ||
        Number(payment.amount) !== expectedAmount ||
        payment.currency !== "INR" ||
        Number(order.amount) !== expectedAmount ||
        order.currency !== "INR" ||
               cleanValue(orderNotes?.packageId) !== packageId ||
        cleanValue(orderNotes?.customPlanType) !==
          expectedCustomPlanType ||
        cleanValue(orderNotes?.customServiceIds) !==
          expectedCustomServiceIds
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Payment details do not match the selected service.",
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

      paidAmount = advanceAmount;
      remainingAmount =
        servicePackage.offerPrice - advanceAmount;
      paymentLabel =
        packageId === "carpentry-interior-booking"
          ? "Carpentry & Interior Full Online Payment"
        : packageId === "carpentry-interior-site-survey"
          ? "â‚¹500 Carpentry & Interior Site Survey Payment"
        : packageId === "painting-site-survey"
          ? "Full Painting Site Survey Online Payment"
        : packageId === "plumbing-site-visit"
          ? "â‚¹500 Site Visit / Survey Online Payment"
          : packageId === "new-home-plumbing-site-visit"
            ? "Full Site Visit Online Payment"
          : packageId === "full-house-electrical-site-survey"
            ? "Full Site Survey Online Payment"
            : "50% Advance Online Payment";
    }

    const bookingId = createBookingId();
const customServicesMessage =
  trustedCustomServices.length > 0
    ? [
        "",
        packageId === "carpentry-interior-booking"
          ? "Selected Carpentry & Interior Services:"
        : packageId === "carpentry-interior-site-survey"
          ? "Selected Carpentry & Interior Services for Site Survey:"
        : packageId === "appliance-repair-plan"
          ? "Selected Appliance Services:"
          : (packageId === "painting-site-survey"
          ? "Selected Painting Services for Site Survey:"
          : packageId === "painting-works-plan"
          ? "Selected Painting Services:"
          : packageId === "plumbing-site-visit"
          ? "Plumbing Site Visit / Survey Service:"
          : packageId === "plumbing-works-plan"
            ? "Selected Plumbing Services:"
          : packageId === "water-tank-cleaning-plan"
            ? "Selected Water Tank Cleaning Service:"
          : packageId === "upholstery-cleaning-plan"
          ? "Selected Mattress & Sofa Services:"
          : packageId === "villa-cleaning-plan"
          ? "Selected Villa Cleaning Service:"
          : packageId === "office-cleaning-plan"
          ? "Selected Office Cleaning Service:"
          : packageId === "cobweb-cleaning-plan"
          ? "Selected Cobweb Cleaning Service:"
          : packageId === "commercial-cleaning-plan"
            ? "Selected Commercial Cleaning Service:"
            : packageId === "industrial-cleaning-plan"
              ? "Selected Industrial Cleaning Service:"
              : packageId === "custom-bathroom-cleaning-plan"
                ? "Selected Custom Bathroom Services:"
                : packageId === "custom-kitchen-cleaning-plan"
                  ? "Selected Custom Kitchen Services:"
                  : "Selected Custom Cleaning Services:"),
        ...trustedCustomServices.map((service) =>
          packageId === "carpentry-interior-booking"
            ? service.days
              ? `${service.name}: ${service.quantity} person${service.quantity > 1 ? "s" : ""} Ã— ${service.days} day${service.days > 1 ? "s" : ""} = â‚¹${formatAmount(service.lineTotal)}`
              : `${service.name} Ã— ${service.quantity} â€” Final rate after site survey`
          : packageId === "carpentry-interior-site-survey"
            ? `${service.name} Ã— ${service.quantity} â€” Final rate after site survey`
            : `${service.name} Ã— ${service.quantity} = â‚¹${formatAmount(service.lineTotal)}`,
        ),
      ]
    : [];
    const bookingMessage = [
      "CITY COOLIES - NEW SERVICE BOOKING",
      "",
      `Booking ID: ${bookingId}`,
      `Service: ${servicePackage.name}`,
      ...customServicesMessage,
      `Customer Name: ${customerName}`,
      `Phone Number: ${phone}`,
      `Email Address: ${email || "Not provided"}`,
      `Preferred Date: ${preferredDate}`,
      "",
      `Service Address: ${completeAddress}`,
      `Google Maps Location: ${googleMapsUrl}`,
      "",
      `Original Price: Ã¢â€šÂ¹${formatAmount(
        servicePackage.originalPrice,
      )}`,
      `Service Price: Ã¢â€šÂ¹${formatAmount(
        servicePackage.offerPrice,
      )}`,
      `Payment Method: ${paymentLabel}`,
      `Pay Now: Ã¢â€šÂ¹${formatAmount(paidAmount)}`,
      `Amount Due: Ã¢â€šÂ¹${formatAmount(remainingAmount)}`,
      ...(paymentId
        ? [`Razorpay Payment ID: ${paymentId}`]
        : []),
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${COMPANY_WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(bookingMessage)}`;

    return NextResponse.json(
      {
        success: true,
        message:
          body.paymentMethod === "advance"
            ? "Payment verified and booking confirmed."
            : "Booking details are ready to send on WhatsApp.",
        bookingId,
        paymentVerified:
          body.paymentMethod === "advance",
        whatsappUrl,
        googleMapsUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking API error:", error);

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

