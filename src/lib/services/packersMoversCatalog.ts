export type PackersMoversCategory =
  | "all"
  | "local-home"
  | "intercity"
  | "office-commercial"
  | "vehicle"
  | "packing-labour"
  | "storage";

export type PackersMoversService = {
  id: string;
  name: string;
  category: Exclude<PackersMoversCategory, "all">;
  image: string;
  basePrice: number;
  unit: string;
  details: readonly string[];
  popular?: boolean;
};

export const PACKERS_MOVERS_CATEGORIES = [
  { id: "all", label: "All Moves", icon: "grid" },
  { id: "local-home", label: "Local Home Shifting", icon: "home" },
  { id: "intercity", label: "Intercity Moving", icon: "route" },
  { id: "office-commercial", label: "Office & Commercial", icon: "building" },
  { id: "vehicle", label: "Vehicle Transport", icon: "bike" },
  { id: "packing-labour", label: "Packing & Labour", icon: "package" },
  { id: "storage", label: "Storage", icon: "box" },
] as const;

export const PACKERS_MOVERS_SERVICES: readonly PackersMoversService[] = [
  { id: "few-items-shifting", name: "Few Items Shifting", category: "local-home", image: "/packers-movers-few-items-shifting.webp", basePrice: 1799, unit: "move", details: ["Up to 10 items", "1 mover & helper", "Safe loading"], popular: true },
  { id: "pg-hostel-room-shifting", name: "PG / Hostel Room Shifting", category: "local-home", image: "/packers-movers-pg-hostel-room-shifting.webp", basePrice: 2299, unit: "move", details: ["Personal belongings", "Compact vehicle", "Door-to-door"] },
  { id: "1rk-home-shifting", name: "1 RK Home Shifting", category: "local-home", image: "/packers-movers-1rk-home-shifting.webp", basePrice: 2799, unit: "move", details: ["1 RK inventory", "1 mover & helper", "Basic protection"], popular: true },
  { id: "1bhk-home-shifting", name: "1 BHK Home Shifting", category: "local-home", image: "/packers-movers-1bhk-home-shifting.webp", basePrice: 4999, unit: "move", details: ["1 BHK inventory", "2 movers & helper", "Standard packing"], popular: true },
  { id: "2bhk-home-shifting", name: "2 BHK Home Shifting", category: "local-home", image: "/packers-movers-2bhk-home-shifting.webp", basePrice: 8999, unit: "move", details: ["2 BHK inventory", "3 movers & helper", "Standard packing"], popular: true },
  { id: "3bhk-home-shifting", name: "3 BHK Home Shifting", category: "local-home", image: "/packers-movers-3bhk-home-shifting.webp", basePrice: 13999, unit: "move", details: ["3 BHK inventory", "4 movers & helper", "Premium packing"] },
  { id: "4bhk-home-shifting", name: "4 BHK Home Shifting", category: "local-home", image: "/packers-movers-4bhk-home-shifting.webp", basePrice: 18999, unit: "move", details: ["4 BHK inventory", "Dedicated crew", "Premium protection"] },
  { id: "villa-independent-house-shifting", name: "Villa / Independent House Shifting", category: "local-home", image: "/packers-movers-villa-independent-house-shifting.webp", basePrice: 24999, unit: "move", details: ["Large inventory", "Dedicated truck", "Move supervisor"] },
  { id: "same-building-society-shifting", name: "Same Building / Society Shifting", category: "local-home", image: "/packers-movers-same-building-society-shifting.webp", basePrice: 1999, unit: "move", details: ["Within premises", "Moving equipment", "Careful placement"] },

  { id: "1rk-intercity-relocation", name: "1 RK Intercity Relocation", category: "intercity", image: "/packers-movers-1rk-intercity-relocation.webp", basePrice: 5999, unit: "move", details: ["Sealed inventory", "Transit packing", "Distance billed separately"] },
  { id: "1bhk-intercity-relocation", name: "1 BHK Intercity Relocation", category: "intercity", image: "/packers-movers-1bhk-intercity-relocation.webp", basePrice: 8999, unit: "move", details: ["1 BHK inventory", "Transit protection", "Tracking updates"], popular: true },
  { id: "2bhk-intercity-relocation", name: "2 BHK Intercity Relocation", category: "intercity", image: "/packers-movers-2bhk-intercity-relocation.webp", basePrice: 13999, unit: "move", details: ["2 BHK inventory", "Transit packing", "Tracking updates"] },
  { id: "3bhk-intercity-relocation", name: "3 BHK Intercity Relocation", category: "intercity", image: "/packers-movers-3bhk-intercity-relocation.webp", basePrice: 19999, unit: "move", details: ["3 BHK inventory", "Move supervisor", "Transit protection"] },
  { id: "4bhk-intercity-relocation", name: "4 BHK Intercity Relocation", category: "intercity", image: "/packers-movers-4bhk-intercity-relocation.webp", basePrice: 27999, unit: "move", details: ["4 BHK inventory", "Dedicated team", "Premium packing"] },
  { id: "villa-intercity-relocation", name: "Villa Intercity Relocation", category: "intercity", image: "/packers-movers-villa-intercity-relocation.webp", basePrice: 35999, unit: "move", details: ["Large inventory", "Dedicated planning", "Door-to-door"] },
  { id: "shared-truck-relocation", name: "Shared Truck Relocation", category: "intercity", image: "/packers-movers-shared-truck-relocation.webp", basePrice: 4999, unit: "move", details: ["Pay for used space", "Scheduled dispatch", "Sealed inventory"] },
  { id: "dedicated-truck-relocation", name: "Dedicated Truck Relocation", category: "intercity", image: "/packers-movers-dedicated-truck-relocation.webp", basePrice: 11999, unit: "move", details: ["Exclusive vehicle", "Direct movement", "Priority delivery"] },

  { id: "small-office-shifting", name: "Small Office Shifting", category: "office-commercial", image: "/packers-movers-small-office-shifting.webp", basePrice: 7999, unit: "move", details: ["Up to 10 workstations", "Systematic labelling", "Minimum downtime"], popular: true },
  { id: "medium-office-shifting", name: "Medium Office Shifting", category: "office-commercial", image: "/packers-movers-medium-office-shifting.webp", basePrice: 14999, unit: "move", details: ["Up to 25 workstations", "Asset checklist", "Move supervisor"] },
  { id: "large-corporate-office-shifting", name: "Large Corporate Office Shifting", category: "office-commercial", image: "/packers-movers-large-corporate-office-shifting.webp", basePrice: 29999, unit: "move", details: ["Custom workforce", "Phased relocation", "Project manager"] },
  { id: "shop-retail-store-shifting", name: "Shop / Retail Store Shifting", category: "office-commercial", image: "/packers-movers-shop-retail-store-shifting.webp", basePrice: 6999, unit: "move", details: ["Stock segregation", "Fixture handling", "Safe loading"] },
  { id: "showroom-shifting", name: "Showroom Shifting", category: "office-commercial", image: "/packers-movers-showroom-shifting.webp", basePrice: 11999, unit: "move", details: ["Display protection", "Fragile handling", "Placement support"] },
  { id: "restaurant-equipment-shifting", name: "Restaurant Equipment Shifting", category: "office-commercial", image: "/packers-movers-restaurant-equipment-shifting.webp", basePrice: 12999, unit: "move", details: ["Equipment protection", "Heavy handling", "Organised loading"] },
  { id: "warehouse-shifting", name: "Warehouse Shifting", category: "office-commercial", image: "/packers-movers-warehouse-shifting.webp", basePrice: 24999, unit: "move", details: ["Inventory planning", "Material handling", "Phased movement"] },
  { id: "factory-industrial-shifting", name: "Factory / Industrial Shifting", category: "office-commercial", image: "/packers-movers-factory-industrial-shifting.webp", basePrice: 39999, unit: "move", details: ["Heavy equipment", "Safety planning", "Special vehicle"] },
  { id: "it-equipment-server-shifting", name: "IT Equipment / Server Shifting", category: "office-commercial", image: "/packers-movers-it-equipment-server-shifting.webp", basePrice: 9999, unit: "move", details: ["Anti-static packing", "Asset labelling", "Special handling"] },
  { id: "employee-relocation-package", name: "Employee Relocation Package", category: "office-commercial", image: "/packers-movers-employee-relocation-package.webp", basePrice: 6999, unit: "move", details: ["Managed relocation", "Single coordinator", "Status updates"] },

  { id: "bicycle-transport", name: "Bicycle Transport", category: "vehicle", image: "/packers-movers-bicycle-transport.webp", basePrice: 1499, unit: "vehicle", details: ["Protective wrapping", "Secure loading", "Door-to-door"] },
  { id: "scooter-transport", name: "Scooter Transport", category: "vehicle", image: "/packers-movers-scooter-transport.webp", basePrice: 2299, unit: "vehicle", details: ["Fuel-safe handling", "Wheel locking", "Door-to-door"] },
  { id: "motorcycle-transport", name: "Motorcycle Transport", category: "vehicle", image: "/packers-movers-motorcycle-transport.webp", basePrice: 2499, unit: "vehicle", details: ["Secure cradle", "Transit protection", "Status updates"], popular: true },
  { id: "hatchback-car-transport", name: "Hatchback Car Transport", category: "vehicle", image: "/packers-movers-hatchback-car-transport.webp", basePrice: 8999, unit: "vehicle", details: ["Carrier transport", "Condition record", "Door-to-door"] },
  { id: "sedan-car-transport", name: "Sedan Car Transport", category: "vehicle", image: "/packers-movers-sedan-car-transport.webp", basePrice: 9999, unit: "vehicle", details: ["Carrier transport", "Wheel securing", "Tracking updates"] },
  { id: "suv-car-transport", name: "SUV Car Transport", category: "vehicle", image: "/packers-movers-suv-car-transport.webp", basePrice: 11999, unit: "vehicle", details: ["SUV carrier slot", "Condition record", "Tracking updates"] },
  { id: "luxury-car-transport", name: "Luxury Car Transport", category: "vehicle", image: "/packers-movers-luxury-car-transport.webp", basePrice: 17999, unit: "vehicle", details: ["Premium enclosed care", "Dedicated handling", "Priority updates"] },

  { id: "furniture-shifting", name: "Furniture Shifting", category: "packing-labour", image: "/packers-movers-furniture-shifting.webp", basePrice: 2499, unit: "move", details: ["Protective wrapping", "Safe handling", "Placement support"] },
  { id: "home-appliance-shifting", name: "Home Appliance Shifting", category: "packing-labour", image: "/packers-movers-home-appliance-shifting.webp", basePrice: 1999, unit: "move", details: ["Appliance protection", "Upright transport", "Careful placement"] },
  { id: "refrigerator-shifting", name: "Refrigerator Shifting", category: "packing-labour", image: "/packers-movers-refrigerator-shifting.webp", basePrice: 1499, unit: "unit", details: ["Upright handling", "Corner protection", "Safe loading"] },
  { id: "washing-machine-shifting", name: "Washing Machine Shifting", category: "packing-labour", image: "/packers-movers-washing-machine-shifting.webp", basePrice: 1299, unit: "unit", details: ["Drum protection", "Hose management", "Safe loading"] },
  { id: "television-shifting", name: "Television Shifting", category: "packing-labour", image: "/packers-movers-television-shifting.webp", basePrice: 999, unit: "unit", details: ["Screen protection", "Padded packing", "Upright handling"] },
  { id: "sofa-bed-shifting", name: "Sofa / Bed Shifting", category: "packing-labour", image: "/packers-movers-sofa-bed-shifting.webp", basePrice: 1799, unit: "move", details: ["Fabric protection", "Dismantling support", "Safe placement"] },
  { id: "fragile-goods-shifting", name: "Fragile Goods Shifting", category: "packing-labour", image: "/packers-movers-fragile-goods-shifting.webp", basePrice: 1999, unit: "move", details: ["Individual wrapping", "Fragile labelling", "Careful handling"] },
  { id: "artwork-antique-shifting", name: "Artwork / Antique Shifting", category: "packing-labour", image: "/packers-movers-artwork-antique-shifting.webp", basePrice: 2999, unit: "move", details: ["Custom protection", "White-glove handling", "Condition record"] },
  { id: "safe-heavy-item-shifting", name: "Safe / Heavy Item Shifting", category: "packing-labour", image: "/packers-movers-safe-heavy-item-shifting.webp", basePrice: 3499, unit: "move", details: ["Heavy-duty equipment", "Special crew", "Route assessment"] },
  { id: "piano-shifting", name: "Piano Shifting", category: "packing-labour", image: "/packers-movers-piano-shifting.webp", basePrice: 4999, unit: "move", details: ["Special padding", "Trained crew", "Level placement"] },

  { id: "packing-only-service", name: "Packing Only Service", category: "packing-labour", image: "/packers-movers-packing-only-service.webp", basePrice: 1999, unit: "job", details: ["Professional packing", "Quality material", "Labelled boxes"], popular: true },
  { id: "unpacking-arrangement", name: "Unpacking & Arrangement", category: "packing-labour", image: "/packers-movers-unpacking-arrangement.webp", basePrice: 1499, unit: "job", details: ["Safe unpacking", "Room-wise placement", "Debris collection"] },
  { id: "loading-unloading-service", name: "Loading / Unloading Service", category: "packing-labour", image: "/packers-movers-loading-unloading-service.webp", basePrice: 1999, unit: "job", details: ["Trained crew", "Handling equipment", "Stacking support"] },
  { id: "moving-labour-service", name: "Moving Labour Service", category: "packing-labour", image: "/packers-movers-moving-labour-service.webp", basePrice: 999, unit: "person / day", details: ["Verified mover", "8-hour shift", "Safety gear"] },
  { id: "furniture-dismantling-assembly", name: "Furniture Dismantling & Assembly", category: "packing-labour", image: "/packers-movers-furniture-dismantling-assembly.webp", basePrice: 1499, unit: "job", details: ["Professional tools", "Part labelling", "Reassembly"] },
  { id: "premium-fragile-packing", name: "Premium Fragile Packing", category: "packing-labour", image: "/packers-movers-premium-fragile-packing.webp", basePrice: 2499, unit: "job", details: ["Multi-layer packing", "Premium material", "Fragile marking"] },
  { id: "goods-storage-service", name: "Goods Storage Service", category: "storage", image: "/packers-movers-goods-storage-service.webp", basePrice: 2999, unit: "month", details: ["Secure storage", "Inventory record", "Flexible duration"] },
  { id: "moving-boxes-packing-material", name: "Moving Boxes & Packing Material", category: "storage", image: "/packers-movers-moving-boxes-packing-material.webp", basePrice: 499, unit: "kit", details: ["Moving boxes", "Tape & wrap", "Doorstep delivery"] },
] as const;

