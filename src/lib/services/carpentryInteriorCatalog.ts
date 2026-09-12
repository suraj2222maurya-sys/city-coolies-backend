export type CarpentryInteriorCategory =
  | "all"
  | "visit"
  | "repairs"
  | "installation"
  | "custom-furniture"
  | "storage-kitchen"
  | "decorative-woodwork"
  | "interior-planning"
  | "home-interiors"
  | "commercial-interiors"
  | "finishes-execution";

export type CarpentryInteriorService = {
  id: string;
  name: string;
  category: Exclude<CarpentryInteriorCategory, "all">;
  image: string;
  popular?: boolean;
};

export const CARPENTRY_INTERIOR_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "visit", label: "Survey & Consultation" },
  { id: "repairs", label: "Repairs & Fittings" },
  { id: "installation", label: "Installation Work" },
  { id: "custom-furniture", label: "Custom Furniture" },
  { id: "storage-kitchen", label: "Storage & Kitchen" },
  { id: "decorative-woodwork", label: "Decorative Woodwork" },
  { id: "interior-planning", label: "Interior Planning" },
  { id: "home-interiors", label: "Home Interiors" },
  { id: "commercial-interiors", label: "Commercial Interiors" },
  { id: "finishes-execution", label: "Finishes & Execution" },
] as const;

