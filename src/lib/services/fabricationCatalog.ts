export const FABRICATION_SURVEY_FEE = 500;

export const FABRICATION_CATEGORIES = [
  "All",
  "Gates & Security",
  "Grills & Fencing",
  "Railings",
  "Staircases & Access",
  "Roofing & Sheds",
  "Structural Steel",
  "Shutters & Doors",
  "Custom & Repairs",
] as const;

export type FabricationCategory = (typeof FABRICATION_CATEGORIES)[number];
export type ServiceCategory = Exclude<FabricationCategory, "All">;

export type FabricationService = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string;
  unit: string;
  description: string;
  image: string | null;
};

export const FABRICATION_SERVICES: readonly FabricationService[] = [
  { id: "ms-swing-gate", name: "MS Swing Main Gate", category: "Gates & Security", price: "₹350–₹650", unit: "Per Sq. Ft.", description: "Custom mild-steel swing gate with fabrication, hinges and installation.", image: null },
  { id: "designer-ms-gate", name: "Designer / Laser-Cut MS Gate", category: "Gates & Security", price: "₹650–₹1,200", unit: "Per Sq. Ft.", description: "Premium patterned gate with laser-cut panels and a tailored finish.", image: null },
  { id: "ss-304-main-gate", name: "SS 304 Main Gate", category: "Gates & Security", price: "₹950–₹1,600", unit: "Per Sq. Ft.", description: "Corrosion-resistant stainless-steel gate for homes and commercial entrances.", image: null },
  { id: "wrought-iron-gate", name: "Wrought-Iron Style Gate", category: "Gates & Security", price: "₹700–₹1,500", unit: "Per Sq. Ft.", description: "Ornamental entrance gate with classic detailing and protective coating.", image: null },
  { id: "sliding-gate", name: "Manual Sliding Gate", category: "Gates & Security", price: "₹600–₹1,200", unit: "Per Sq. Ft.", description: "Space-saving sliding gate with track, rollers and site-fit alignment.", image: null },
  { id: "automatic-gate", name: "Automatic Sliding / Swing Gate", category: "Gates & Security", price: "Final Quote", unit: "After Survey", description: "Motor-ready or fully automated gate designed for opening size and usage.", image: null },
  { id: "folding-gate", name: "Folding Metal Gate", category: "Gates & Security", price: "₹550–₹1,050", unit: "Per Sq. Ft.", description: "Multi-panel folding gate for entrances where swing space is limited.", image: null },
  { id: "ms-safety-door", name: "MS Safety Door", category: "Gates & Security", price: "₹450–₹900", unit: "Per Sq. Ft.", description: "Secure made-to-measure safety door with lock-ready provision.", image: null },

  { id: "ms-window-grill", name: "MS Window Grill", category: "Grills & Fencing", price: "₹250–₹450", unit: "Per Sq. Ft.", description: "Protective window grill with clean welds, anchoring and finish.", image: null },
  { id: "designer-window-grill", name: "Designer Window Grill", category: "Grills & Fencing", price: "₹400–₹750", unit: "Per Sq. Ft.", description: "Decorative custom grill matched to the property design.", image: null },
  { id: "balcony-safety-grill", name: "Balcony Safety Grill", category: "Grills & Fencing", price: "₹300–₹650", unit: "Per Sq. Ft.", description: "Secure balcony enclosure measured and fabricated for the opening.", image: null },
  { id: "terrace-safety-grill", name: "Terrace Safety Enclosure", category: "Grills & Fencing", price: "₹320–₹700", unit: "Per Sq. Ft.", description: "Metal safety enclosure for terraces and accessible roof areas.", image: null },
  { id: "compound-metal-fencing", name: "Compound Metal Fencing", category: "Grills & Fencing", price: "₹300–₹700", unit: "Per Sq. Ft.", description: "Fabricated boundary fencing for residential and commercial sites.", image: null },
  { id: "chain-link-fencing", name: "Chain-Link Fencing with Frame", category: "Grills & Fencing", price: "₹140–₹350", unit: "Per Sq. Ft.", description: "Framed chain-link fencing for plots, utilities and open boundaries.", image: null },
  { id: "barbed-wire-fencing", name: "Barbed-Wire Fencing Structure", category: "Grills & Fencing", price: "Final Quote", unit: "After Survey", description: "Posts, supports and wire installation planned after boundary measurement.", image: null },
  { id: "ac-outdoor-cage", name: "AC Outdoor Unit Safety Cage", category: "Grills & Fencing", price: "Final Quote", unit: "Per Unit", description: "Ventilated anti-theft metal cage custom-built for an outdoor unit.", image: null },

  { id: "ms-railing", name: "MS Stair / Balcony Railing", category: "Railings", price: "₹350–₹650", unit: "Per Running Ft.", description: "Durable mild-steel railing with secure anchoring and smooth finish.", image: null },
  { id: "ss-304-railing", name: "SS 304 Railing", category: "Railings", price: "₹750–₹1,200", unit: "Per Running Ft.", description: "Premium stainless-steel railing for indoor and outdoor locations.", image: null },
  { id: "ss-glass-railing", name: "SS & Glass Railing", category: "Railings", price: "₹1,200–₹1,800", unit: "Per Sq. Ft.", description: "Modern stainless-steel railing with site-specified safety glass.", image: null },
  { id: "frameless-glass-railing", name: "Frameless Glass Railing Support", category: "Railings", price: "Final Quote", unit: "After Survey", description: "Custom metal channels and fittings for a premium glass railing system.", image: null },
  { id: "ramp-handrail", name: "Ramp & Accessibility Handrail", category: "Railings", price: "₹650–₹1,200", unit: "Per Running Ft.", description: "Accessible support railing made to the measured ramp profile.", image: null },
  { id: "industrial-handrail", name: "Industrial Safety Handrail", category: "Railings", price: "₹140–₹260", unit: "Per Kg", description: "Heavy-duty handrail for platforms, plants and service areas.", image: null },
  { id: "cable-railing", name: "SS Cable Railing", category: "Railings", price: "Final Quote", unit: "After Survey", description: "Contemporary cable railing configured for span, tension and supports.", image: null },

  { id: "straight-staircase", name: "MS Straight Staircase", category: "Staircases & Access", price: "₹160–₹240", unit: "Per Kg", description: "Custom straight steel staircase with structural supports and treads.", image: null },
  { id: "spiral-staircase", name: "MS Spiral Staircase", category: "Staircases & Access", price: "₹180–₹350", unit: "Per Kg", description: "Space-efficient spiral staircase fabricated to the measured height.", image: null },
  { id: "fire-escape-staircase", name: "Fire-Escape Staircase", category: "Staircases & Access", price: "₹180–₹350", unit: "Per Kg", description: "External escape stair structure designed to approved site requirements.", image: null },
  { id: "loft-staircase", name: "Loft / Terrace Access Staircase", category: "Staircases & Access", price: "Final Quote", unit: "After Survey", description: "Compact access staircase for lofts, terraces and utility levels.", image: null },
  { id: "industrial-ladder", name: "Industrial Access Ladder", category: "Staircases & Access", price: "₹160–₹280", unit: "Per Kg", description: "Fixed steel ladder fabricated for equipment and maintenance access.", image: null },
  { id: "cage-ladder", name: "Safety-Cage Ladder", category: "Staircases & Access", price: "Final Quote", unit: "After Survey", description: "Vertical access ladder with fabricated safety cage and anchoring.", image: null },

  { id: "gi-ms-roofing-shed", name: "GI / MS Roofing Shed", category: "Roofing & Sheds", price: "₹250–₹450", unit: "Per Sq. Ft.", description: "Roofing sheets installed over a fabricated steel support frame.", image: null },
  { id: "terrace-roofing-shed", name: "Terrace Roofing Shed", category: "Roofing & Sheds", price: "₹250–₹500", unit: "Per Sq. Ft.", description: "Weather-protection shed planned for terrace span and drainage.", image: null },
  { id: "industrial-steel-shed", name: "Industrial Steel Shed", category: "Roofing & Sheds", price: "₹250–₹650", unit: "Per Sq. Ft.", description: "Steel shed for factories, workshops, production and storage.", image: null },
  { id: "warehouse-shed", name: "Warehouse Roofing Shed", category: "Roofing & Sheds", price: "Final Quote", unit: "After Survey", description: "Large-span warehouse shed planned after structural site assessment.", image: null },
  { id: "parking-shed", name: "Car / Bike Parking Shed", category: "Roofing & Sheds", price: "₹300–₹650", unit: "Per Sq. Ft.", description: "Weather-protected parking canopy with a stable steel frame.", image: null },
  { id: "polycarbonate-canopy", name: "Polycarbonate Canopy", category: "Roofing & Sheds", price: "₹285–₹800", unit: "Per Sq. Ft.", description: "Lightweight translucent canopy with fabricated metal framing.", image: null },
  { id: "entrance-walkway-canopy", name: "Entrance / Walkway Canopy", category: "Roofing & Sheds", price: "Final Quote", unit: "After Survey", description: "Custom canopy for entrances, pathways and loading areas.", image: null },
  { id: "ms-pergola", name: "MS Pergola", category: "Roofing & Sheds", price: "₹800–₹1,800", unit: "Per Sq. Ft.", description: "Architectural pergola for terrace, garden, facade or entrance.", image: null },
  { id: "steel-roof-truss", name: "Steel Roof Truss", category: "Roofing & Sheds", price: "₹120–₹200", unit: "Per Kg", description: "Engineered truss fabrication for reliable long-span roofing support.", image: null },

  { id: "structural-steel", name: "Structural Steel Fabrication", category: "Structural Steel", price: "₹140–₹260", unit: "Per Kg", description: "Beams, columns, frames and site-specific structural assemblies.", image: null },
  { id: "peb-structure", name: "PEB Steel Structure", category: "Structural Steel", price: "Final Quote", unit: "After Survey", description: "Pre-engineered building structure quoted from design and load inputs.", image: null },
  { id: "standard-mezzanine", name: "Standard Mezzanine Floor", category: "Structural Steel", price: "₹350–₹700", unit: "Per Sq. Ft.", description: "Space-optimising steel mezzanine for standard commercial loads.", image: null },
  { id: "heavy-mezzanine", name: "Heavy-Duty Mezzanine Floor", category: "Structural Steel", price: "₹600–₹1,000", unit: "Per Sq. Ft.", description: "High-load mezzanine for industrial storage and operations.", image: null },
  { id: "industrial-platform", name: "Industrial Platform", category: "Structural Steel", price: "₹160–₹280", unit: "Per Kg", description: "Fabricated access, work or equipment platform with supports.", image: null },
  { id: "catwalk", name: "Catwalk & Access Walkway", category: "Structural Steel", price: "₹160–₹280", unit: "Per Kg", description: "Elevated service walkway with safe railing and structural support.", image: null },
  { id: "pipe-rack", name: "Industrial Pipe Rack", category: "Structural Steel", price: "Final Quote", unit: "After Survey", description: "Custom pipe-support structure based on routing and load requirements.", image: null },
  { id: "equipment-support-frame", name: "Equipment Support Frame", category: "Structural Steel", price: "Final Quote", unit: "After Survey", description: "Fabricated frame or base for tanks, machinery and utility equipment.", image: null },
  { id: "warehouse-frame", name: "Warehouse Steel Frame", category: "Structural Steel", price: "Final Quote", unit: "After Survey", description: "Custom warehouse frame designed after measurement and load review.", image: null },
  { id: "solar-panel-structure", name: "Solar Panel Mounting Structure", category: "Structural Steel", price: "Final Quote", unit: "After Survey", description: "Roof or ground-mount support structure planned to panel layout.", image: null },

  { id: "manual-rolling-shutter", name: "Manual Rolling Shutter", category: "Shutters & Doors", price: "₹250–₹350", unit: "Per Sq. Ft.", description: "Durable manually operated shutter for shops, stores and garages.", image: null },
  { id: "gear-rolling-shutter", name: "Gear-Operated Rolling Shutter", category: "Shutters & Doors", price: "₹350–₹500", unit: "Per Sq. Ft.", description: "Gear-assisted shutter for smooth operation across larger openings.", image: null },
  { id: "motorised-shutter", name: "Motorised Rolling Shutter", category: "Shutters & Doors", price: "₹400–₹650", unit: "Per Sq. Ft.", description: "Powered shutter system planned to the opening and duty cycle.", image: null },
  { id: "collapsible-gate", name: "Collapsible Steel Gate", category: "Shutters & Doors", price: "₹350–₹650", unit: "Per Sq. Ft.", description: "Retractable steel security gate for shops and internal entrances.", image: null },
  { id: "metal-utility-door", name: "Metal Utility Door", category: "Shutters & Doors", price: "Final Quote", unit: "After Survey", description: "Custom steel door for utility, terrace, service and storage areas.", image: null },
  { id: "fire-exit-metal-door", name: "Fire-Exit Metal Door Fabrication", category: "Shutters & Doors", price: "Final Quote", unit: "After Survey", description: "Metal door fabrication to the approved project specification.", image: null },

  { id: "gate-grill-repair", name: "Gate & Grill Repair", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Alignment, reinforcement, hinge, latch and damaged-member repairs.", image: null },
  { id: "railing-staircase-repair", name: "Railing & Staircase Repair", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "On-site correction and reinforcement of existing metalwork.", image: null },
  { id: "rolling-shutter-repair", name: "Rolling Shutter Repair", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Assessment and repair of shutter slats, guides and operation.", image: null },
  { id: "on-site-welding", name: "On-Site Welding Work", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Professional welding support for repairs and site modifications.", image: null },
  { id: "custom-metal-fabrication", name: "Custom Metal Fabrication", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Made-to-measure metalwork for unique residential or business needs.", image: null },
  { id: "metal-rack-storage", name: "Metal Rack & Storage System", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Custom racks and storage frames for homes, shops and warehouses.", image: null },
  { id: "ss-work-table", name: "SS Work Table / Counter", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Stainless-steel work surface for kitchens, labs and commercial use.", image: null },
  { id: "signage-support-frame", name: "Signage Support Frame", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Fabricated frame for shop, building and outdoor signage mounting.", image: null },
  { id: "rust-repair-refinishing", name: "Rust Repair & Metal Refinishing", category: "Custom & Repairs", price: "Final Quote", unit: "After Survey", description: "Rust-damage repair, surface preparation and protective refinishing.", image: null },
];

export type FabricationSurveyItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type FabricationSurveyPlan = {
  services: FabricationSurveyItem[];
  total: number;
  advanceAmount: number;
};

const SERVICE_BY_ID = new Map(FABRICATION_SERVICES.map((service) => [service.id, service]));

export function calculateFabricationSurvey(input: unknown): FabricationSurveyPlan | null {
  if (!Array.isArray(input) || input.length < 1 || input.length > FABRICATION_SERVICES.length) return null;

  const seen = new Set<string>();
  const services: FabricationSurveyItem[] = [];

  for (const value of input) {
    if (!value || typeof value !== "object") return null;
    const item = value as { id?: unknown };
    if (typeof item.id !== "string" || seen.has(item.id)) return null;
    const service = SERVICE_BY_ID.get(item.id);
    if (!service) return null;
    seen.add(service.id);
    services.push({ id: service.id, name: service.name, quantity: 1, unitPrice: 0, lineTotal: 0 });
  }

  return { services, total: FABRICATION_SURVEY_FEE, advanceAmount: FABRICATION_SURVEY_FEE };
}
