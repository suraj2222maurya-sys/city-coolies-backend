import {
  NextResponse,
} from "next/server";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

type BusinessProfileReviewer = {
  displayName?: string;
  profilePhotoUrl?: string;
};

type BusinessProfileReview = {
  reviewId?: string;
  reviewer?: BusinessProfileReviewer;
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
};

type BusinessProfileResponse = {
  reviews?: BusinessProfileReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

type PlacesReview = {
  name?: string;
  rating?: number;

  text?: {
    text?: string;
  };

  relativePublishTimeDescription?: string;
  publishTime?: string;

  authorAttribution?: {
    displayName?: string;
  };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

type PublicReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  createTime?: string;
};

function starRatingToNumber(
  rating?: string,
) {
  switch (rating) {
    case "ONE":
      return 1;

    case "TWO":
      return 2;

    case "THREE":
      return 3;

    case "FOUR":
      return 4;

    case "FIVE":
      return 5;

    default:
      return 0;
  }
}

function relativeTime(
  dateValue?: string,
) {
  if (!dateValue) {
    return "";
  }

  const timestamp =
    new Date(
      dateValue,
    ).getTime();

  if (
    !Number.isFinite(
      timestamp,
    )
  ) {
    return "";
  }

  const difference =
    Math.max(
      0,
      Date.now() -
        timestamp,
    );

  const minutes =
    Math.floor(
      difference /
        60000,
    );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1
        ? "minute"
        : "minutes"
    } ago`;
  }

  const hours =
    Math.floor(
      minutes / 60,
    );

  if (hours < 24) {
    return `${hours} ${
      hours === 1
        ? "hour"
        : "hours"
    } ago`;
  }

  const days =
    Math.floor(
      hours / 24,
    );

  if (days < 7) {
    return `${days} ${
      days === 1
        ? "day"
        : "days"
    } ago`;
  }

  const weeks =
    Math.floor(
      days / 7,
    );

  if (weeks < 5) {
    return `${weeks} ${
      weeks === 1
        ? "week"
        : "weeks"
    } ago`;
  }

  const months =
    Math.floor(
      days / 30,
    );

  if (months < 12) {
    return `${months} ${
      months === 1
        ? "month"
        : "months"
    } ago`;
  }

  const years =
    Math.floor(
      days / 365,
    );

  return `${years} ${
    years === 1
      ? "year"
      : "years"
  } ago`;
}

function googleMapsUrl(
  placeId?: string,
) {
  const customUrl =
    process.env
      .GOOGLE_BUSINESS_PROFILE_URL;

  if (customUrl) {
    return customUrl;
  }

  if (placeId) {
    return (
      "https://www.google.com/maps/search/?api=1" +
      "&query=City%20Coolies" +
      `&query_place_id=${encodeURIComponent(
        placeId,
      )}`
    );
  }

  return "https://www.google.com/maps/search/?api=1&query=City+Coolies+Chennai";
}

async function getBusinessProfileAccessToken() {
  const clientId =
    process.env
      .GOOGLE_BUSINESS_CLIENT_ID;

  const clientSecret =
    process.env
      .GOOGLE_BUSINESS_CLIENT_SECRET;

  const refreshToken =
    process.env
      .GOOGLE_BUSINESS_REFRESH_TOKEN;

  if (
    !clientId ||
    !clientSecret ||
    !refreshToken
  ) {
    return null;
  }

  const body =
    new URLSearchParams({
      client_id:
        clientId,

      client_secret:
        clientSecret,

      refresh_token:
        refreshToken,

      grant_type:
        "refresh_token",
    });

  const response =
    await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body,

        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Google Business OAuth token request failed.",
    );
  }

  const result =
    (await response.json()) as {
      access_token?: string;
    };

  if (
    !result.access_token
  ) {
    throw new Error(
      "Google Business OAuth access token was not returned.",
    );
  }

  return result.access_token;
}

async function fetchAllBusinessProfileReviews() {
  const accountId =
    process.env
      .GOOGLE_BUSINESS_ACCOUNT_ID;

  const locationId =
    process.env
      .GOOGLE_BUSINESS_LOCATION_ID;

  if (
    !accountId ||
    !locationId
  ) {
    return null;
  }

  const accessToken =
    await getBusinessProfileAccessToken();

  if (!accessToken) {
    return null;
  }

  const allReviews:
    BusinessProfileReview[] =
    [];

  let pageToken:
    string | undefined;

  let averageRating:
    number | undefined;

  let totalReviewCount:
    number | undefined;

  /*
   * Follow every nextPageToken so the website can
   * display the full review collection available
   * through the managed Business Profile.
   */
  for (
    let page = 0;
    page < 100;
    page += 1
  ) {
    const url =
      new URL(
        `https://mybusiness.googleapis.com/v4/accounts/${encodeURIComponent(
          accountId,
        )}/locations/${encodeURIComponent(
          locationId,
        )}/reviews`,
      );

    url.searchParams.set(
      "pageSize",
      "50",
    );

    if (pageToken) {
      url.searchParams.set(
        "pageToken",
        pageToken,
      );
    }

    const response =
      await fetch(
        url,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },

          cache:
            "no-store",
        },
      );

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Google Business Profile reviews request failed: ${response.status} ${errorText.slice(
          0,
          180,
        )}`,
      );
    }

    const result =
      (await response.json()) as BusinessProfileResponse;

    if (
      typeof result.averageRating ===
        "number"
    ) {
      averageRating =
        result.averageRating;
    }

    if (
      typeof result.totalReviewCount ===
        "number"
    ) {
      totalReviewCount =
        result.totalReviewCount;
    }

    if (
      Array.isArray(
        result.reviews,
      )
    ) {
      allReviews.push(
        ...result.reviews,
      );
    }

    pageToken =
      result.nextPageToken;

    if (!pageToken) {
      break;
    }
  }

  const reviews:
    PublicReview[] =
    allReviews
      .map(
        (
          review,
          index,
        ) => {
          const createTime =
            review.createTime ??
            review.updateTime;

          return {
            id:
              review.reviewId ??
              `${createTime ?? "review"}-${index}`,

            author:
              review.reviewer
                ?.displayName ??
              "Google Customer",

            rating:
              starRatingToNumber(
                review.starRating,
              ),

            text:
              review.comment ??
              "",

            relativeTime:
              relativeTime(
                createTime,
              ),

            createTime,
          };
        },
      )
      .sort(
        (
          first,
          second,
        ) => {
          const firstTime =
            first.createTime
              ? new Date(
                  first.createTime,
                ).getTime()
              : 0;

          const secondTime =
            second.createTime
              ? new Date(
                  second.createTime,
                ).getTime()
              : 0;

          return (
            secondTime -
            firstTime
          );
        },
      );

  if (
    typeof averageRating !==
      "number" &&
    reviews.length > 0
  ) {
    const rated =
      reviews.filter(
        (review) =>
          review.rating > 0,
      );

    if (
      rated.length > 0
    ) {
      averageRating =
        rated.reduce(
          (
            total,
            review,
          ) =>
            total +
            review.rating,
          0,
        ) /
        rated.length;
    }
  }

  return {
    configured: true,
    source:
      "business-profile" as const,
    allReviews: true,

    rating:
      averageRating,

    userRatingCount:
      totalReviewCount ??
      reviews.length,

    googleMapsUri:
      googleMapsUrl(
        process.env
          .GOOGLE_PLACE_ID,
      ),

    reviews,
  };
}

