export type VillaCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  includes: readonly string[];
};

export const VILLA_CLEANING_SERVICES: readonly VillaCleaningService[] = [
  {
    id: "complete-villa-deep-cleaning",
    name: "Complete Villa Deep Cleaning",
    image: "/complete-villa-deep-cleaning.webp",
    description: "End-to-end professional cleaning for rooms, floors, stairs, glass, kitchens, bathrooms and shared villa areas.",
    rating: 4.9,
    reviewCount: 1128,
    duration: "6–12 hrs",
    rate: 7,
    includes: ["All Rooms & Floors", "Kitchen & Bathrooms", "Stairs, Glass & Common Areas"],
  },
  {
    id: "furnished-villa-deep-cleaning",
    name: "Furnished Villa Deep Cleaning",
    image: "/furnished-villa-deep-cleaning.webp",
    description: "Detailed cleaning around furniture, décor, upholstery, cabinets and occupied living spaces.",
    rating: 4.8,
    reviewCount: 876,
    duration: "7–12 hrs",
    rate: 8,
    includes: ["Furniture-Safe Cleaning", "Upholstery Vacuuming", "Cabinet Exterior Cleaning"],
  },
  {
    id: "unfurnished-move-in-villa-cleaning",
    name: "Unfurnished / Move-in Villa Cleaning",
    image: "/unfurnished-move-in-villa-cleaning.webp",
    description: "Thorough cleaning for empty villas before move-in, handover or after moving out.",
    rating: 4.8,
    reviewCount: 742,
    duration: "5–10 hrs",
    rate: 6,
    includes: ["Empty Room Deep Cleaning", "Inside Cabinet Cleaning", "Move-in Hygiene Preparation"],
  },
  {
    id: "post-construction-villa-cleaning",
    name: "Post-Construction Villa Cleaning",
    image: "/post-construction-villa-cleaning.webp",
    description: "Professional removal of construction dust, paint specks and ordinary handover debris.",
    rating: 4.8,
    reviewCount: 618,
    duration: "8–14 hrs",
    rate: 10,
    includes: ["Construction Dust Removal", "Floor Machine Cleaning", "Paint-Speck Treatment"],
  },
  {
    id: "villa-exterior-balcony-terrace-cleaning",
    name: "Villa Exterior, Balcony & Terrace Cleaning",
    image: "/villa-exterior-balcony-terrace-cleaning.webp",
    description: "Pressure and manual cleaning for accessible patios, balconies, terraces, railings and exterior flooring.",
    rating: 4.7,
    reviewCount: 536,
    duration: "4–8 hrs",
    rate: 5,
    includes: ["Terrace & Patio Washing", "Balcony Glass Cleaning", "Railing & Exterior Floor Care"],
  },
  {
    id: "duplex-multi-floor-villa-cleaning",
    name: "Duplex & Multi-Floor Villa Cleaning",
    image: "/duplex-multi-floor-villa-cleaning.webp",
    description: "Coordinated deep cleaning across multiple floors, staircases, landings and accessible high-level areas.",
    rating: 4.9,
    reviewCount: 684,
    duration: "7–14 hrs",
    rate: 8,
    includes: ["Multi-Floor Cleaning", "Staircase & Landing Care", "Accessible High-Level Dusting"],
  },
] as const;

export type VillaCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type VillaCleaningPlan = {
  services: readonly VillaCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateVillaCleaningEstimate(service: VillaCleaningService, area: number): number | null {
  if (!Number.isSafeInteger(area) || area < 1) return null;
  const total = service.rate * area;
  return Number.isSafeInteger(total) && total > 0 ? total : null;
}

export function calculateVillaCleaningPlan(input: unknown): VillaCleaningPlan | null {
  if (!Array.isArray(input) || input.length !== 1) return null;
  const raw = input[0] as { id?: unknown; quantity?: unknown } | undefined;
  if (!raw || typeof raw.id !== "string" || typeof raw.quantity !== "number") return null;
  const service = VILLA_CLEANING_SERVICES.find((item) => item.id === raw.id);
  if (!service) return null;
  const lineTotal = calculateVillaCleaningEstimate(service, raw.quantity);
  if (lineTotal === null) return null;
  return {
    services: [{ id: service.id, name: service.name, quantity: raw.quantity, unitPrice: service.rate, lineTotal }],
    total: lineTotal,
    advanceAmount: Math.round(lineTotal * 0.5),
  };
}
