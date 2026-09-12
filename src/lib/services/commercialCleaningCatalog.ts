export type CommercialCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  includes: readonly string[];
  pricingNote: string;
};

export const COMMERCIAL_CLEANING_SERVICES: readonly CommercialCleaningService[] =
  [
    {
      id: "office-corporate-deep-cleaning",
      name: "Office & Corporate Deep Cleaning",
      image: "/commercial-office-cleaning.webp",
      description:
        "Professional deep cleaning for offices, corporate floors, cabins and workstations.",
      rating: 4.9,
      reviewCount: 1842,
      duration: "4–8 hrs",
      rate: 5,
      includes: [
        "Workstation Cleaning",
        "Machine Floor Scrubbing",
        "Cabin & Common-Area Cleaning",
      ],
      pricingNote: "Final quote confirmed after free site inspection",
    },
    {
      id: "retail-showroom-cleaning",
      name: "Retail & Showroom Cleaning",
      image: "/retail-showroom-cleaning.webp",
      description:
        "Premium cleaning for retail stores, display areas, glass and showroom floors.",
      rating: 4.8,
      reviewCount: 926,
      duration: "3–6 hrs",
      rate: 6,
      includes: [
        "Display-Area Cleaning",
        "Glass & Mirror Cleaning",
        "Machine Floor Cleaning",
      ],
      pricingNote: "Final quote confirmed after inspection",
    },
    {
      id: "restaurant-cafe-cleaning",
      name: "Restaurant & Café Cleaning",
      image: "/restaurant-cafe-cleaning.webp",
      description:
        "Food-safe deep cleaning for dining areas, service zones and commercial floors.",
      rating: 4.9,
      reviewCount: 1186,
      duration: "4–7 hrs",
      rate: 8,
      includes: [
        "Dining-Area Cleaning",
        "Grease & Stain Treatment",
        "Food-Safe Sanitization",
      ],
      pricingNote: "Final quote confirmed after inspection",
    },
    {
      id: "hotel-hospitality-cleaning",
      name: "Hotel & Hospitality Cleaning",
      image: "/hotel-hospitality-cleaning.webp",
      description:
        "High-standard cleaning for hotel lobbies, corridors and hospitality spaces.",
      rating: 4.9,
      reviewCount: 764,
      duration: "5–9 hrs",
      rate: 7,
      includes: [
        "Lobby & Reception Cleaning",
        "Glass & Surface Cleaning",
        "Floor Polishing Support",
      ],
      pricingNote: "Final quote confirmed after inspection",
    },
    {
      id: "hospital-clinic-sanitization",
      name: "Hospital & Clinic Sanitization",
      image: "/hospital-clinic-sanitization.webp",
      description:
        "Controlled hygiene cleaning for clinics, reception areas and healthcare spaces.",
      rating: 4.9,
      reviewCount: 638,
      duration: "4–8 hrs",
      rate: 9,
      includes: [
        "High-Touch Sanitization",
        "Reception & Corridor Cleaning",
        "Professional Disinfection",
      ],
      pricingNote: "Site assessment required before service",
    },
    {
      id: "school-institution-cleaning",
      name: "School & Institution Cleaning",
      image: "/school-institution-cleaning.webp",
      description:
        "Safe professional cleaning for classrooms, corridors and educational facilities.",
      rating: 4.8,
      reviewCount: 812,
      duration: "4–8 hrs",
      rate: 4,
      includes: [
        "Classroom Cleaning",
        "Desk & Surface Sanitization",
        "Corridor Floor Cleaning",
      ],
      pricingNote: "Final quote confirmed after inspection",
    },
    {
      id: "mall-common-area-cleaning",
      name: "Mall & Common-Area Cleaning",
      image: "/mall-common-area-cleaning.webp",
      description:
        "Large-scale machine cleaning for malls, atriums and commercial common areas.",
      rating: 4.8,
      reviewCount: 592,
      duration: "6–10 hrs",
      rate: 5,
      includes: [
        "Ride-On Floor Scrubbing",
        "Glass & Railing Cleaning",
        "Common-Area Cleaning",
      ],
      pricingNote: "Final quote confirmed after inspection",
    },
  ] as const;

export type CommercialCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CommercialCleaningPlan = {
  services: readonly CommercialCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateCommercialCleaningEstimate(
  service: CommercialCleaningService,
  squareFeet: number,
): number | null {
  if (
    !Number.isSafeInteger(squareFeet) ||
    squareFeet <= 0
  ) {
    return null;
  }

  const total = service.rate * squareFeet;

  return Number.isSafeInteger(total) && total > 0
    ? total
    : null;
}

export function calculateCommercialCleaningPlan(
  input: unknown,
): CommercialCleaningPlan | null {
  if (
    !Array.isArray(input) ||
    input.length === 0 ||
    input.length > COMMERCIAL_CLEANING_SERVICES.length
  ) {
    return null;
  }

  const selectedServiceIds = new Set<string>();
  const services: CommercialCleaningPlanService[] = [];

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

    const service = COMMERCIAL_CLEANING_SERVICES.find(
      (availableService) =>
        availableService.id === rawItem.id,
    );

    if (!service || selectedServiceIds.has(service.id)) {
      return null;
    }

    const lineTotal = calculateCommercialCleaningEstimate(
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