async function fetchPlacesReviews() {
  const apiKey =
    process.env
      .GOOGLE_PLACES_API_KEY;

  const placeId =
    process.env
      .GOOGLE_PLACE_ID;

  if (
    !apiKey ||
    !placeId
  ) {
    return null;
  }

  const response =
    await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(
        placeId,
      )}`,
      {
        headers: {
          "X-Goog-Api-Key":
            apiKey,

          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews",
        },

        cache:
          "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Google Places review request failed.",
    );
  }

  const place =
    (await response.json()) as PlacesResponse;

  const reviews:
    PublicReview[] =
    (place.reviews ?? [])
      .map(
        (
          review,
          index,
        ) => ({
          id:
            review.name ??
            `places-review-${index}`,

          author:
            review.authorAttribution
              ?.displayName ??
            "Google Customer",

          rating:
            review.rating ??
            0,

          text:
            review.text
              ?.text ??
            "",

          relativeTime:
            review.relativePublishTimeDescription ??
            relativeTime(
              review.publishTime,
            ),

          createTime:
            review.publishTime,
        }),
      );

  return {
    configured: true,
    source:
      "places" as const,

    /*
     * Places API is a genuine Google source,
     * but it does not expose the entire review
     * collection. Business Profile API is used
     * above when full access is configured.
     */
    allReviews: false,

    rating:
      place.rating,

    userRatingCount:
      place.userRatingCount,

    googleMapsUri:
      place.googleMapsUri ??
      googleMapsUrl(
        placeId,
      ),

    reviews,
  };
}

export async function GET() {
  try {
    /*
     * Preferred:
     * managed Business Profile -> all paginated reviews.
     */
    const businessProfile =
      await fetchAllBusinessProfileReviews();

    if (businessProfile) {
      return NextResponse.json(
        businessProfile,
        {
          headers: {
            "Cache-Control":
              "no-store, max-age=0",
          },
        },
      );
    }

    /*
     * Fallback:
     * Google Places -> genuine public rating
     * and the reviews Google exposes there.
     */
    const places =
      await fetchPlacesReviews();

    if (places) {
      return NextResponse.json(
        places,
        {
          headers: {
            "Cache-Control":
              "no-store, max-age=0",
          },
        },
      );
    }

    return NextResponse.json(
      {
        configured: false,
        source: "none",
        allReviews: false,
        reviews: [],

        message:
          "Google Business Profile connection is not configured yet.",
      },
      {
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error(
      "Google review integration error:",
      error,
    );

    /*
     * If Business Profile authorization has an issue,
     * try the public Places fallback before failing.
     */
    try {
      const places =
        await fetchPlacesReviews();

      if (places) {
        return NextResponse.json(
          places,
          {
            headers: {
              "Cache-Control":
                "no-store, max-age=0",
            },
          },
        );
      }
    } catch (
      fallbackError
    ) {
      console.error(
        "Google Places fallback error:",
        fallbackError,
      );
    }

    return NextResponse.json(
      {
        configured: false,
        source: "none",
        allReviews: false,
        reviews: [],

        message:
          "Live Google reviews are temporarily unavailable.",
      },
      {
        status: 503,

        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      },
    );
  }
}