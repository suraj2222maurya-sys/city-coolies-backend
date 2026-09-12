export const RENOVATION_CATEGORIES = [
  "All",
  "Full Home",
  "Kitchen",
  "Bathroom",
  "Flooring",
  "Painting",
  "Ceiling",
  "Waterproofing",
  "Electrical",
  "Plumbing",
  "Exterior",
  "Civil",
  "Commercial",
] as const;

export type RenovationFilter =
  (typeof RENOVATION_CATEGORIES)[number];

export type RenovationCategory =
  Exclude<RenovationFilter, "All">;

export type RenovationService = {
  id: string;
  name: string;
  category: RenovationCategory;
  description: string;
  priceLabel: string;
  priceCaption?: string;
  finalNote?: string;
  rate: number;
  unit: "sq ft" | "lot";
  image: string | null;
};

export const RENOVATION_SURVEY_FEE = 500;

export const RENOVATION_SERVICES: readonly RenovationService[] = [
  {
    id: "complete-building-demolition",
    name: "Complete Building Demolition",
    category: "Civil",
    description:
      "Complete demolition of houses, buildings, shops and old structures.",
    priceLabel: "From ₹90 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 90,
    unit: "sq ft",
    image: "/renovation-building-demolition.webp.png",
  },
  {
    id: "old-building-scrap-purchase",
    name: "Demolition Scrap",
    category: "Civil",
    description:
      "We purchase reusable scrap recovered from demolished buildings.",
    priceLabel: "From ₹2,000 / lot",
    priceCaption: "Bulk Lot Rate",
    finalNote:
      "Final lot rate after site survey.",
    rate: 2000,
    unit: "lot",
    image: "/renovation-demolition-scrap.png",
  },
  {
    id: "internal-wall-removal-layout-change",
    name: "Internal Wall Removal & Room Layout Change",
    category: "Civil",
    description:
      "Selected internal walls or partitions removed to change room layout.",
    priceLabel: "From ₹120 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 120,
    unit: "sq ft",
    image: "/renovation-internal-wall-removal-room-layout-change.webp",
  },
  {
    id: "complete-home-renovation",
    name: "Complete Home Renovation",
    category: "Full Home",
    description:
      "Complete renovation of rooms, flooring, walls and utilities.",
    priceLabel: "From ₹800 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 800,
    unit: "sq ft",
    image: "/renovation-complete-home-renovation.webp",
  },
  {
    id: "flat-apartment-renovation",
    name: "Flat / Apartment Renovation",
    category: "Full Home",
    description:
      "Complete renovation and modernisation of flats and apartments.",
    priceLabel: "From ₹750 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 750,
    unit: "sq ft",
    image: "/renovation-flat-apartment-renovation.webp",
  },
  {
    id: "villa-independent-house-renovation",
    name: "Villa / Independent House Renovation",
    category: "Full Home",
    description:
      "Complete renovation of villas and independent houses.",
    priceLabel: "From ₹900 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 900,
    unit: "sq ft",
    image: "/renovation-villa-independent-house-renovation.webp",
  },
  {
    id: "old-house-repair-renovation",
    name: "Old House Repair & Renovation",
    category: "Full Home",
    description:
      "Repair damaged areas and renovate old residential properties.",
    priceLabel: "From ₹950 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 950,
    unit: "sq ft",
    image: "/renovation-old-house-repair-renovation.webp",
  },
  {
    id: "complete-kitchen-renovation",
    name: "Complete Kitchen Renovation",
    category: "Kitchen",
    description:
      "Complete renovation of kitchen flooring, walls, platform and utilities.",
    priceLabel: "From ₹900 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 900,
    unit: "sq ft",
    image: "/renovation-complete-kitchen-renovation.webp",
  },
  {
    id: "complete-bathroom-renovation",
    name: "Complete Bathroom Renovation",
    category: "Bathroom",
    description:
      "Complete bathroom renovation including tiles, plumbing and fittings.",
    priceLabel: "From ₹600 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 600,
    unit: "sq ft",
    image: "/renovation-complete-bathroom-renovation.webp",
  },
  {
    id: "floor-tile-removal-installation",
    name: "Old Floor Tile Removal & New Tile Installation",
    category: "Flooring",
    description:
      "Old floor tiles removed and new tiles installed.",
    priceLabel: "From ₹120 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 120,
    unit: "sq ft",
    image: "/renovation-old-floor-tile-removal-new-tile-installation.webp",
  },
  {
    id: "wall-tile-cladding-installation",
    name: "Wall Tile & Cladding Installation",
    category: "Flooring",
    description:
      "New wall tiles or decorative cladding installed.",
    priceLabel: "From ₹140 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 140,
    unit: "sq ft",
    image: "/renovation-wall-tile-cladding-installation.webp",
  },
  {
    id: "marble-granite-flooring-cladding",
    name: "Marble & Granite Flooring / Cladding",
    category: "Flooring",
    description:
      "Marble or granite installation for floors and wall surfaces.",
    priceLabel: "From ₹220 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 220,
    unit: "sq ft",
    image: "/renovation-marble-granite-flooring-cladding.webp",
  },
  {
    id: "interior-wall-ceiling-painting",
    name: "Interior Wall & Ceiling Painting",
    category: "Painting",
    description:
      "Interior wall and ceiling preparation with fresh painting.",
    priceLabel: "From ₹35 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 35,
    unit: "sq ft",
    image: "/renovation-interior-wall-ceiling-painting.webp",
  },
  {
    id: "exterior-wall-painting",
    name: "Exterior Wall Painting",
    category: "Painting",
    description:
      "Exterior wall preparation with weather-resistant painting.",
    priceLabel: "From ₹40 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 40,
    unit: "sq ft",
    image: "/renovation-exterior-wall-painting.webp",
  },
  {
    id: "gypsum-pop-false-ceiling",
    name: "Gypsum / POP False Ceiling Work",
    category: "Ceiling",
    description:
      "New gypsum or POP false ceiling installation and replacement.",
    priceLabel: "From ₹95 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 95,
    unit: "sq ft",
    image: "/renovation-gypsum-pop-false-ceiling-work.webp",
  },
  {
    id: "bathroom-leakage-waterproofing",
    name: "Bathroom Leakage Waterproofing",
    category: "Waterproofing",
    description:
      "Bathroom waterproofing to control leakage and seepage.",
    priceLabel: "From ₹55 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 55,
    unit: "sq ft",
    image: "/renovation-bathroom-leakage-waterproofing.webp",
  },
  {
    id: "terrace-leakage-waterproofing",
    name: "Terrace Leakage Waterproofing",
    category: "Waterproofing",
    description:
      "Terrace waterproofing to prevent rainwater leakage and seepage.",
    priceLabel: "From ₹60 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 60,
    unit: "sq ft",
    image: "/renovation-terrace-leakage-waterproofing.webp",
  },
  {
    id: "complete-house-electrical-rewiring",
    name: "Complete House Electrical Rewiring",
    category: "Electrical",
    description:
      "Old electrical wiring replaced with complete new house wiring.",
    priceLabel: "From ₹70 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 70,
    unit: "sq ft",
    image: "/renovation-complete-house-electrical-rewiring.webp",
  },
  {
    id: "old-plumbing-pipe-replacement",
    name: "Old Plumbing Pipe Replacement",
    category: "Plumbing",
    description:
      "Old water and drainage pipes replaced during renovation.",
    priceLabel: "From ₹75 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 75,
    unit: "sq ft",
    image: "/renovation-old-plumbing-pipe-replacement.webp",
  },
  {
    id: "door-window-replacement",
    name: "Door & Window Replacement",
    category: "Exterior",
    description:
      "Old doors and windows removed and replaced with new units.",
    priceLabel: "From ₹240 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 240,
    unit: "sq ft",
    image: "/renovation-door-window-replacement.webp",
  },
  {
    id: "building-front-exterior-renovation",
    name: "Building Exterior & Front Elevation Renovation",
    category: "Exterior",
    description:
      "Complete renovation of the building exterior and front appearance.",
    priceLabel: "From ₹300 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 300,
    unit: "sq ft",
    image: "/renovation-building-exterior-front-elevation.webp",
  },
  {
    id: "wall-plaster-crack-repair",
    name: "Wall Plaster, Crack & Surface Repair",
    category: "Civil",
    description:
      "Damaged plaster, wall cracks and uneven surfaces repaired.",
    priceLabel: "From ₹45 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 45,
    unit: "sq ft",
    image: "/renovation-wall-plaster-crack-surface-repair.webp",
  },
  {
    id: "office-renovation",
    name: "Office Renovation",
    category: "Commercial",
    description:
      "Complete renovation of offices and professional workspaces.",
    priceLabel: "From ₹850 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 850,
    unit: "sq ft",
    image: "/renovation-office-renovation.webp",
  },
  {
    id: "shop-showroom-renovation",
    name: "Shop / Showroom Renovation",
    category: "Commercial",
    description:
      "Complete renovation of shops, showrooms and retail spaces.",
    priceLabel: "From ₹800 / sq ft",
    priceCaption: "Indicative Rate",
    rate: 800,
    unit: "sq ft",
    image: "/renovation-shop-showroom-renovation.webp",
  },
] as const;