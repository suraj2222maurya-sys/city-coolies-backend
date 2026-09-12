import { NextResponse } from "next/server";

import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "@/lib/payments/razorpay";

import {
  calculatePackersMoversEstimate,
  type AccessType,
  type InventoryTier,
  type PackingTier,
} from "@/lib/services/packersMoversCatalog";

type RequestBody = {
  move?: {
    serviceId?: unknown;
    distanceKm?: unknown;
    inventoryTier?: unknown;
    packingTier?: unknown;
    accessType?: unknown;
  };
};

function clean(value: unknown, max = 120): string {
  return typeof value === "string"
    ? value.trim().slice(0, max)
    : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const move = body.move;

    const serviceId = clean(move?.serviceId);
    const distanceKm = Number(move?.distanceKm);

    const inventoryTier =
      clean(move?.inventoryTier) as InventoryTier;

    const packingTier =
      clean(move?.packingTier) as PackingTier;

    const accessType =
      clean(move?.accessType) as AccessType;

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
            "Please select valid Packers & Movers details.",
        },
        { status: 400 },
      );
    }

    const estimate = calculatePackersMoversEstimate({
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

    const advanceAmount =
      Math.round(estimate.total * 0.5);

    if (
      !Number.isSafeInteger(advanceAmount) ||
      advanceAmount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid payment amount is required.",
        },
        { status: 400 },
      );
    }

    const receipt =
      `ccpm_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 7)}`;

    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: advanceAmount * 100,
      currency: "INR",
      receipt,
      notes: {
        packageId: "packers-movers-plan",
        serviceId,
        serviceName: estimate.service.name,
        distanceKm: String(estimate.distanceKm),
        inventoryTier,
        packingTier,
        accessType,
        estimatedTotal: String(estimate.total),
        paymentType: "50_percent_advance",
      },
    });

    return NextResponse.json(
      {
        success: true,
        keyId: getRazorpayKeyId(),
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        serviceName: estimate.service.name,
        estimatedTotal: estimate.total,
        advanceAmount,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Packers & Movers payment order error:",
      error,
    );

    const message =
      error instanceof Error &&
      error.message.includes("not configured")
        ? "Online payment is not configured yet."
        : "Payment order could not be created.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: message.includes("not configured")
          ? 503
          : 500,
      },
    );
  }
}
