export type PaintingCategory =
  | "Interior Painting"
  | "Exterior Painting"
  | "Decorative Painting"
  | "Putty & Primer"
  | "Waterproofing"
  | "Wood & Metal"
  | "Pipe & Utility Painting"
  | "Marking & Safety";

export type PaintingUnit = "Sq.ft" | "Rft" | "Nos";

export type PaintingService = {
  id: string;
  name: string;
  unit: PaintingUnit;
  price: number;
  image: string;
  category: PaintingCategory;
  popular?: boolean;
};

export const PAINTING_CATEGORIES: readonly PaintingCategory[] = [
  "Interior Painting",
  "Exterior Painting",
  "Decorative Painting",
  "Putty & Primer",
  "Waterproofing",
  "Wood & Metal",
  "Pipe & Utility Painting",
  "Marking & Safety",
] as const;

export const PAINTING_SERVICES: readonly PaintingService[] = [
  { id: "interior-wall-economy-emulsion", name: "Interior Wall – Economy Emulsion", unit: "Sq.ft", price: 22, image: "/painting-interior-wall-economy-emulsion.webp", category: "Interior Painting", popular: true },
  { id: "interior-wall-standard-emulsion", name: "Interior Wall – Standard Emulsion", unit: "Sq.ft", price: 32, image: "/painting-interior-wall-standard-emulsion.webp", category: "Interior Painting", popular: true },
  { id: "interior-wall-premium-emulsion", name: "Interior Wall – Premium Emulsion", unit: "Sq.ft", price: 48, image: "/painting-interior-wall-premium-emulsion.webp", category: "Interior Painting", popular: true },
  { id: "fresh-interior-painting", name: "Fresh Interior Painting", unit: "Sq.ft", price: 40, image: "/painting-fresh-interior.webp", category: "Interior Painting", popular: true },
  { id: "interior-repainting", name: "Interior Repainting", unit: "Sq.ft", price: 32, image: "/painting-interior-repainting.webp", category: "Interior Painting", popular: true },
  { id: "ceiling-painting-standard", name: "Ceiling Painting – Standard", unit: "Sq.ft", price: 28, image: "/painting-ceiling-standard.webp", category: "Interior Painting" },
  { id: "exterior-wall-standard", name: "Exterior Wall – Standard", unit: "Sq.ft", price: 38, image: "/painting-exterior-wall-standard.webp", category: "Exterior Painting" },
  { id: "exterior-weatherproof-painting", name: "Exterior Weatherproof Painting", unit: "Sq.ft", price: 52, image: "/painting-exterior-weatherproof.webp", category: "Exterior Painting", popular: true },
  { id: "premium-exterior-painting", name: "Premium Exterior Painting", unit: "Sq.ft", price: 55, image: "/painting-exterior-premium.webp", category: "Exterior Painting", popular: true },
  { id: "texture-painting", name: "Texture Painting", unit: "Sq.ft", price: 110, image: "/painting-texture.webp", category: "Decorative Painting", popular: true },
  { id: "designer-decorative-painting", name: "Designer / Decorative Painting", unit: "Sq.ft", price: 155, image: "/painting-designer-decorative.webp", category: "Decorative Painting" },
  { id: "wall-putty-one-coat", name: "Wall Putty – 1 Coat", unit: "Sq.ft", price: 20, image: "/painting-wall-putty-one-coat.webp", category: "Putty & Primer" },
  { id: "wall-putty-two-coats", name: "Wall Putty – 2 Coats", unit: "Sq.ft", price: 35, image: "/painting-wall-putty-two-coats.webp", category: "Putty & Primer", popular: true },
  { id: "interior-primer-one-coat", name: "Interior Primer – 1 Coat", unit: "Sq.ft", price: 12, image: "/painting-interior-primer-one-coat.webp", category: "Putty & Primer" },
  { id: "exterior-primer-one-coat", name: "Exterior Primer – 1 Coat", unit: "Sq.ft", price: 18, image: "/painting-exterior-primer-one-coat.webp", category: "Putty & Primer" },
  { id: "crack-filling-minor-repair", name: "Crack Filling / Minor Repair", unit: "Rft", price: 40, image: "/painting-crack-filling-minor-repair.webp", category: "Putty & Primer" },
  { id: "waterproof-coating", name: "Waterproof Coating", unit: "Sq.ft", price: 80, image: "/painting-waterproof-coating.webp", category: "Waterproofing" },
  { id: "terrace-waterproof-painting", name: "Terrace Waterproof Painting", unit: "Sq.ft", price: 80, image: "/painting-terrace-waterproof.webp", category: "Waterproofing" },
  { id: "metal-grill-painting", name: "Metal Grill Painting", unit: "Sq.ft", price: 70, image: "/painting-metal-grill.webp", category: "Wood & Metal" },
  { id: "ms-gate-painting", name: "MS Gate Painting", unit: "Sq.ft", price: 75, image: "/painting-ms-gate.webp", category: "Wood & Metal" },
  { id: "ms-railing-painting", name: "MS Railing Painting", unit: "Rft", price: 110, image: "/painting-ms-railing.webp", category: "Wood & Metal" },
  { id: "wood-door-painting", name: "Wood Door Painting", unit: "Sq.ft", price: 150, image: "/painting-wood-door.webp", category: "Wood & Metal" },
  { id: "wood-polish-varnish", name: "Wood Polish / Varnish", unit: "Sq.ft", price: 70, image: "/painting-wood-polish-varnish.webp", category: "Wood & Metal" },
  { id: "enamel-painting-metal", name: "Enamel Painting – Metal", unit: "Sq.ft", price: 100, image: "/painting-enamel-metal.webp", category: "Wood & Metal" },
  { id: "pipe-painting", name: "Pipe Painting", unit: "Rft", price: 55, image: "/painting-pipe.webp", category: "Pipe & Utility Painting" },
  { id: "fire-pipe-painting", name: "Fire Pipe Painting", unit: "Rft", price: 60, image: "/painting-fire-pipe.webp", category: "Pipe & Utility Painting" },
  { id: "parking-line-marking", name: "Parking Line Marking", unit: "Rft", price: 65, image: "/painting-parking-line-marking.webp", category: "Marking & Safety" },
  { id: "parking-bay-marking", name: "Parking Bay Marking", unit: "Nos", price: 450, image: "/painting-parking-bay-marking.webp", category: "Marking & Safety" },
  { id: "road-kerb-painting", name: "Road / Kerb Painting", unit: "Rft", price: 45, image: "/painting-road-kerb.webp", category: "Marking & Safety" },
  { id: "safety-yellow-black-painting", name: "Safety Yellow / Black Painting", unit: "Sq.ft", price: 70, image: "/painting-safety-yellow-black.webp", category: "Marking & Safety" },
] as const;

