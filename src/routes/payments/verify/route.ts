import { createHmac, timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/payments/razorpay";
import {
  calculateAdvanceAmount,
  getServicePackage,
} from "@/lib/services/serviceCatalog";

type VerifyPaymentRequest = {
  packageId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
};

function safeCompare(
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
    const body =
      (await request.json()) as VerifyPaymentRequest;

    const packageId = body.packageId?.trim();
    const orderId = body.razorpayOrderId?.trim();
    const paymentId = body.razorpayPaymentId?.trim();
    const signature = body.razorpaySignature?.trim();

    if (!packageId || !orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete payment details are required.",
        },
        { status: 400 },
      );
    }

    const servicePackage =
      packageId ===
      "full-house-electrical-site-survey"
        ? {
            id: "full-house-electrical-site-survey",
            name:
              "Full House Electrical Wiring - Site Survey",
            originalPrice: 500,
            offerPrice: 500,
            advancePercentage: 100,
          }
        : getServicePackage(packageId);

    if (!servicePackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected service package is invalid.",
        },
        { status: 404 },
      );
    }

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Online payment is not configured yet.",
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

    if (!safeCompare(expectedSignature, signature)) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed.",
        },
        { status: 400 },
      );
    }

    const razorpay = getRazorpayClient();
    const payment = await razorpay.payments.fetch(paymentId);

    const expectedAmount =
      calculateAdvanceAmount(servicePackage) * 100;

    if (
      payment.order_id !== orderId ||
      Number(payment.amount) !== expectedAmount ||
      payment.currency !== "INR"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment details do not match the booking.",
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
            "Payment is being processed. Booking will be confirmed after capture.",
        },
        { status: 202 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        verified: true,
        paymentId: payment.id,
        orderId,
        paidAmount: Number(payment.amount) / 100,
        serviceName: servicePackage.name,
        message: "Advance payment verified successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Razorpay payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification could not be completed.",
      },
      { status: 500 },
    );
  }
}
