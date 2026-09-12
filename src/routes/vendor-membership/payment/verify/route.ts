import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/payments/razorpay";

const MEMBERSHIP_PRICE = 999;
const EXPECTED_AMOUNT =
  MEMBERSHIP_PRICE * 100;

type VerifyVendorPaymentRequest = {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
};

function safeCompare(
  expectedSignature: string,
  receivedSignature: string,
) {
  const expectedBuffer = Buffer.from(
    expectedSignature,
  );

  const receivedBuffer = Buffer.from(
    receivedSignature,
  );

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

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as VerifyVendorPaymentRequest;

    const orderId =
      body.razorpayOrderId?.trim();

    const paymentId =
      body.razorpayPaymentId?.trim();

    const signature =
      body.razorpaySignature?.trim();

    if (
      !orderId ||
      !paymentId ||
      !signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Complete membership payment details are required.",
        },
        {
          status: 400,
        },
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
        {
          status: 503,
        },
      );
    }

    const expectedSignature =
      createHmac("sha256", keySecret)
        .update(
          `${orderId}|${paymentId}`,
        )
        .digest("hex");

    if (
      !safeCompare(
        expectedSignature,
        signature,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Membership payment verification failed.",
        },
        {
          status: 400,
        },
      );
    }

    const razorpay =
      getRazorpayClient();

    const payment =
      await razorpay.payments.fetch(
        paymentId,
      );

    if (
      payment.order_id !== orderId ||
      Number(payment.amount) !==
        EXPECTED_AMOUNT ||
      payment.currency !== "INR"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment details do not match the City Coolies membership.",
        },
        {
          status: 400,
        },
      );
    }

    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          success: false,
          paymentPending: true,
          message:
            "Payment is being processed. Membership will be confirmed after payment capture.",
        },
        {
          status: 202,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        verified: true,
        paymentId: payment.id,
        orderId,
        paidAmount:
          Number(payment.amount) / 100,
        membershipDuration: "1 Year",
        message:
          "Vendor membership payment verified successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Vendor membership payment verification error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Membership payment verification could not be completed.",
      },
      {
        status: 500,
      },
    );
  }
}