type SubmittedItem = { id?: unknown; quantity?: unknown };

export type CalculatedPaintingService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CalculatedPaintingPlan = {
  services: CalculatedPaintingService[];
  subtotal: number;
  gstAmount: number;
  total: number;
  advanceAmount: number;
};

export function calculatePaintingPlan(input: unknown): CalculatedPaintingPlan | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const serviceMap = new Map(PAINTING_SERVICES.map((service) => [service.id, service]));
  const quantities = new Map<string, number>();

  for (const item of input as SubmittedItem[]) {
    if (typeof item?.id !== "string") return null;
    const service = serviceMap.get(item.id);
    if (!service) return null;

    const quantity = Number(item.quantity);
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100000) return null;
    quantities.set(service.id, (quantities.get(service.id) ?? 0) + quantity);
  }

  const services = Array.from(quantities.entries()).map(([id, quantity]) => {
    const service = serviceMap.get(id)!;
    return {
      id,
      name: service.name,
      quantity,
      unitPrice: service.price,
      lineTotal: service.price * quantity,
    };
  });

  const subtotal = services.reduce((sum, service) => sum + service.lineTotal, 0);
  const gstAmount = 0;
  const total = subtotal;
  return { services, subtotal, gstAmount, total, advanceAmount: Math.round(total * 0.5) };
}

export function calculatePaintingSiteSurvey(input: unknown): CalculatedPaintingPlan | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const serviceMap = new Map(PAINTING_SERVICES.map((service) => [service.id, service]));
  const selectedIds = new Set<string>();

  for (const item of input as SubmittedItem[]) {
    if (typeof item?.id !== "string" || !serviceMap.has(item.id)) return null;
    selectedIds.add(item.id);
  }

  const services = Array.from(selectedIds).map((id) => ({
    id,
    name: serviceMap.get(id)!.name,
    quantity: 1,
    unitPrice: 0,
    lineTotal: 0,
  }));

  return { services, subtotal: 500, gstAmount: 0, total: 500, advanceAmount: 500 };
}
