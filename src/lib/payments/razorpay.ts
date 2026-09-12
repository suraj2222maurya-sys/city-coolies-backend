import { Buffer } from "node:buffer";

type RazorpayOrderCreateOptions = {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
};

type RazorpayOrder = {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
};

type RazorpayPayment = {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string | null;
  method?: string;
  email?: string;
  contact?: string;
};

type RazorpayApiError = {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
};

function requireRazorpayCredentials() {
  const keyId =
    process.env.RAZORPAY_KEY_ID?.trim();

  const keySecret =
    process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    );
  }

  return {
    keyId,
    keySecret,
  };
}

async function razorpayRequest<T>(
  path: string,
  init: RequestInit,
): Promise<T> {
  const { keyId, keySecret } =
    requireRazorpayCredentials();

  const authorization = Buffer.from(
    `${keyId}:${keySecret}`,
  ).toString("base64");

  const response = await fetch(
    `https://api.razorpay.com/v1${path}`,
    {
      ...init,
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      cache: "no-store",
    },
  );

  const responseText =
    await response.text();

  let payload: unknown = {};

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = {};
    }
  }

  if (!response.ok) {
    const errorPayload =
      payload as RazorpayApiError;

    throw new Error(
      errorPayload.error?.description ||
        `Razorpay request failed with status ${response.status}.`,
    );
  }

  return payload as T;
}

export function getRazorpayKeyId() {
  return requireRazorpayCredentials().keyId;
}

export function getRazorpayClient() {
  requireRazorpayCredentials();

  return {
    orders: {
      create(
        options: RazorpayOrderCreateOptions,
      ) {
        return razorpayRequest<RazorpayOrder>(
          "/orders",
          {
            method: "POST",
            body: JSON.stringify(options),
          },
        );
      },

      fetch(orderId: string) {
        const safeOrderId =
          encodeURIComponent(orderId);

        return razorpayRequest<RazorpayOrder>(
          `/orders/${safeOrderId}`,
          {
            method: "GET",
          },
        );
      },
    },

    payments: {
      fetch(paymentId: string) {
        const safePaymentId =
          encodeURIComponent(paymentId);

        return razorpayRequest<RazorpayPayment>(
          `/payments/${safePaymentId}`,
          {
            method: "GET",
          },
        );
      },
    },
  };
}