export const CARPENTRY_INTERIOR_SERVICES: readonly CarpentryInteriorService[] = [
  { id: "carpentry-inspection-site-visit", name: "Carpentry Inspection / Site Visit", category: "visit", image: "/carpentry-inspection-site-visit.webp", popular: true },
  { id: "professional-carpenter-labour", name: "Professional Carpenter Labour", category: "visit", image: "/professional-carpenter-labour.webp", popular: true },
  { id: "furniture-assembly-disassembly", name: "Furniture Assembly / Disassembly", category: "repairs", image: "/furniture-assembly-disassembly.webp" },
  { id: "door-repair-hardware-alignment", name: "Door Repair, Fittings & Alignment", category: "repairs", image: "/door-repair-hardware-alignment.webp", popular: true },
  { id: "new-door-frame-installation", name: "New Door & Frame Installation", category: "installation", image: "/new-door-frame-installation.webp" },
  { id: "wooden-window-repair-hardware", name: "Wooden Window Repair & Fittings", category: "repairs", image: "/wooden-window-repair-hardware.webp" },
  { id: "wooden-window-installation", name: "Wooden Window Installation", category: "installation", image: "/wooden-window-installation.webp" },
  { id: "cupboard-wardrobe-repair", name: "Cupboard / Wardrobe Repair", category: "repairs", image: "/cupboard-wardrobe-repair.webp", popular: true },
  { id: "sliding-wardrobe-door-repair", name: "Sliding Wardrobe Door Repair", category: "repairs", image: "/sliding-wardrobe-door-repair.webp" },
  { id: "drawer-channel-cabinet-fittings", name: "Drawer Channel & Cabinet Fittings", category: "repairs", image: "/drawer-channel-cabinet-fittings.webp" },
  { id: "chair-sofa-frame-repair", name: "Chair / Sofa Frame Repair", category: "repairs", image: "/chair-sofa-frame-repair.webp" },
  { id: "table-bed-wooden-repair", name: "Table / Bed Wooden Repair", category: "repairs", image: "/table-bed-wooden-repair.webp" },
  { id: "shelf-loft-installation", name: "Shelf & Loft Installation", category: "installation", image: "/shelf-loft-installation.webp" },
  { id: "curtain-rod-blinds-installation", name: "Curtain Rod & Blinds Installation", category: "installation", image: "/curtain-rod-blinds-installation.webp" },
  { id: "mirror-picture-frame-installation", name: "Mirror / Picture Frame Installation", category: "installation", image: "/mirror-picture-frame-installation.webp" },
  { id: "minor-wood-cutting-modification", name: "Minor Wood Cutting / Modification", category: "repairs", image: "/minor-wood-cutting-modification.webp" },
  { id: "wood-polish-varnish-refinishing", name: "Wood Polish / Varnish / Refinishing", category: "finishes-execution", image: "/wood-polish-varnish-refinishing.webp" },
  { id: "damaged-wood-restoration", name: "Damaged Wood Restoration", category: "finishes-execution", image: "/damaged-wood-restoration.webp" },
  { id: "custom-wardrobe-design-installation", name: "Custom Wardrobe Design & Installation", category: "storage-kitchen", image: "/custom-wardrobe-design-installation.webp", popular: true },
  { id: "sliding-walk-in-wardrobe", name: "Sliding / Walk-in Wardrobe", category: "storage-kitchen", image: "/sliding-walk-in-wardrobe.webp" },
  { id: "modular-kitchen-cabinet-work", name: "Modular Kitchen Cabinet Work", category: "storage-kitchen", image: "/modular-kitchen-cabinet-work.webp", popular: true },
  { id: "custom-loft-storage-cabinet", name: "Custom Loft Storage Cabinet", category: "storage-kitchen", image: "/custom-loft-storage-cabinet.webp" },
  { id: "custom-tv-unit", name: "Custom TV Unit", category: "custom-furniture", image: "/custom-tv-unit.webp" },
  { id: "custom-shoe-rack", name: "Custom Shoe Rack", category: "custom-furniture", image: "/custom-shoe-rack.webp" },
  { id: "custom-study-work-desk", name: "Custom Study / Work Desk", category: "custom-furniture", image: "/custom-study-work-desk.webp" },
  { id: "custom-storage-bed", name: "Custom Storage Bed", category: "custom-furniture", image: "/custom-storage-bed.webp", popular: true },
  { id: "custom-dining-table", name: "Custom Dining Table", category: "custom-furniture", image: "/custom-dining-table.webp" },
  { id: "custom-crockery-bar-unit", name: "Custom Crockery / Bar Unit", category: "custom-furniture", image: "/custom-crockery-bar-unit.webp" },
  { id: "custom-pooja-bookshelf-unit", name: "Custom Pooja / Bookshelf Unit", category: "custom-furniture", image: "/custom-pooja-bookshelf-unit.webp" },
  { id: "custom-bathroom-vanity", name: "Custom Bathroom Vanity", category: "custom-furniture", image: "/custom-bathroom-vanity.webp" },
  { id: "custom-office-workstation", name: "Custom Office Workstation", category: "commercial-interiors", image: "/custom-office-workstation.webp" },
  { id: "reception-shop-display-counter", name: "Reception / Shop Display Counter", category: "commercial-interiors", image: "/reception-shop-display-counter.webp" },
  { id: "wooden-partition-work", name: "Wooden Partition Work", category: "decorative-woodwork", image: "/wooden-partition-work.webp" },
  { id: "decorative-wooden-wall-panelling", name: "Decorative Wooden Wall Panelling", category: "decorative-woodwork", image: "/decorative-wooden-wall-panelling.webp" },
  { id: "decorative-wooden-ceiling", name: "Decorative Wooden Ceiling", category: "decorative-woodwork", image: "/decorative-wooden-ceiling.webp" },
  { id: "custom-furniture-modification", name: "Custom Furniture Modification", category: "custom-furniture", image: "/custom-furniture-modification.webp" },
  { id: "complete-home-carpentry-work", name: "Complete Home Carpentry Work", category: "storage-kitchen", image: "/complete-home-carpentry-work.webp", popular: true },

  { id: "interior-design-consultation-site-measurement", name: "Interior Design Consultation & Site Measurement", category: "visit", image: "/interior-design-consultation-site-measurement.webp", popular: true },
  { id: "space-planning", name: "Space Planning", category: "interior-planning", image: "/space-planning.webp" },
  { id: "2d-interior-layout-design", name: "2D Interior Layout Design", category: "interior-planning", image: "/2d-interior-layout-design.webp" },
  { id: "3d-interior-visualization", name: "3D Interior Visualization", category: "interior-planning", image: "/3d-interior-visualization.webp", popular: true },
  { id: "full-home-new-home-interior", name: "Full Home / New Home Interior", category: "home-interiors", image: "/full-home-new-home-interior.webp", popular: true },
  { id: "villa-luxury-interior", name: "Villa / Luxury Interior", category: "home-interiors", image: "/villa-luxury-interior.webp" },
  { id: "living-room-interior", name: "Living Room Interior", category: "home-interiors", image: "/living-room-interior.webp" },
  { id: "bedroom-interior", name: "Bedroom Interior", category: "home-interiors", image: "/bedroom-interior.webp" },
  { id: "kids-room-interior", name: "Kids Room Interior", category: "home-interiors", image: "/kids-room-interior.webp" },
  { id: "guest-room-interior", name: "Guest Room Interior", category: "home-interiors", image: "/guest-room-interior.webp" },
  { id: "modular-kitchen-interior", name: "Modular Kitchen Interior", category: "home-interiors", image: "/modular-kitchen-interior.webp", popular: true },
  { id: "dining-room-interior", name: "Dining Room Interior", category: "home-interiors", image: "/dining-room-interior.webp" },
  { id: "pooja-room-interior", name: "Pooja Room Interior", category: "home-interiors", image: "/pooja-room-interior.webp" },
  { id: "home-office-interior", name: "Home Office Interior", category: "home-interiors", image: "/home-office-interior.webp" },
  { id: "balcony-interior", name: "Balcony Interior", category: "home-interiors", image: "/balcony-interior.webp" },
  { id: "bathroom-interior", name: "Bathroom Interior", category: "home-interiors", image: "/bathroom-interior.webp" },
  { id: "office-commercial-interior", name: "Office / Commercial Interior", category: "commercial-interiors", image: "/office-commercial-interior.webp", popular: true },
  { id: "shop-showroom-interior", name: "Shop / Showroom Interior", category: "commercial-interiors", image: "/shop-showroom-interior.webp" },
  { id: "restaurant-cafe-interior", name: "Restaurant / Cafe Interior", category: "commercial-interiors", image: "/restaurant-cafe-interior.webp" },
  { id: "salon-spa-interior", name: "Salon / Spa Interior", category: "commercial-interiors", image: "/salon-spa-interior.webp" },
  { id: "hotel-interior", name: "Hotel Interior", category: "commercial-interiors", image: "/hotel-interior.webp" },
  { id: "healthcare-clinic-interior", name: "Healthcare / Clinic Interior", category: "commercial-interiors", image: "/healthcare-clinic-interior.webp" },
  { id: "false-ceiling-design-execution", name: "False Ceiling Design & Execution", category: "finishes-execution", image: "/false-ceiling-design-execution.webp", popular: true },
  { id: "accent-wall-wall-panelling", name: "Accent Wall / Wall Panelling", category: "finishes-execution", image: "/accent-wall-wall-panelling.webp" },
  { id: "decorative-partition", name: "Decorative Partition", category: "finishes-execution", image: "/decorative-partition.webp" },
  { id: "wallpaper-texture-finish", name: "Wallpaper / Texture Finish", category: "finishes-execution", image: "/wallpaper-texture-finish.webp" },
  { id: "flooring-design-installation", name: "Flooring Design & Installation", category: "finishes-execution", image: "/flooring-design-installation.webp" },
  { id: "interior-lighting-electrical-layout", name: "Interior Lighting & Electrical Layout", category: "finishes-execution", image: "/interior-lighting-electrical-layout.webp" },
  { id: "custom-furniture-design", name: "Custom Furniture Design", category: "custom-furniture", image: "/custom-furniture-design.webp" },
  { id: "curtains-blinds-soft-furnishing", name: "Curtains / Blinds / Soft Furnishing", category: "finishes-execution", image: "/curtains-blinds-soft-furnishing.webp" },
  { id: "colour-material-consultation", name: "Colour & Material Consultation", category: "interior-planning", image: "/colour-material-consultation.webp" },
  { id: "home-decor-styling", name: "Home Decor Styling", category: "finishes-execution", image: "/home-decor-styling.webp" },
  { id: "complete-interior-renovation", name: "Complete Interior Renovation", category: "finishes-execution", image: "/complete-interior-renovation.webp", popular: true },
  { id: "turnkey-interior-execution-project-management", name: "Turnkey Interior Execution & Project Management", category: "finishes-execution", image: "/turnkey-interior-execution-project-management.webp", popular: true },
] as const;

