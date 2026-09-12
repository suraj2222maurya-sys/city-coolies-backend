export type UpholsteryPricingItem = {
  id: string;
  name: string;
  unitPrice: number;
  unitLabel: string;
};

export const UPHOLSTERY_PRICING_ITEMS: Record<string, UpholsteryPricingItem> = {
  "sofa-seat": { id: "sofa-seat", name: "Sofa Deep Cleaning", unitPrice: 299, unitLabel: "seat" },
  "mattress-single": { id: "mattress-single", name: "Single Mattress Cleaning", unitPrice: 599, unitLabel: "mattress" },
  "mattress-double": { id: "mattress-double", name: "Double Mattress Cleaning", unitPrice: 899, unitLabel: "mattress" },
  "mattress-queen": { id: "mattress-queen", name: "Queen Mattress Cleaning", unitPrice: 1099, unitLabel: "mattress" },
  "mattress-king": { id: "mattress-king", name: "King Mattress Cleaning", unitPrice: 1299, unitLabel: "mattress" },
  "combo-sofa-seat": { id: "combo-sofa-seat", name: "Combo Sofa Cleaning", unitPrice: 249, unitLabel: "seat" },
  "combo-mattress-single": { id: "combo-mattress-single", name: "Combo Single Mattress", unitPrice: 499, unitLabel: "mattress" },
  "combo-mattress-double": { id: "combo-mattress-double", name: "Combo Double Mattress", unitPrice: 799, unitLabel: "mattress" },
  "combo-mattress-queen": { id: "combo-mattress-queen", name: "Combo Queen Mattress", unitPrice: 999, unitLabel: "mattress" },
  "combo-mattress-king": { id: "combo-mattress-king", name: "Combo King Mattress", unitPrice: 1199, unitLabel: "mattress" },
  "dining-chair": { id: "dining-chair", name: "Dining Chair Upholstery Cleaning", unitPrice: 199, unitLabel: "chair" },
  "recliner": { id: "recliner", name: "Recliner Deep Cleaning", unitPrice: 499, unitLabel: "recliner" },
  "office-sofa-seat": { id: "office-sofa-seat", name: "Office Sofa Cleaning", unitPrice: 279, unitLabel: "seat" },
  "office-chair": { id: "office-chair", name: "Office Chair Cleaning", unitPrice: 199, unitLabel: "chair" },
};

export type UpholsteryPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type UpholsteryCleaningPlan = {
  services: readonly UpholsteryPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateUpholsteryCleaningPlan(input: unknown): UpholsteryCleaningPlan | null {
  if (!Array.isArray(input) || input.length < 1 || input.length > 2) return null;
  const selected = new Set<string>();
  const services: UpholsteryPlanService[] = [];
  for (const value of input) {
    if (!value || typeof value !== "object") return null;
    const raw = value as { id?: unknown; quantity?: unknown };
    if (typeof raw.id !== "string" || typeof raw.quantity !== "number" || !Number.isSafeInteger(raw.quantity) || raw.quantity < 1 || raw.quantity > 100) return null;
    const item = UPHOLSTERY_PRICING_ITEMS[raw.id];
    if (!item || selected.has(item.id)) return null;
    const lineTotal = item.unitPrice * raw.quantity;
    if (!Number.isSafeInteger(lineTotal) || lineTotal <= 0) return null;
    selected.add(item.id);
    services.push({ id: item.id, name: item.name, quantity: raw.quantity, unitPrice: item.unitPrice, lineTotal });
  }
  const total = services.reduce((sum, service) => sum + service.lineTotal, 0);
  if (!Number.isSafeInteger(total) || total <= 0) return null;
  return { services, total, advanceAmount: Math.round(total * 0.5) };
}
