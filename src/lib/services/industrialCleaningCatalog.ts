export type IndustrialPricingUnit =
  | "square-foot"
  | "machine"
  | "unit";

export type IndustrialCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  pricingUnit: IndustrialPricingUnit;
  minimumQuantity: number;
  minimumLabel: string;
  pricingNote?: string;
  includes: readonly string[];
};

export const INDUSTRIAL_CLEANING_SERVICES: readonly IndustrialCleaningService[] =
  [
    {
      id: "factory-plant-deep-cleaning",
      name: "Factory & Plant Deep Cleaning",
      image: "/factory-plant-deep-cleaning.webp",
      description:
        "Professional cleaning for factory floors, work areas and production zones.",
      rating: 4.8,
      reviewCount: 1248,
      duration: "4–8 hrs",
      rate: 6,
      pricingUnit: "square-foot",
minimumQuantity: 1,
minimumLabel: "Enter required area",
      pricingNote: "Final quote after free site inspection",
      includes: [
        "Factory Floor Cleaning",
        "Work-Area Cleaning",
        "Production-Zone Cleaning",
      ],
    },
    {
      id: "warehouse-deep-cleaning",
      name: "Warehouse Deep Cleaning",
      image: "/warehouse-deep-cleaning.webp",
      description:
        "Thorough cleaning of warehouse floors, racks and storage areas.",
      rating: 4.7,
      reviewCount: 856,
      duration: "3–6 hrs",
      rate: 4,
      pricingUnit: "square-foot",
      minimumQuantity: 1,
minimumLabel: "Enter required area",
      pricingNote: "Final quote after free site inspection",
      includes: [
        "Warehouse Floor Cleaning",
        "Rack-Area Dust Removal",
        "Loading-Area Cleaning",
      ],
    },
    {
      id: "industrial-floor-scrubbing-degreasing",
      name: "Industrial Floor Scrubbing & Degreasing",
      image: "/industrial-floor-scrubbing-degreasing.webp",
      description:
        "Machine scrubbing for oil, grease and stubborn industrial floor stains.",
      rating: 4.8,
      reviewCount: 732,
      duration: "2–4 hrs",
      rate: 5,
      pricingUnit: "square-foot",
     minimumQuantity: 1,
minimumLabel: "Enter required area",
      pricingNote: "Final quote after free site inspection",
      includes: [
        "Machine Floor Scrubbing",
        "Oil & Grease Treatment",
        "Industrial Stain Removal",
      ],
    },
    {
      id: "machinery-exterior-cleaning",
      name: "Machinery Exterior Cleaning",
      image: "/machinery-exterior-cleaning.webp",
      description:
        "Safe exterior cleaning of industrial machines and equipment.",
      rating: 4.7,
      reviewCount: 612,
      duration: "2–3 hrs",
      rate: 799,
      pricingUnit: "machine",
      minimumQuantity: 1,
      minimumLabel: "Minimum 1 machine",
      pricingNote: "Final rate after inspection",
      includes: [
        "Exterior Surface Cleaning",
        "Dust & Grease Removal",
        "Control-Safe Wiping",
      ],
    },
    {
      id: "high-level-dust-cobweb-cleaning",
      name: "High-Level Dust & Cobweb Cleaning",
      image: "/high-level-dust-cobweb-cleaning.webp",
      description:
        "High-level dust and cobweb removal for ceilings, beams and structures.",
      rating: 4.7,
      reviewCount: 598,
      duration: "3–6 hrs",
      rate: 3,
      pricingUnit: "square-foot",
      minimumQuantity: 1,
minimumLabel: "Enter required area",
      pricingNote: "Rate varies by working height",
      includes: [
        "Ceiling Dust Removal",
        "Beam & Pipe Cleaning",
        "High-Level Cobweb Removal",
      ],
    },
    {
      id: "post-construction-industrial-cleaning",
      name: "Post-Construction Industrial Cleaning",
      image: "/post-construction-industrial-cleaning.webp",
      description:
        "Professional removal of construction dust and ordinary site debris.",
      rating: 4.6,
      reviewCount: 541,
      duration: "4–8 hrs",
      rate: 7,
      pricingUnit: "square-foot",
     minimumQuantity: 1,
minimumLabel: "Enter required area",
      pricingNote: "Final quote after free site inspection",
      includes: [
        "Construction Dust Removal",
        "Floor Machine Cleaning",
        "Ordinary Debris Collection",
      ],
    },
    {
      id: "industrial-washroom-worker-area-cleaning",
      name: "Industrial Washroom & Worker-Area Cleaning",
      image: "/industrial-washroom-worker-area-cleaning.webp",
      description:
        "Deep cleaning of industrial washrooms and worker rest areas.",
      rating: 4.7,
      reviewCount: 489,
      duration: "2–3 hrs",
      rate: 999,
      pricingUnit: "unit",
      minimumQuantity: 1,
      minimumLabel: "Minimum 1 unit",
      pricingNote: "Final rate after inspection",
      includes: [
        "Washroom Deep Cleaning",
        "Locker-Area Cleaning",
        "Worker Rest-Area Cleaning",
      ],
    },
  ] as const;

export function calculateIndustrialCleaningEstimate(
  service: IndustrialCleaningService,
  quantity: number,
): number | null {
  if (
    !Number.isFinite(quantity) ||
    quantity < service.minimumQuantity
  ) {
    return null;
  }

  return Math.round(service.rate * quantity);
}

export function getIndustrialPricingUnitLabel(
  pricingUnit: IndustrialPricingUnit,
): string {
  if (pricingUnit === "square-foot") {
    return "sq. ft.";
  }

  if (pricingUnit === "machine") {
    return "machine";
  }

  return "unit";
}

export type IndustrialCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type IndustrialCleaningPlan = {
  services: readonly IndustrialCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateIndustrialCleaningPlan(
  input: unknown,
): IndustrialCleaningPlan | null {
  if (
    !Array.isArray(input) ||
    input.length === 0 ||
    input.length > INDUSTRIAL_CLEANING_SERVICES.length
  ) {
    return null;
  }

  const selectedServiceIds = new Set<string>();
  const services: IndustrialCleaningPlanService[] = [];

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
      !Number.isSafeInteger(rawItem.quantity)
    ) {
      return null;
    }

    const service = INDUSTRIAL_CLEANING_SERVICES.find(
      (availableService) =>
        availableService.id === rawItem.id,
    );

    if (
      !service ||
      selectedServiceIds.has(service.id) ||
      rawItem.quantity < service.minimumQuantity
    ) {
      return null;
    }

    const lineTotal = calculateIndustrialCleaningEstimate(
      service,
      rawItem.quantity,
    );

    if (
      lineTotal === null ||
      !Number.isSafeInteger(lineTotal) ||
      lineTotal <= 0
    ) {
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