export const CARPENTRY_INTERIOR_RATES: Readonly<Record<string, { label: string }>> = {
  "carpentry-inspection-site-visit": { label: "Starting ₹500 / visit" },
  "professional-carpenter-labour": { label: "₹1,500 / person / day" },
  "furniture-assembly-disassembly": { label: "Starting ₹499 / unit" },
  "door-repair-hardware-alignment": { label: "Starting ₹399 / door" },
  "new-door-frame-installation": { label: "Starting ₹2,500 / door" },
  "wooden-window-repair-hardware": { label: "Starting ₹399 / window" },
  "wooden-window-installation": { label: "Starting ₹1,200 / window" },
  "cupboard-wardrobe-repair": { label: "Starting ₹499 / unit" },
  "sliding-wardrobe-door-repair": { label: "Starting ₹599 / unit" },
  "drawer-channel-cabinet-fittings": { label: "Starting ₹249 / set" },
  "chair-sofa-frame-repair": { label: "Starting ₹499 / unit" },
  "table-bed-wooden-repair": { label: "Starting ₹699 / unit" },
  "shelf-loft-installation": { label: "Starting ₹299 / unit" },
  "curtain-rod-blinds-installation": { label: "Starting ₹299 / unit" },
  "mirror-picture-frame-installation": { label: "Starting ₹249 / unit" },
  "minor-wood-cutting-modification": { label: "Starting ₹499 / job" },
  "wood-polish-varnish-refinishing": { label: "Starting ₹80 / sq.ft" },
  "damaged-wood-restoration": { label: "Starting ₹150 / sq.ft" },
  "custom-wardrobe-design-installation": { label: "Starting ₹1,300 / sq.ft" },
  "sliding-walk-in-wardrobe": { label: "Starting ₹1,600 / sq.ft" },
  "modular-kitchen-cabinet-work": { label: "Starting ₹1,500 / sq.ft" },
  "custom-loft-storage-cabinet": { label: "Starting ₹1,200 / sq.ft" },
  "custom-tv-unit": { label: "Starting ₹1,300 / sq.ft" },
  "custom-shoe-rack": { label: "Starting ₹1,200 / sq.ft" },
  "custom-study-work-desk": { label: "Starting ₹1,200 / sq.ft" },
  "custom-storage-bed": { label: "Starting ₹18,000 / unit" },
  "custom-dining-table": { label: "Starting ₹15,000 / unit" },
  "custom-crockery-bar-unit": { label: "Starting ₹1,400 / sq.ft" },
  "custom-pooja-bookshelf-unit": { label: "Starting ₹1,300 / sq.ft" },
  "custom-bathroom-vanity": { label: "Starting ₹1,400 / sq.ft" },
  "custom-office-workstation": { label: "Starting ₹1,500 / sq.ft" },
  "reception-shop-display-counter": { label: "Starting ₹1,800 / running ft" },
  "wooden-partition-work": { label: "Starting ₹850 / sq.ft" },
  "decorative-wooden-wall-panelling": { label: "Starting ₹650 / sq.ft" },
  "decorative-wooden-ceiling": { label: "Starting ₹450 / sq.ft" },
  "custom-furniture-modification": { label: "Starting ₹800 / job" },
  "complete-home-carpentry-work": { label: "Starting ₹1,200 / sq.ft" },
  "interior-design-consultation-site-measurement": { label: "Starting ₹500 / visit" },
  "space-planning": { label: "Starting ₹15 / sq.ft" },
  "2d-interior-layout-design": { label: "Starting ₹12 / sq.ft" },
  "3d-interior-visualization": { label: "Starting ₹25 / sq.ft" },
  "full-home-new-home-interior": { label: "Starting ₹1,200 / sq.ft" },
  "villa-luxury-interior": { label: "Starting ₹1,800 / sq.ft" },
  "living-room-interior": { label: "Starting ₹1,500 / sq.ft" },
  "bedroom-interior": { label: "Starting ₹1,400 / sq.ft" },
  "kids-room-interior": { label: "Starting ₹1,500 / sq.ft" },
  "guest-room-interior": { label: "Starting ₹1,300 / sq.ft" },
  "modular-kitchen-interior": { label: "Starting ₹1,700 / sq.ft" },
  "dining-room-interior": { label: "Starting ₹1,400 / sq.ft" },
  "pooja-room-interior": { label: "Starting ₹1,500 / sq.ft" },
  "home-office-interior": { label: "Starting ₹1,400 / sq.ft" },
  "balcony-interior": { label: "Starting ₹900 / sq.ft" },
  "bathroom-interior": { label: "Starting ₹1,600 / sq.ft" },
  "office-commercial-interior": { label: "Starting ₹1,200 / sq.ft" },
  "shop-showroom-interior": { label: "Starting ₹1,400 / sq.ft" },
  "restaurant-cafe-interior": { label: "Starting ₹1,600 / sq.ft" },
  "salon-spa-interior": { label: "Starting ₹1,600 / sq.ft" },
  "hotel-interior": { label: "Starting ₹1,800 / sq.ft" },
  "healthcare-clinic-interior": { label: "Starting ₹1,400 / sq.ft" },
  "false-ceiling-design-execution": { label: "Starting ₹90 / sq.ft" },
  "accent-wall-wall-panelling": { label: "Starting ₹650 / sq.ft" },
  "decorative-partition": { label: "Starting ₹550 / sq.ft" },
  "wallpaper-texture-finish": { label: "Starting ₹45 / sq.ft" },
  "flooring-design-installation": { label: "Starting ₹120 / sq.ft" },
  "interior-lighting-electrical-layout": { label: "Starting ₹25 / sq.ft" },
  "custom-furniture-design": { label: "Starting ₹20 / sq.ft" },
  "curtains-blinds-soft-furnishing": { label: "Starting ₹300 / running ft" },
  "colour-material-consultation": { label: "Starting ₹500 / visit" },
  "home-decor-styling": { label: "Starting ₹25 / sq.ft" },
  "complete-interior-renovation": { label: "Starting ₹1,500 / sq.ft" },
  "turnkey-interior-execution-project-management": { label: "Starting ₹1,800 / sq.ft" },
};

