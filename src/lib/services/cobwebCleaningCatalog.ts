export type CobwebPricingUnit =
  | "room"
  | "living-room"
  | "balcony"
  | "kitchen"
  | "square-foot";

export type CobwebCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  pricingUnit: CobwebPricingUnit;
  includes: readonly string[];
  pricingNote: string;
};

export const COBWEB_CLEANING_SERVICES: readonly CobwebCleaningService[] =
  [
    {
      id: "full-room-cobweb-cleaning",
      name: "Full-Room Ceiling & Cobweb Cleaning",
      image: "/full-room-cobweb-cleaning.webp",
      description:
        "Professional dry dusting and cobweb removal from ceiling edges, corners and accessible high surfaces.",
      rating: 4.9,
      reviewCount: 4826,
      duration: "30–45 mins / room",
      rate: 199,
      pricingUnit: "room",
      includes: [
        "Ceiling Corner Cleaning",
        "Cobweb Removal",
        "Dry Dusting",
      ],
      pricingNote:
        "Wet wiping, paint removal and inaccessible exterior areas are excluded",
    },
    {
      id: "ceiling-corner-cobweb-removal",
      name: "Ceiling Corner Cobweb Removal",
      image: "/ceiling-corner-cobweb-removal.webp",
      description:
        "Focused cobweb removal and dry dusting for bedroom and room ceiling corners.",
      rating: 4.8,
      reviewCount: 2168,
      duration: "20–30 mins / room",
      rate: 149,
      pricingUnit: "room",
      includes: [
        "Corner Cobweb Removal",
        "Ceiling-Edge Dusting",
        "Vacuum Dust Collection",
      ],
      pricingNote: "Price is calculated by number of rooms",
    },
    {
      id: "living-room-cobweb-care",
      name: "Living Room Cobweb Care",
      image: "/living-room-cobweb-care.webp",
      description:
        "Complete living-room care covering cobwebs, ceiling fan, windows and sofa vacuuming.",
      rating: 4.9,
      reviewCount: 3542,
      duration: "75–105 mins",
      rate: 749,
      pricingUnit: "living-room",
      includes: [
        "Cobweb & Fan Cleaning",
        "Window Wiping",
        "Sofa Vacuuming",
      ],
      pricingNote: "Price is calculated per living room",
    },
    {
      id: "balcony-grill-cobweb-cleaning",
      name: "Balcony & Grill Cobweb Cleaning",
      image: "/balcony-grill-cobweb-cleaning.webp",
      description:
        "Cobweb removal and surface cleaning for accessible balcony corners, grills and railings.",
      rating: 4.8,
      reviewCount: 1876,
      duration: "45–60 mins",
      rate: 349,
      pricingUnit: "balcony",
      includes: [
        "Balcony Corner Cleaning",
        "Grill Cobweb Removal",
        "Railing Wiping",
      ],
      pricingNote: "Exterior work is limited to safely accessible areas",
    },
    {
      id: "kitchen-ceiling-cobweb-cleaning",
      name: "Kitchen Ceiling & Vent Cobweb Cleaning",
      image: "/kitchen-ceiling-cobweb-cleaning.webp",
      description:
        "Safe dry cleaning for kitchen ceiling corners and accessible exterior vent areas.",
      rating: 4.8,
      reviewCount: 1624,
      duration: "30–45 mins",
      rate: 249,
      pricingUnit: "kitchen",
      includes: [
        "Ceiling Cobweb Removal",
        "Corner Dry Dusting",
        "Vent Exterior Dusting",
      ],
      pricingNote: "Internal duct and chimney servicing are excluded",
    },
    {
      id: "office-shop-cobweb-cleaning",
      name: "Office & Shop Cobweb Cleaning",
      image: "/office-shop-cobweb-cleaning.webp",
      description:
        "Professional cobweb and high-surface dry dusting for offices, shops and showrooms.",
      rating: 4.8,
      reviewCount: 1138,
      duration: "2–5 hrs",
      rate: 3,
      pricingUnit: "square-foot",
      includes: [
        "Ceiling-Edge Cleaning",
        "High-Shelf Dusting",
        "Vent Exterior Cleaning",
      ],
      pricingNote: "Final quote confirmed after free site inspection",
    },
    {
      id: "duplex-high-ceiling-cobweb-cleaning",
      name: "Duplex & High-Ceiling Cobweb Cleaning",
      image: "/duplex-high-ceiling-cobweb-cleaning.webp",
      description:
        "Specialized telescopic cleaning for duplex homes, staircases and accessible high ceilings.",
      rating: 4.9,
      reviewCount: 846,
      duration: "3–6 hrs",
      rate: 6,
      pricingUnit: "square-foot",
      includes: [
        "Double-Height Corner Cleaning",
        "Staircase Cobweb Removal",
        "Telescopic Dry Dusting",
      ],
      pricingNote:
        "Final quote depends on height and safe accessibility",
    },
  ] as const;

export function getCobwebPricingUnitLabel(
  pricingUnit: CobwebPricingUnit,
): string {
  if (pricingUnit === "room") {
    return "room";
  }

  if (pricingUnit === "living-room") {
    return "living room";
  }

  if (pricingUnit === "balcony") {
    return "balcony";
  }

  if (pricingUnit === "kitchen") {
    return "kitchen";
  }

  return "sq. ft.";
}

export type CobwebCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CobwebCleaningPlan = {
  services: readonly CobwebCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateCobwebCleaningEstimate(
  service: CobwebCleaningService,
  quantity: number,
): number | null {
  if (
    !Number.isSafeInteger(quantity) ||
    quantity <= 0
  ) {
    return null;
  }

  const total = service.rate * quantity;

  return Number.isSafeInteger(total) && total > 0
    ? total
    : null;
}

export function calculateCobwebCleaningPlan(
  input: unknown,
): CobwebCleaningPlan | null {
  if (
    !Array.isArray(input) ||
    input.length === 0 ||
    input.length > COBWEB_CLEANING_SERVICES.length
  ) {
    return null;
  }

  const selectedServiceIds = new Set<string>();
  const services: CobwebCleaningPlanService[] = [];

  for (const inputItem of input) {
    if (!inputItem || typeof inputItem !== "object") {
      return null;
    }

    const rawItem = inputItem as {
      id?: unknown;
      quantity?: unknown;
    };

    if (
      typeof rawItem.id !== "string" ||
      typeof rawItem.quantity !== "number" ||
      !Number.isSafeInteger(rawItem.quantity) ||
      rawItem.quantity <= 0
    ) {
      return null;
    }

    const service = COBWEB_CLEANING_SERVICES.find(
      (availableService) =>
        availableService.id === rawItem.id,
    );

    if (!service || selectedServiceIds.has(service.id)) {
      return null;
    }

    const lineTotal = calculateCobwebCleaningEstimate(
      service,
      rawItem.quantity,
    );

    if (lineTotal === null) {
      return null;
    }

    selectedServiceIds.add(service.id);

    services.push({
      id: service.id,
      name: service.name,
      quantity: rawItem.quantity,
      unitPrice: service.rate,
      lineTotal,
    });
  }

  const total = services.reduce(
    (currentTotal, service) =>
      currentTotal + service.lineTotal,
    0,
  );

  if (!Number.isSafeInteger(total) || total <= 0) {
    return null;
  }

  return {
    services,
    total,
    advanceAmount: Math.round(total * 0.5),
  };
}
