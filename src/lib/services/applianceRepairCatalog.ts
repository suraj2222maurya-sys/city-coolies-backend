export type ApplianceCategory =
  | "all"
  | "general"
  | "ac"
  | "refrigerator"
  | "washing-machine"
  | "microwave"
  | "water-purifier"
  | "geyser"
  | "kitchen"
  | "television"
  | "commercial";

export type ApplianceService = {
  id: string;
  name: string;
  category: Exclude<ApplianceCategory, "all">;
  unit: "Visit" | "Unit" | "Service";
  price: number;
  image: string;
  popular?: boolean;
};

export const APPLIANCE_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "general", label: "General Services" },
  { id: "ac", label: "Air Conditioner" },
  { id: "refrigerator", label: "Refrigerator" },
  { id: "washing-machine", label: "Washing Machine" },
  { id: "microwave", label: "Microwave" },
  { id: "water-purifier", label: "Water Purifier" },
  { id: "geyser", label: "Geyser" },
  { id: "kitchen", label: "Kitchen Appliances" },
  { id: "television", label: "Television" },
  { id: "commercial", label: "Commercial" },
] as const;

export const APPLIANCE_SERVICES: readonly ApplianceService[] = [
  { id: "appliance-inspection-diagnosis", name: "Inspection / Diagnosis", category: "general", unit: "Visit", price: 500, image: "/appliance-inspection-diagnosis.webp", popular: true },
  { id: "appliance-minor-repair-labour", name: "Minor Repair Labour", category: "general", unit: "Service", price: 1000, image: "/appliance-minor-repair-labour.webp" },
  { id: "appliance-major-repair-labour", name: "Major Repair Labour", category: "general", unit: "Service", price: 2500, image: "/appliance-major-repair-labour.webp" },
  { id: "appliance-installation-reinstallation", name: "Installation / Reinstallation", category: "general", unit: "Service", price: 2800, image: "/appliance-installation-reinstallation.webp" },

  { id: "ac-inspection-visit", name: "AC Inspection / Visit Charge", category: "ac", unit: "Visit", price: 500, image: "/ac-inspection-visit.webp" },
  { id: "ac-split-general-service", name: "Split AC General Service", category: "ac", unit: "Unit", price: 1200, image: "/ac-split-general-service.webp", popular: true },
  { id: "ac-window-service", name: "Window AC Service", category: "ac", unit: "Unit", price: 1000, image: "/ac-window-service.webp" },
  { id: "ac-deep-cleaning", name: "Deep AC Cleaning", category: "ac", unit: "Unit", price: 1800, image: "/ac-deep-cleaning.webp", popular: true },
  { id: "ac-installation", name: "AC Installation", category: "ac", unit: "Unit", price: 2800, image: "/ac-installation.webp", popular: true },
  { id: "ac-uninstallation", name: "AC Uninstallation", category: "ac", unit: "Unit", price: 1000, image: "/ac-uninstallation.webp" },
  { id: "ac-gas-refilling", name: "AC Gas Refilling (1–1.5 Ton)", category: "ac", unit: "Unit", price: 3800, image: "/ac-gas-refilling.webp" },
  { id: "ac-pcb-repair", name: "AC PCB Repair", category: "ac", unit: "Unit", price: 3500, image: "/ac-pcb-repair.webp" },
  { id: "ac-water-leakage-repair", name: "AC Water Leakage Repair", category: "ac", unit: "Unit", price: 1800, image: "/ac-water-leakage-repair.webp" },

  { id: "fridge-inspection-visit", name: "Fridge Inspection / Visit Charge", category: "refrigerator", unit: "Visit", price: 500, image: "/fridge-inspection-visit.webp" },
  { id: "fridge-single-door-service", name: "Single Door Fridge Service", category: "refrigerator", unit: "Unit", price: 100, image: "/fridge-single-door-service.webp" },
  { id: "fridge-double-door-service", name: "Double Door Fridge Service", category: "refrigerator", unit: "Unit", price: 1500, image: "/fridge-double-door-service.webp", popular: true },
  { id: "fridge-side-by-side-service", name: "Side-by-Side Fridge Service", category: "refrigerator", unit: "Unit", price: 2000, image: "/fridge-side-by-side-service.webp" },
  { id: "fridge-gas-filling", name: "Refrigerator Gas Filling", category: "refrigerator", unit: "Unit", price: 3500, image: "/fridge-gas-filling.webp" },
  { id: "fridge-compressor-replacement-labour", name: "Compressor Replacement (Labour)", category: "refrigerator", unit: "Unit", price: 2000, image: "/fridge-compressor-replacement-labour.webp" },
  { id: "fridge-cooling-issue-repair", name: "Cooling Issue Repair", category: "refrigerator", unit: "Unit", price: 1800, image: "/fridge-cooling-issue-repair.webp" },
  { id: "fridge-door-gasket-replacement-labour", name: "Door Gasket Replacement (Labour)", category: "refrigerator", unit: "Unit", price: 1000, image: "/fridge-door-gasket-replacement-labour.webp" },

  { id: "washing-machine-inspection-visit", name: "Washing Machine Inspection", category: "washing-machine", unit: "Visit", price: 500, image: "/washing-machine-inspection-visit.webp" },
  { id: "washing-machine-semi-automatic-service", name: "Semi-Automatic Service", category: "washing-machine", unit: "Unit", price: 1000, image: "/washing-machine-semi-automatic-service.webp" },
  { id: "washing-machine-top-load-service", name: "Top Load Washing Machine Service", category: "washing-machine", unit: "Unit", price: 1500, image: "/washing-machine-top-load-service.webp" },
  { id: "washing-machine-front-load-service", name: "Front Load Washing Machine Service", category: "washing-machine", unit: "Unit", price: 1800, image: "/washing-machine-front-load-service.webp", popular: true },
  { id: "washing-machine-drum-cleaning", name: "Drum Cleaning", category: "washing-machine", unit: "Unit", price: 1300, image: "/washing-machine-drum-cleaning.webp" },
  { id: "washing-machine-installation", name: "Washing Machine Installation", category: "washing-machine", unit: "Unit", price: 1000, image: "/washing-machine-installation.webp" },
  { id: "washing-machine-uninstallation", name: "Washing Machine Uninstallation", category: "washing-machine", unit: "Unit", price: 1000, image: "/washing-machine-uninstallation.webp" },
  { id: "washing-machine-water-leakage-repair", name: "Washing Machine Water Leakage Repair", category: "washing-machine", unit: "Unit", price: 1500, image: "/washing-machine-water-leakage-repair.webp" },
  { id: "washing-machine-motor-pcb-repair-labour", name: "Motor / PCB Repair (Labour)", category: "washing-machine", unit: "Unit", price: 3000, image: "/washing-machine-motor-pcb-repair-labour.webp" },

  { id: "microwave-inspection", name: "Microwave Inspection", category: "microwave", unit: "Visit", price: 500, image: "/microwave-inspection.webp" },
  { id: "microwave-general-service", name: "Microwave General Service", category: "microwave", unit: "Unit", price: 1000, image: "/microwave-general-service.webp", popular: true },
  { id: "microwave-magnetron-replacement-labour", name: "Magnetron Replacement (Labour)", category: "microwave", unit: "Unit", price: 1500, image: "/microwave-magnetron-replacement-labour.webp" },
  { id: "microwave-control-panel-repair", name: "Control Panel Repair", category: "microwave", unit: "Unit", price: 2000, image: "/microwave-control-panel-repair.webp" },
  { id: "microwave-door-lock-switch-repair", name: "Door Lock / Switch Repair", category: "microwave", unit: "Unit", price: 1200, image: "/microwave-door-lock-switch-repair.webp" },

  { id: "ro-inspection", name: "RO Inspection", category: "water-purifier", unit: "Visit", price: 400, image: "/ro-inspection.webp" },
  { id: "ro-general-service", name: "RO General Service", category: "water-purifier", unit: "Unit", price: 750, image: "/ro-general-service.webp", popular: true },
  { id: "ro-filter-replacement-labour", name: "Filter Replacement (Labour)", category: "water-purifier", unit: "Unit", price: 800, image: "/ro-filter-replacement-labour.webp" },
  { id: "ro-installation", name: "RO Installation", category: "water-purifier", unit: "Unit", price: 1500, image: "/ro-installation.webp" },
  { id: "ro-uninstallation", name: "RO Uninstallation", category: "water-purifier", unit: "Unit", price: 1200, image: "/ro-uninstallation.webp" },
  { id: "ro-commercial-service", name: "Commercial RO Service", category: "water-purifier", unit: "Unit", price: 3000, image: "/ro-commercial-service.webp" },

  { id: "geyser-general-service", name: "Geyser General Service", category: "geyser", unit: "Unit", price: 1000, image: "/geyser-general-service.webp" },
  { id: "geyser-installation", name: "Geyser Installation", category: "geyser", unit: "Unit", price: 1500, image: "/geyser-installation.webp" },
  { id: "geyser-heating-element-replacement", name: "Heating Element Replacement", category: "geyser", unit: "Unit", price: 1800, image: "/geyser-heating-element-replacement.webp" },
  { id: "geyser-thermostat-replacement", name: "Thermostat Replacement", category: "geyser", unit: "Unit", price: 1300, image: "/geyser-thermostat-replacement.webp" },
  { id: "geyser-water-leakage-repair", name: "Geyser Water Leakage Repair", category: "geyser", unit: "Unit", price: 1500, image: "/geyser-water-leakage-repair.webp" },

  { id: "kitchen-chimney-cleaning", name: "Kitchen Chimney Cleaning", category: "kitchen", unit: "Unit", price: 1500, image: "/kitchen-chimney-cleaning.webp" },
  { id: "kitchen-chimney-repair", name: "Chimney Repair", category: "kitchen", unit: "Unit", price: 2500, image: "/kitchen-chimney-repair.webp" },
  { id: "kitchen-hob-cooktop-service", name: "Hob / Cooktop Service", category: "kitchen", unit: "Unit", price: 1300, image: "/kitchen-hob-cooktop-service.webp" },
  { id: "kitchen-gas-stove-service", name: "Gas Stove Service", category: "kitchen", unit: "Unit", price: 1000, image: "/kitchen-gas-stove-service.webp" },
  { id: "kitchen-exhaust-fan-repair", name: "Exhaust Fan Repair", category: "kitchen", unit: "Unit", price: 900, image: "/kitchen-exhaust-fan-repair.webp" },

  { id: "tv-inspection", name: "TV Inspection", category: "television", unit: "Visit", price: 500, image: "/tv-inspection.webp" },
  { id: "tv-led-repair", name: "LED TV Repair", category: "television", unit: "Unit", price: 2500, image: "/tv-led-repair.webp", popular: true },
  { id: "tv-smart-software-update", name: "Smart TV Software Update", category: "television", unit: "Unit", price: 1500, image: "/tv-smart-software-update.webp" },
  { id: "tv-wall-mount-installation", name: "Wall Mount Installation", category: "television", unit: "Unit", price: 1200, image: "/tv-wall-mount-installation.webp" },
  { id: "tv-display-backlight-repair-labour", name: "Display / Backlight Repair (Labour)", category: "television", unit: "Unit", price: 3000, image: "/tv-display-backlight-repair-labour.webp" },

  { id: "commercial-deep-freezer-service", name: "Deep Freezer Service", category: "commercial", unit: "Unit", price: 1800, image: "/commercial-deep-freezer-service.webp" },
  { id: "commercial-water-cooler-service", name: "Water Cooler Service", category: "commercial", unit: "Unit", price: 1500, image: "/commercial-water-cooler-service.webp" },
  { id: "commercial-refrigerator-service", name: "Commercial Refrigerator Service", category: "commercial", unit: "Unit", price: 3500, image: "/commercial-refrigerator-service.webp", popular: true },
  { id: "commercial-ice-machine-service", name: "Ice Machine Service", category: "commercial", unit: "Unit", price: 4500, image: "/commercial-ice-machine-service.webp" },
  { id: "commercial-display-chiller-repair", name: "Display Chiller Repair", category: "commercial", unit: "Unit", price: 3000, image: "/commercial-display-chiller-repair.webp" },
] as const;

type IncomingService = {
  id?: unknown;
  quantity?: unknown;
};

export function calculateApplianceRepairPlan(input: unknown) {
  if (!Array.isArray(input)) return null;

  const catalog = new Map(APPLIANCE_SERVICES.map((service) => [service.id, service]));
  const quantities = new Map<string, number>();

  for (const raw of input as IncomingService[]) {
    const id = typeof raw?.id === "string" ? raw.id.trim() : "";
    const quantity = Number(raw?.quantity);
    if (!catalog.has(id) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 25) {
      return null;
    }
    quantities.set(id, (quantities.get(id) ?? 0) + quantity);
  }

  if (quantities.size === 0) return null;

  const services = [...quantities.entries()].map(([id, quantity]) => {
    const service = catalog.get(id)!;
    return {
      id: service.id,
      name: service.name,
      quantity,
      unitPrice: service.price,
      lineTotal: service.price * quantity,
    };
  });

  const total = services.reduce((sum, service) => sum + service.lineTotal, 0);
  if (!Number.isSafeInteger(total) || total <= 0) return null;

  return {
    services,
    total,
    advanceAmount: Math.round(total * 0.5),
  };
}
