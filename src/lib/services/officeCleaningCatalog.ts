export type OfficeCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  minimumQuantity: number;
  includes: readonly string[];
};

export const OFFICE_CLEANING_SERVICES: readonly OfficeCleaningService[] = [
  {
    id: "complete-office-deep-cleaning",
    name: "Complete Office Deep Cleaning",
    image: "/complete-office-deep-cleaning.webp",
    description: "Complete professional cleaning for workstations, floors, glass, cabins and shared office areas.",
    rating: 4.9,
    reviewCount: 1386,
    duration: "4–8 hrs",
    rate: 6,
    minimumQuantity: 1,
    includes: ["Workstation Cleaning", "Floor Deep Cleaning", "Glass & Cabin Cleaning"],
  },
  {
    id: "corporate-office-floor-cleaning",
    name: "Corporate Office Floor Cleaning",
    image: "/corporate-office-floor-cleaning.webp",
    description: "Machine-assisted floor cleaning for corporate offices and large professional workplaces.",
    rating: 4.8,
    reviewCount: 924,
    duration: "3–6 hrs",
    rate: 5,
    minimumQuantity: 1,
    includes: ["Machine Scrubbing", "Edge & Corner Cleaning", "Floor Stain Treatment"],
  },
  {
    id: "coworking-space-cleaning",
    name: "Coworking Space Cleaning",
    image: "/coworking-space-cleaning.webp",
    description: "Flexible cleaning for shared desks, meeting rooms, lounges and high-touch surfaces.",
    rating: 4.8,
    reviewCount: 782,
    duration: "3–5 hrs",
    rate: 5,
    minimumQuantity: 1,
    includes: ["Shared Desk Cleaning", "Meeting Room Cleaning", "High-Touch Sanitization"],
  },
  {
    id: "office-pantry-washroom-hygiene",
    name: "Office Pantry & Washroom Hygiene",
    image: "/office-pantry-washroom-hygiene.webp",
    description: "Hygiene-focused deep cleaning for office pantries, washrooms and connected common areas.",
    rating: 4.9,
    reviewCount: 668,
    duration: "2–5 hrs",
    rate: 4,
    minimumQuantity: 1,
    includes: ["Pantry Degreasing", "Washroom Sanitization", "Common-Area Cleaning"],
  },
  {
    id: "office-carpet-chair-cleaning",
    name: "Office Carpet & Chair Cleaning",
    image: "/office-carpet-chair-cleaning.webp",
    description: "Professional extraction cleaning for office carpets and upholstered workstation chairs.",
    rating: 4.8,
    reviewCount: 596,
    duration: "3–6 hrs",
    rate: 7,
    minimumQuantity: 1,
    includes: ["Carpet Extraction", "Chair Upholstery Cleaning", "Odour Treatment"],
  },
] as const;

export type OfficeCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OfficeCleaningPlan = {
  services: readonly OfficeCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateOfficeCleaningEstimate(
  service: OfficeCleaningService,
  quantity: number,
): number | null {
  if (!Number.isSafeInteger(quantity) || quantity < service.minimumQuantity) return null;
  const total = service.rate * quantity;
  return Number.isSafeInteger(total) && total > 0 ? total : null;
}

export function calculateOfficeCleaningPlan(input: unknown): OfficeCleaningPlan | null {
  if (!Array.isArray(input) || input.length !== 1) return null;
  const raw = input[0] as { id?: unknown; quantity?: unknown } | undefined;
  if (!raw || typeof raw.id !== "string" || typeof raw.quantity !== "number") return null;
  const service = OFFICE_CLEANING_SERVICES.find((item) => item.id === raw.id);
  if (!service) return null;
  const lineTotal = calculateOfficeCleaningEstimate(service, raw.quantity);
  if (lineTotal === null) return null;
  return {
    services: [{ id: service.id, name: service.name, quantity: raw.quantity, unitPrice: service.rate, lineTotal }],
    total: lineTotal,
    advanceAmount: Math.round(lineTotal * 0.5),
  };
}