export function getCarpentryInteriorRate(serviceId: string) {
  return CARPENTRY_INTERIOR_RATES[serviceId] ?? { label: "Starting rate after site survey" };
}

type IncomingService = { id?: unknown; quantity?: unknown; days?: unknown };

export const PROFESSIONAL_CARPENTER_LABOUR_ID = "professional-carpenter-labour";
export const PROFESSIONAL_CARPENTER_DAILY_RATE = 1500;

export function calculateCarpentryInteriorBooking(input: unknown) {
  if (!Array.isArray(input)) return null;

  const catalog = new Map(CARPENTRY_INTERIOR_SERVICES.map((service) => [service.id, service]));
  const seen = new Set<string>();
  const services: Array<{
    id: string;
    name: string;
    quantity: number;
    days?: number;
    unitPrice: number;
    lineTotal: number;
  }> = [];

  for (const raw of input as IncomingService[]) {
    const id = typeof raw?.id === "string" ? raw.id.trim() : "";
    const quantity = Number(raw?.quantity);
    const service = catalog.get(id);

    if (!service || seen.has(id) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 25) {
      return null;
    }
    seen.add(id);

    if (id === PROFESSIONAL_CARPENTER_LABOUR_ID) {
      const days = Number(raw?.days);
      if (!Number.isSafeInteger(days) || days < 1 || days > 30) return null;
      services.push({
        id,
        name: service.name,
        quantity,
        days,
        unitPrice: PROFESSIONAL_CARPENTER_DAILY_RATE,
        lineTotal: PROFESSIONAL_CARPENTER_DAILY_RATE * quantity * days,
      });
    } else {
      services.push({ id, name: service.name, quantity, unitPrice: 0, lineTotal: 0 });
    }
  }

  if (services.length === 0) return null;
  const labourTotal = services.reduce((sum, service) => sum + service.lineTotal, 0);
  const surveyFee = services.some((service) => service.id !== PROFESSIONAL_CARPENTER_LABOUR_ID) ? 500 : 0;
  const total = labourTotal + surveyFee;

  if (!Number.isSafeInteger(total) || total <= 0) return null;
  return { services, labourTotal, surveyFee, total, advanceAmount: total };
}

export function calculateCarpentryInteriorSurvey(input: unknown) {
  if (!Array.isArray(input)) return null;
  const catalog = new Map(CARPENTRY_INTERIOR_SERVICES.map((service) => [service.id, service]));
  const quantities = new Map<string, number>();

  for (const raw of input as IncomingService[]) {
    const id = typeof raw?.id === "string" ? raw.id.trim() : "";
    const quantity = Number(raw?.quantity);
    if (!catalog.has(id) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 25) return null;
    quantities.set(id, Math.min(25, (quantities.get(id) ?? 0) + quantity));
  }
  if (quantities.size === 0) return null;

  const services = [...quantities.entries()].map(([id, quantity]) => {
    const service = catalog.get(id)!;
    return { id, name: service.name, quantity, unitPrice: 0, lineTotal: 0 };
  });
  return { services, total: 500, advanceAmount: 500 };
}
