import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "@/lib/payments/razorpay";

import {
  calculateAdvanceAmount,
  calculateCustomBathroomCleaningPlan,
  calculateCustomCleaningPlan,
  calculateCustomKitchenCleaningPlan,
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
type CreateOrderRequest = {
  packageId?: string;
  customServices?: unknown;
};

type TrustedService = {
  id: string;
  name: string;
  quantity: number;
  days?: number;
  unitPrice: number;
  lineTotal: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;
    const packageId = body.packageId?.trim();

    if (!packageId) {
      return NextResponse.json(
        {
          success: false,
          message: "Service package is required.",
        },
        { status: 400 },
      );
    }

    const isCustomHomeCleaning =
      packageId === "custom-cleaning-plan";

    const isCustomKitchenCleaning =
      packageId === "custom-kitchen-cleaning-plan";

    const isCustomBathroomCleaning =
      packageId === "custom-bathroom-cleaning-plan";

    const isIndustrialCleaningPlan =
      packageId === "industrial-cleaning-plan";

    const isCommercialCleaningPlan =
      packageId === "commercial-cleaning-plan";

    const isCobwebCleaningPlan =
  packageId === "cobweb-cleaning-plan";

const isOfficeCleaningPlan =
  packageId === "office-cleaning-plan";

const isVillaCleaningPlan =
  packageId === "villa-cleaning-plan";

const isUpholsteryCleaningPlan =
packageId === "upholstery-cleaning-plan";

const isWaterTankCleaningPlan =
packageId === "water-tank-cleaning-plan";

const isApplianceRepairPlan =
  packageId === "appliance-repair-plan";

const isPlumbingPlan =
  packageId === "plumbing-works-plan";

    const isPaintingPlan =
  packageId === "painting-works-plan";

    const isDynamicPlan =
      isPaintingPlan ||
      isCustomHomeCleaning ||
      isCustomKitchenCleaning ||
      isCustomBathroomCleaning ||
      isIndustrialCleaningPlan ||
          isCommercialCleaningPlan ||
    isCobwebCleaningPlan ||
    isOfficeCleaningPlan ||
    isVillaCleaningPlan ||
isUpholsteryCleaningPlan ||
isWaterTankCleaningPlan ||
      isPlumbingPlan ||
      isApplianceRepairPlan;

    let serviceName: string;
    let originalPrice: number;
    let offerPrice: number;
    let advanceAmount: number;
    let trustedCustomServices: TrustedService[] = [];

    if (isDynamicPlan) {
      const customPlan = isApplianceRepairPlan
          ? calculateApplianceRepairPlan(body.customServices)
          : (isPaintingPlan
        ? calculatePaintingPlan(body.customServices)
        : isPlumbingPlan
        ? calculatePlumbingPlan(body.customServices)
        : isWaterTankCleaningPlan
? calculateWaterTankCleaningPlan(body.customServices)
: isUpholsteryCleaningPlan
? calculateUpholsteryCleaningPlan(body.customServices)
    : isVillaCleaningPlan
    ? calculateVillaCleaningPlan(body.customServices)
    : isOfficeCleaningPlan
    ? calculateOfficeCleaningPlan(body.customServices)
    : isCobwebCleaningPlan
    ? calculateCobwebCleaningPlan(body.customServices)
        : isCommercialCleaningPlan
          ? calculateCommercialCleaningPlan(body.customServices)
        : isIndustrialCleaningPlan
          ? calculateIndustrialCleaningPlan(body.customServices)
          : isCustomBathroomCleaning
            ? calculateCustomBathroomCleaningPlan(body.customServices)
            : isCustomKitchenCleaning
              ? calculateCustomKitchenCleaningPlan(body.customServices)
              : calculateCustomCleaningPlan(body.customServices));

      if (!customPlan) {
        const message = isApplianceRepairPlan
          ? "Please select at least one valid appliance service."
          : (isPaintingPlan
          ? "Please select a valid painting service."
          : isPlumbingPlan
          ? "Please select a valid plumbing service."
          : isWaterTankCleaningPlan
  ? "Please select a valid tank capacity and quantity."
  : isUpholsteryCleaningPlan
  ? "Please select valid upholstery-cleaning quantities."
      : isVillaCleaningPlan
      ? "Please enter a valid villa cleaning area."
      : isOfficeCleaningPlan
      ? "Please enter a valid office cleaning area."
      : isCobwebCleaningPlan
      ? "Please enter a valid cobweb cleaning quantity."
          : isCommercialCleaningPlan
            ? "Please enter a valid commercial cleaning area."
          : isIndustrialCleaningPlan
            ? "Please enter a valid industrial service quantity."
            : isCustomBathroomCleaning
              ? "Please select at least one valid bathroom-cleaning service."
              : isCustomKitchenCleaning
                ? "Please select at least one valid kitchen-cleaning service."
                : "Please select at least one valid cleaning service.");

        return NextResponse.json(
          {
            success: false,
            message,
          },
          { status: 400 },
        );
      }

      serviceName = isApplianceRepairPlan
          ? "Appliance Repair Plan"
          : (isPaintingPlan
        ? "Painting Works Booking"
        : isPlumbingPlan
        ? "Plumbing Works Booking"
        : isWaterTankCleaningPlan
? "Water Tank Cleaning Plan"
: isUpholsteryCleaningPlan
? "Mattress & Sofa Cleaning Plan"
    : isVillaCleaningPlan
    ? "Villa Cleaning Plan"
    : isOfficeCleaningPlan
    ? "Office Cleaning Plan"
    : isCobwebCleaningPlan
    ? "Cobweb Cleaning Plan"
        : isCommercialCleaningPlan
          ? "Commercial Cleaning Plan"
        : isIndustrialCleaningPlan
          ? "Industrial Cleaning Plan"
          : isCustomBathroomCleaning
            ? "Custom Bathroom Cleaning Plan"
            : isCustomKitchenCleaning
              ? "Custom Kitchen Cleaning Plan"
              : "Customized Cleaning Plan");

      originalPrice = customPlan.total;
      offerPrice = customPlan.total;
      advanceAmount = customPlan.advanceAmount;
      trustedCustomServices = [...customPlan.services];
    } else if (packageId === "carpentry-interior-booking") {
      const plan = calculateCarpentryInteriorBooking(body.customServices);

      if (!plan) {
        return NextResponse.json(
          { success: false, message: "Please select a valid carpentry or interior service." },
          { status: 400 },
        );
      }

      serviceName = plan.surveyFee > 0 ? "Carpentry & Interior Booking" : "Professional Carpenter Labour Booking";
      originalPrice = plan.total;
      offerPrice = plan.total;
      advanceAmount = plan.advanceAmount;
      trustedCustomServices = [...plan.services];
    } else if (packageId === "carpentry-interior-site-survey") {
      const survey = calculateCarpentryInteriorSurvey(body.customServices);

      if (!survey) {
        return NextResponse.json(
          { success: false, message: "Please select at least one valid carpentry or interior service." },
          { status: 400 },
        );
      }

      serviceName = "Carpentry & Interior - Site Survey";
      originalPrice = survey.total;
      offerPrice = survey.total;
      advanceAmount = survey.advanceAmount;
      trustedCustomServices = [...survey.services];
    } else if (packageId === "fabrication-site-survey") {
      const fabricationSurvey = calculateFabricationSurvey(body.customServices);

      if (!fabricationSurvey) {
        return NextResponse.json(
          { success: false, message: "Please select at least one valid fabrication requirement." },
          { status: 400 },
        );
      }

      serviceName = "Fabrication Works - Site Survey";
      originalPrice = fabricationSurvey.total;
      offerPrice = fabricationSurvey.total;
      advanceAmount = fabricationSurvey.advanceAmount;
      trustedCustomServices = [...fabricationSurvey.services];
    } else if (packageId === "painting-site-survey") {
      const survey = calculatePaintingSiteSurvey(body.customServices);

      if (!survey) {
        return NextResponse.json(
          { success: false, message: "Please select at least one valid painting service." },
          { status: 400 },
        );
      }

      serviceName = "Painting Works - Site Survey";
      originalPrice = 500;
      offerPrice = 500;
      advanceAmount = 500;
      trustedCustomServices = [...survey.services];
    } else if (
      packageId === "plumbing-site-visit"
    ) {
      const siteVisit = calculatePlumbingSiteVisit(body.customServices);

      if (!siteVisit) {
        return NextResponse.json(
          { success: false, message: "Please select a valid plumbing inspection service." },
          { status: 400 },
        );
      }

      serviceName = siteVisit.services[0]!.name;
      originalPrice = siteVisit.total;
      offerPrice = siteVisit.total;
      advanceAmount = siteVisit.advanceAmount;
      trustedCustomServices = [...siteVisit.services];
    } else if (
      packageId === "new-home-plumbing-site-visit"
    ) {
      serviceName = "New Home Complete Plumbing Work - Site Visit";
      originalPrice = 500;
      offerPrice = 500;
      advanceAmount = 500;
    } else if (
      packageId ===
      "full-house-electrical-site-survey"
    ) {
      serviceName =
        "Full House Electrical Wiring - Site Survey";
      originalPrice = 500;
      offerPrice = 500;
      advanceAmount = 500;
    } else {
      const servicePackage =
        getServicePackage(packageId);

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

      serviceName = servicePackage.name;
      originalPrice =
        servicePackage.originalPrice;
      offerPrice =
        servicePackage.offerPrice;
      advanceAmount =
        calculateAdvanceAmount(
          servicePackage,
        );
    }

    if (
      !Number.isSafeInteger(advanceAmount) ||
      advanceAmount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid payment amount is required.",
        },
        { status: 400 },
      );
    }

    const receipt = `cc_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const customPlanType = packageId === "carpentry-interior-booking"
          ? "carpentry-interior-booking"
          : packageId === "carpentry-interior-site-survey"
          ? "carpentry-interior-site-survey"
          : isApplianceRepairPlan
          ? "appliance"
          : (packageId === "painting-site-survey"
? "painting-site-survey"
: isPaintingPlan
? "painting"
: packageId === "plumbing-site-visit"
? "plumbing-site-visit"
: isPlumbingPlan
? "plumbing"
: isWaterTankCleaningPlan
? "water-tank"
: isUpholsteryCleaningPlan
  ? "upholstery"
  : isVillaCleaningPlan
  ? "villa"
  : isOfficeCleaningPlan
  ? "office"
  : isCobwebCleaningPlan
  ? "cobweb"
      : isCommercialCleaningPlan
        ? "commercial"
      : isIndustrialCleaningPlan
        ? "industrial"
        : isCustomBathroomCleaning
          ? "bathroom"
          : isCustomKitchenCleaning
            ? "kitchen"
            : isCustomHomeCleaning
              ? "home"
              : "fixed");

    const customServiceIdsRaw = trustedCustomServices
      .map(
        (service) =>
          `${service.id}:${service.quantity}${packageId === "carpentry-interior-booking" ? `:${service.days ?? 0}` : ""}`,
      )
      .join("|");
    const customServiceIds = packageId === "carpentry-interior-booking" || packageId === "carpentry-interior-site-survey"
      ? `sha256:${createHash("sha256").update(customServiceIdsRaw).digest("hex")}`
      : customServiceIdsRaw;

    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: advanceAmount * 100,
      currency: "INR",
      receipt,
      notes: {
        packageId,
        serviceName,
        paymentType:
          packageId === "carpentry-interior-booking"
            ? "full_booking_payment"
          : packageId === "carpentry-interior-site-survey"
            ? "full_site_survey_payment"
          : packageId === "painting-site-survey"
            ? "full_site_visit_payment"
          : packageId === "plumbing-site-visit"
            ? "full_site_visit_payment"
            : packageId === "new-home-plumbing-site-visit"
              ? "full_site_visit_payment"
            : packageId === "full-house-electrical-site-survey"
              ? "full_site_survey_payment"
              : "50_percent_advance",
        customPlanType,
        customServiceIds,
      },
    });

    return NextResponse.json(
      {
        success: true,
        keyId: getRazorpayKeyId(),
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        serviceName,
        originalPrice,
        offerPrice,
        advanceAmount,
        customServices: trustedCustomServices,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Razorpay order creation error:",
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
