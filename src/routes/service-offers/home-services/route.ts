import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OfferRequest = {
  source?: string;
  offerCode?: string;
  destination?: string;
};

const DEFAULT_DESTINATION =
  "/services#all-services-catalog";

const DEFAULT_OFFER_CODE =
  "HOME20";

function getPythonApiUrl() {
  const configured =
    process.env.CITY_COOLIES_PYTHON_API_URL?.trim();

  if (!configured) {
    return "http://127.0.0.1:8000";
  }

  return configured.replace(/\/+$/, "");
}

export async function POST(
  request: Request,
) {
  const payload =
    (await request
      .json()
      .catch(() => ({}))) as OfferRequest;

  const destination =
    typeof payload.destination === "string" &&
    payload.destination.startsWith("/services")
      ? payload.destination
      : DEFAULT_DESTINATION;

  const offerCode =
    typeof payload.offerCode === "string" &&
    payload.offerCode.length <= 32
      ? payload.offerCode
      : DEFAULT_OFFER_CODE;

  const source =
    typeof payload.source === "string" &&
    payload.source.length <= 100
      ? payload.source
      : "services-trust-offer";

  const pythonPayload = {
    source,
    offer_code: offerCode,
    destination,
    user_agent:
      request.headers.get("user-agent"),
    referer:
      request.headers.get("referer"),
  };

  let pythonSynced =
    false;

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      900,
    );

  try {
    const pythonResponse =
      await fetch(
        `${getPythonApiUrl()}/api/v1/offers/home-services/click`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              pythonPayload,
            ),

          cache: "no-store",

          signal:
            controller.signal,
        },
      );

    pythonSynced =
      pythonResponse.ok;
  }
  catch {
    /*
     * The customer journey must never fail
     * only because the analytics microservice
     * is temporarily unavailable.
     */
  }
  finally {
    clearTimeout(timeout);
  }

  return NextResponse.json(
    {
      ok: true,
      destination,
      offerCode,
      pythonSynced,
    },
    {
      status: 202,
    },
  );
}