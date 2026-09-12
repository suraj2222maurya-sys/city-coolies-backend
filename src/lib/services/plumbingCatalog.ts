export type PlumbingCategory =
  | "Pipe Laying & Water Supply"
  | "Drainage & Waste Lines"
  | "Bathroom Fittings"
  | "Plumbing Points"
  | "Tank & Pump"
  | "Repair & Maintenance"
  | "Renovation & Replacement";

export type PlumbingService = {
  id: string;
  name: string;
  unit: "Rft" | "Each" | "Point" | "Job" | "Day";
  price: number | null;
  priceLabel: string;
  image: string;
  category: PlumbingCategory;
};

export const PLUMBING_SITE_VISIT_FEE = 500;

export const PLUMBING_SERVICES: readonly PlumbingService[] = [
  { id: "cpvc-pipe-laying-15-20mm", name: "CPVC Water Supply Pipe Laying – 15/20 mm", unit: "Rft", price: 180, priceLabel: "₹180", image: "/plumbing-cpvc-pipe-laying-15-20mm.webp", category: "Pipe Laying & Water Supply" },
  { id: "cpvc-pipe-laying-25mm", name: "CPVC Water Supply Pipe Laying – 25 mm", unit: "Rft", price: 200, priceLabel: "₹200", image: "/plumbing-cpvc-pipe-laying-25mm.webp", category: "Pipe Laying & Water Supply" },
  { id: "cpvc-pipe-laying-32mm", name: "CPVC Water Supply Pipe Laying – 32 mm", unit: "Rft", price: 250, priceLabel: "₹250", image: "/plumbing-cpvc-pipe-laying-32mm.webp", category: "Pipe Laying & Water Supply" },
  { id: "upvc-drainage-installation-40-50mm", name: "UPVC Drainage Pipe Installation – 40/50 mm", unit: "Rft", price: 150, priceLabel: "₹150", image: "/plumbing-upvc-drainage-installation-40-50mm.webp", category: "Drainage & Waste Lines" },
  { id: "upvc-drainage-installation-75mm", name: "UPVC Drainage Pipe Installation – 75 mm", unit: "Rft", price: 150, priceLabel: "₹150", image: "/plumbing-upvc-drainage-installation-75mm.webp", category: "Drainage & Waste Lines" },
  { id: "upvc-drainage-installation-110mm", name: "UPVC Drainage Pipe Installation – 110 mm", unit: "Rft", price: 200, priceLabel: "₹200", image: "/plumbing-upvc-drainage-installation-110mm.webp", category: "Drainage & Waste Lines" },
  { id: "soil-waste-pipe-installation", name: "Soil / Waste Pipe Installation", unit: "Rft", price: 250, priceLabel: "₹250", image: "/plumbing-soil-waste-pipe-installation.webp", category: "Drainage & Waste Lines" },
  { id: "floor-trap-installation", name: "Floor Trap Installation", unit: "Each", price: 700, priceLabel: "₹700", image: "/plumbing-floor-trap-installation.webp", category: "Bathroom Fittings" },
  { id: "nahani-floor-trap-connection", name: "Nahani / Floor Trap with Connection", unit: "Each", price: 1000, priceLabel: "₹1,000", image: "/plumbing-nahani-floor-trap-connection.webp", category: "Bathroom Fittings" },
  { id: "gully-trap-installation", name: "Gully Trap Installation", unit: "Each", price: 1800, priceLabel: "₹1,800", image: "/plumbing-gully-trap-installation.webp", category: "Drainage & Waste Lines" },
  { id: "wc-installation", name: "WC Installation", unit: "Each", price: 2500, priceLabel: "₹2,500", image: "/plumbing-wc-installation.webp", category: "Bathroom Fittings" },
  { id: "indian-wc-installation", name: "Indian WC Installation", unit: "Each", price: 2000, priceLabel: "₹2,000", image: "/plumbing-indian-wc-installation.webp", category: "Bathroom Fittings" },
  { id: "western-wc-installation", name: "Western WC Installation", unit: "Each", price: 2500, priceLabel: "₹2,500", image: "/plumbing-western-wc-installation.webp", category: "Bathroom Fittings" },
  { id: "wash-basin-installation", name: "Wash Basin Installation", unit: "Each", price: 1500, priceLabel: "₹1,500", image: "/plumbing-wash-basin-installation.webp", category: "Bathroom Fittings" },
  { id: "kitchen-sink-installation", name: "Kitchen Sink Installation", unit: "Each", price: 2000, priceLabel: "₹2,000", image: "/plumbing-kitchen-sink-installation.webp", category: "Bathroom Fittings" },
  { id: "health-faucet-installation", name: "Health Faucet Installation", unit: "Each", price: 1000, priceLabel: "₹1,000", image: "/plumbing-health-faucet-installation.webp", category: "Bathroom Fittings" },
  { id: "angle-cock-installation", name: "Angle Cock Installation", unit: "Each", price: 500, priceLabel: "₹500", image: "/plumbing-angle-cock-installation.webp", category: "Bathroom Fittings" },
  { id: "shower-installation", name: "Shower Installation", unit: "Each", price: 1000, priceLabel: "₹1,000", image: "/plumbing-shower-installation.webp", category: "Bathroom Fittings" },
  { id: "cp-mixer-installation", name: "CP Mixer Installation", unit: "Each", price: 1500, priceLabel: "₹1,500", image: "/plumbing-cp-mixer-installation.webp", category: "Bathroom Fittings" },
  { id: "concealed-plumbing-point", name: "Concealed Plumbing Point", unit: "Point", price: 1500, priceLabel: "₹1,500", image: "/plumbing-concealed-plumbing-point.webp", category: "Plumbing Points" },
  { id: "water-supply-point-wash-basin", name: "Water Supply Point for Wash Basin", unit: "Point", price: 1000, priceLabel: "₹1,000", image: "/plumbing-water-supply-point-wash-basin.webp", category: "Plumbing Points" },
  { id: "water-supply-point-wc", name: "Water Supply Point for WC", unit: "Point", price: 1000, priceLabel: "₹1,000", image: "/plumbing-water-supply-point-wc.webp", category: "Plumbing Points" },
  { id: "kitchen-sink-point", name: "Kitchen Sink Plumbing Point", unit: "Point", price: 1200, priceLabel: "₹1,200", image: "/plumbing-kitchen-sink-point.webp", category: "Plumbing Points" },
  { id: "overhead-water-tank-installation", name: "Overhead Water Tank Installation – Up to 1,000 L", unit: "Each", price: 8500, priceLabel: "₹8,500", image: "/plumbing-overhead-water-tank-installation.webp", category: "Tank & Pump" },
  { id: "water-tank-inlet-outlet-connection", name: "Water Tank Inlet / Outlet Connection", unit: "Each", price: 2500, priceLabel: "₹2,500", image: "/plumbing-water-tank-inlet-outlet-connection.webp", category: "Tank & Pump" },
  { id: "water-pump-connection", name: "Water Pump Connection Plumbing", unit: "Each", price: 3000, priceLabel: "₹3,000", image: "/plumbing-water-pump-connection.webp", category: "Tank & Pump" },
  { id: "underground-water-line-installation", name: "Underground Water Line Installation", unit: "Rft", price: 300, priceLabel: "₹300", image: "/plumbing-underground-water-line-installation.webp", category: "Pipe Laying & Water Supply" },
  { id: "rainwater-pipe-installation", name: "Rainwater Pipe Installation", unit: "Rft", price: 250, priceLabel: "₹250", image: "/plumbing-rainwater-pipe-installation.webp", category: "Drainage & Waste Lines" },
  { id: "sewer-line-connection", name: "Sewer Line Connection", unit: "Rft", price: 300, priceLabel: "₹300", image: "/plumbing-sewer-line-connection.webp", category: "Drainage & Waste Lines" },
  { id: "pipe-leakage-repair", name: "Pipe Leakage Repair", unit: "Job", price: 2000, priceLabel: "₹2,000", image: "/plumbing-pipe-leakage-repair.webp", category: "Repair & Maintenance" },
  { id: "blocked-drain-cleaning", name: "Blocked Drain Cleaning", unit: "Job", price: 2500, priceLabel: "₹2,500", image: "/plumbing-blocked-drain-cleaning.webp", category: "Repair & Maintenance" },
  { id: "existing-pipe-dismantling", name: "Existing Pipe Dismantling", unit: "Rft", price: 150, priceLabel: "₹150", image: "/plumbing-existing-pipe-dismantling.webp", category: "Renovation & Replacement" },
  { id: "pressure-testing", name: "Plumbing Testing / Pressure Test", unit: "Job", price: 3000, priceLabel: "₹3,000", image: "/plumbing-pressure-testing.webp", category: "Repair & Maintenance" },
  { id: "professional-plumber-labour", name: "Professional Plumber Labour", unit: "Day", price: 1500, priceLabel: "₹1,500", image: "/plumbing-professional-plumber-labour.webp", category: "Repair & Maintenance" },
  { id: "tap-faucet-replacement", name: "Tap / Faucet Installation & Replacement", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-tap-faucet-replacement.webp", category: "Repair & Maintenance" },
  { id: "flush-tank-cistern-repair", name: "Flush Tank / Cistern Installation & Repair", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-flush-tank-cistern-repair.webp", category: "Repair & Maintenance" },
  { id: "concealed-cistern-installation", name: "Concealed Cistern Installation", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-concealed-cistern-installation.webp", category: "Bathroom Fittings" },
  { id: "geyser-inlet-outlet-connection", name: "Geyser Inlet & Outlet Plumbing Connection", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-geyser-inlet-outlet-connection.webp", category: "Bathroom Fittings" },
  { id: "washing-machine-connection", name: "Washing Machine Water Inlet & Drain Connection", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-washing-machine-connection.webp", category: "Plumbing Points" },
  { id: "dishwasher-connection", name: "Dishwasher Water Inlet & Drain Connection", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-dishwasher-connection.webp", category: "Plumbing Points" },
  { id: "ro-water-purifier-connection", name: "RO / Water Purifier Plumbing Connection", unit: "Each", price: null, priceLabel: "Final price based on work", image: "/plumbing-ro-water-purifier-connection.webp", category: "Plumbing Points" },
  { id: "bathroom-renovation", name: "Bathroom Plumbing Renovation", unit: "Job", price: null, priceLabel: "Site inspection / Final quotation", image: "/plumbing-bathroom-renovation.webp", category: "Renovation & Replacement" },
  { id: "kitchen-renovation", name: "Kitchen Plumbing Renovation", unit: "Job", price: null, priceLabel: "Site inspection / Final quotation", image: "/plumbing-kitchen-renovation.webp", category: "Renovation & Replacement" },
  { id: "water-supply-pipe-replacement-rerouting", name: "Water Supply Pipe Replacement / Rerouting", unit: "Job", price: null, priceLabel: "Site inspection / Final quotation", image: "/plumbing-water-supply-pipe-replacement-rerouting.webp", category: "Renovation & Replacement" },
  { id: "drainage-pipe-replacement-rerouting", name: "Drainage Pipe Replacement / Rerouting", unit: "Job", price: null, priceLabel: "Site inspection / Final quotation", image: "/plumbing-drainage-pipe-replacement-rerouting.webp", category: "Renovation & Replacement" },
  { id: "sump-to-overhead-tank-line", name: "Sump to Overhead Tank Plumbing Line", unit: "Job", price: null, priceLabel: "Site inspection / Final quotation", image: "/plumbing-sump-to-overhead-tank-line.webp", category: "Tank & Pump" },
] as const;

type SubmittedItem = {
  id?: unknown;
  quantity?: unknown;
};

export type CalculatedPlumbingService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CalculatedPlumbingPlan = {
  services: CalculatedPlumbingService[];
  total: number;
  advanceAmount: number;
};

export function calculatePlumbingPlan(input: unknown): CalculatedPlumbingPlan | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const serviceMap = new Map(PLUMBING_SERVICES.map((service) => [service.id, service]));
  const quantities = new Map<string, number>();

  for (const item of input as SubmittedItem[]) {
    if (typeof item?.id !== "string") return null;
    const service = serviceMap.get(item.id);
    if (!service) return null;
    if (service.price === null) return null;

    const quantity = Number(item.quantity);
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 9999) return null;
    if (service.price === null && quantity !== 1) return null;

    quantities.set(service.id, (quantities.get(service.id) ?? 0) + quantity);
  }

  const services = Array.from(quantities.entries()).map(([id, quantity]) => {
    const service = serviceMap.get(id)!;
    const unitPrice = service.price ?? 0;
    return {
      id,
      name: service.name,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });

  const total = services.reduce((sum, service) => sum + service.lineTotal, 0);
  return { services, total, advanceAmount: Math.round(total * 0.5) };
}

export function calculatePlumbingSiteVisit(input: unknown): CalculatedPlumbingPlan | null {
  if (!Array.isArray(input) || input.length !== 1) return null;

  const item = input[0] as SubmittedItem;
  if (typeof item?.id !== "string") return null;

  const service = PLUMBING_SERVICES.find((candidate) => candidate.id === item.id);
  if (!service || service.price !== null) return null;

  const quantity = Number(item.quantity);
  if (quantity !== 1) return null;

  return {
    services: [
      {
        id: service.id,
        name: `${service.name} - Site Visit / Survey`,
        quantity: 1,
        unitPrice: PLUMBING_SITE_VISIT_FEE,
        lineTotal: PLUMBING_SITE_VISIT_FEE,
      },
    ],
    total: PLUMBING_SITE_VISIT_FEE,
    advanceAmount: PLUMBING_SITE_VISIT_FEE,
  };
}