export type InventoryTier = "light" | "standard" | "heavy";
export type PackingTier = "basic" | "standard" | "premium";
export type AccessType = "lift" | "ground" | "stairs-1" | "stairs-2" | "stairs-3" | "stairs-4" | "stairs-4plus";

export type MovingEstimateInput = {
  serviceId: string;
  distanceKm: number;
  inventoryTier: InventoryTier;
  packingTier: PackingTier;
  accessType: AccessType;
};

const INVENTORY_MULTIPLIER: Record<InventoryTier, number> = { light: 0.9, standard: 1, heavy: 1.28 };
const PACKING_MULTIPLIER: Record<PackingTier, number> = { basic: 0, standard: 0.12, premium: 0.24 };
const FLOOR_CHARGE: Record<AccessType, number> = { lift: 0, ground: 0, "stairs-1": 350, "stairs-2": 700, "stairs-3": 1050, "stairs-4": 1400, "stairs-4plus": 1400 };

const NON_TRANSPORT_SERVICES = new Set([
  "packing-only-service",
  "unpacking-arrangement",
  "loading-unloading-service",
  "moving-labour-service",
  "furniture-dismantling-assembly",
  "premium-fragile-packing",
  "goods-storage-service",
]);

const EXTRA_KM_RATES: Readonly<Record<string, number>> = {
  "few-items-shifting": 24,
  "pg-hostel-room-shifting": 24,
  "1rk-home-shifting": 26,
  "1bhk-home-shifting": 32,
  "2bhk-home-shifting": 42,
  "3bhk-home-shifting": 55,
  "4bhk-home-shifting": 68,
  "villa-independent-house-shifting": 78,
  "same-building-society-shifting": 0,
  "1rk-intercity-relocation": 22,
  "1bhk-intercity-relocation": 26,
  "2bhk-intercity-relocation": 32,
  "3bhk-intercity-relocation": 40,
  "4bhk-intercity-relocation": 48,
  "villa-intercity-relocation": 58,
  "shared-truck-relocation": 22,
  "dedicated-truck-relocation": 38,
  "small-office-shifting": 38,
  "medium-office-shifting": 48,
  "large-corporate-office-shifting": 65,
  "shop-retail-store-shifting": 34,
  "showroom-shifting": 42,
  "restaurant-equipment-shifting": 48,
  "warehouse-shifting": 62,
  "factory-industrial-shifting": 85,
  "it-equipment-server-shifting": 38,
  "employee-relocation-package": 30,
  "bicycle-transport": 12,
  "scooter-transport": 16,
  "motorcycle-transport": 18,
  "hatchback-car-transport": 22,
  "sedan-car-transport": 24,
  "suv-car-transport": 28,
  "luxury-car-transport": 36,
  "furniture-shifting": 24,
  "home-appliance-shifting": 22,
  "refrigerator-shifting": 20,
  "washing-machine-shifting": 18,
  "television-shifting": 16,
  "sofa-bed-shifting": 22,
  "fragile-goods-shifting": 26,
  "artwork-antique-shifting": 32,
  "safe-heavy-item-shifting": 38,
  "piano-shifting": 45,
  "moving-boxes-packing-material": 16,
};

