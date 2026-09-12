import { NextResponse } from "next/server";

import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "@/lib/payments/razorpay";

const MEMBERSHIP_PRICE = 999;
const MEMBERSHIP_AMOUNT_PAISE =
  MEMBERSHIP_PRICE * 100;

export async function POST() {
  try {
    const razorpay = getRazorpayClient();

    const receipt =
      `ccv_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;

    const order =
      await razorpay.orders.create({
        amount: MEMBERSHIP_AMOUNT_PAISE,
        currency: "INR",
        receipt,
        notes: {
          paymentType:
            "vendor_membership",
          membershipPlan:
            "vendor-annual-999",
          membershipDuration: "1_year",
          membershipPrice: "999",
        },
      });

    return NextResponse.json(
      {
        success: true,
        keyId: getRazorpayKeyId(),
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        membershipPrice:
          MEMBERSHIP_PRICE,
        membershipDuration: "1 Year",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Vendor membership Razorpay order error:",
      error,
    );

    const message =
      error instanceof Error &&
      error.message
        .toLowerCase()
        .includes("not configured")
        ? "Online payment is not configured yet. Create your Razorpay account and add the API keys."
        : error instanceof Error
          ? error.message
          : "Membership payment order could not be created.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: message.includes(
          "not configured",
        )
          ? 503
          : 500,
      },
    );
  }
}