export function getPackersMoversDistanceRule(service: PackersMoversService) {
  const distanceApplicable = !NON_TRANSPORT_SERVICES.has(service.id) && service.id !== "same-building-society-shifting";
  return {
    distanceApplicable,
    includedKm: distanceApplicable ? 5 : 0,
    extraKmRate: distanceApplicable ? (EXTRA_KM_RATES[service.id] ?? 24) : 0,
  };
}

export function calculatePackersMoversEstimate(input: MovingEstimateInput) {
  const service = PACKERS_MOVERS_SERVICES.find((item) => item.id === input.serviceId);
  if (!service) return null;
  const distanceRule = getPackersMoversDistanceRule(service);
  const distanceKm = distanceRule.distanceApplicable
    ? Math.max(5, Math.min(3000, Math.round(Number(input.distanceKm) || 5)))
    : 0;
  const inventoryMultiplier = INVENTORY_MULTIPLIER[input.inventoryTier];
  const packingMultiplier = PACKING_MULTIPLIER[input.packingTier];
  const floorCharge = FLOOR_CHARGE[input.accessType];
  if (inventoryMultiplier === undefined || packingMultiplier === undefined || floorCharge === undefined) return null;

  const baseCharge = Math.round(service.basePrice * inventoryMultiplier);
  const distanceCharge = Math.max(0, distanceKm - distanceRule.includedKm) * distanceRule.extraKmRate;
  const packingCharge = Math.round(baseCharge * packingMultiplier);
  const total = Math.max(service.basePrice, baseCharge + distanceCharge + packingCharge + floorCharge);

  return {
    service,
    baseCharge,
    distanceCharge,
    packingCharge,
    floorCharge,
    total,
    distanceKm,
    ...distanceRule,
  };
}
