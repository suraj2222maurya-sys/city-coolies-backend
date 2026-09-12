export const GARDENING_CATEGORIES = [
  "All",
  "Gardener",
  "Lawn Care",
  "Landscaping",
  "Vertical Garden",
  "Nursery",
  "Pots",
  "Compost",
  "Garden Decor",
] as const;

export type GardeningCategory =
  (typeof GARDENING_CATEGORIES)[number];

export type GardeningServiceOption =
  | "Labour Only"
  | "Tools Included"
  | "Service"
  | "Consultation"
  | "Installation"
  | "Maintenance"
  | "Plant"
  | "Bonsai"
  | "Pot"
  | "Compost"
  | "Garden Decor";

export type GardeningService = {
  id: string;
  category: Exclude<GardeningCategory, "All">;
  name: string;
  duration: string;
  option: GardeningServiceOption;
  price: number;
  priceLabel: string;
  image: string;
  includes: readonly string[];
  note: string;
};

export type GardenerBookingService = GardeningService;

const RAW_GARDENING_SERVICES = [
    {
        "id":  "gardener-2-hours-labour-only",
        "category":  "Gardener",
        "name":  "2-Hour Gardener",
        "duration":  "2 Hours",
        "option":  "Labour Only",
        "price":  1499,
        "image":  "/gardening-gardener-2-hours-labour-only-v2.webp",
        "includes":  [
                         "Light pruning",
                         "Hand weeding",
                         "Dry-leaf cleanup"
                     ],
        "note":  "Customer provides tools and materials."
    },
    {
        "id":  "gardener-8-hours-labour-only",
        "category":  "Gardener",
        "name":  "8-Hour Gardener",
        "duration":  "8 Hours",
        "option":  "Labour Only",
        "price":  3510,
        "image":  "/gardening-gardener-8-hours-labour-only-v2.webp",
        "includes":  [
                         "Extended garden care",
                         "Pruning and weeding",
                         "Plant and pot arrangement"
                     ],
        "note":  "Customer provides tools and materials."
    },
    {
        "id":  "gardener-2-hours-tools-included",
        "category":  "Gardener",
        "name":  "2-Hour Gardener",
        "duration":  "2 Hours",
        "option":  "Tools Included",
        "price":  1899,
        "image":  "/gardening-gardener-2-hours-tools-included-v2.webp",
        "includes":  [
                         "Basic hand tools",
                         "Light pruning",
                         "Focused garden cleanup"
                     ],
        "note":  "Basic tools are included. Materials are extra."
    },
    {
        "id":  "gardener-8-hours-tools-included",
        "category":  "Gardener",
        "name":  "8-Hour Gardener",
        "duration":  "8 Hours",
        "option":  "Tools Included",
        "price":  4899,
        "image":  "/gardening-gardener-8-hours-tools-included-v2.webp",
        "includes":  [
                         "Complete tool setup",
                         "Lawn and hedge care",
                         "Full-day garden upkeep"
                     ],
        "note":  "Tools are included. Plants and consumables are extra."
    },
    {
        "id":  "lawn-mowing",
        "category":  "Lawn Care",
        "name":  "Lawn Mowing",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1499,
        "image":  "/gardening-lawn-mowing.webp",
        "includes":  [
                         "Grass cutting",
                         "Even finish",
                         "Clipping cleanup"
                     ],
        "note":  "Price is for a standard residential lawn visit."
    },
    {
        "id":  "lawn-edge-trimming",
        "category":  "Lawn Care",
        "name":  "Lawn Edge Trimming",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  999,
        "image":  "/gardening-lawn-edge-trimming.webp",
        "includes":  [
                         "Clean lawn borders",
                         "Pathway edging",
                         "Final cleanup"
                     ],
        "note":  "Price is for a standard residential lawn visit."
    },
    {
        "id":  "lawn-weed-removal",
        "category":  "Lawn Care",
        "name":  "Lawn Weed Removal",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1299,
        "image":  "/gardening-lawn-weed-removal.webp",
        "includes":  [
                         "Manual weed removal",
                         "Root-zone cleanup",
                         "Waste collection"
                     ],
        "note":  "Chemicals, if required, are charged separately."
    },
    {
        "id":  "lawn-aeration",
        "category":  "Lawn Care",
        "name":  "Lawn Aeration",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1799,
        "image":  "/gardening-lawn-aeration.webp",
        "includes":  [
                         "Soil aeration",
                         "Root-zone airflow",
                         "Compaction relief"
                     ],
        "note":  "Price is for a standard residential lawn visit."
    },
    {
        "id":  "lawn-fertilizing",
        "category":  "Lawn Care",
        "name":  "Lawn Fertilizing",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1299,
        "image":  "/gardening-lawn-fertilizing.webp",
        "includes":  [
                         "Fertilizer application",
                         "Coverage check",
                         "Watering guidance"
                     ],
        "note":  "Fertilizer material is charged separately."
    },
    {
        "id":  "lawn-dethatching",
        "category":  "Lawn Care",
        "name":  "Lawn Dethatching",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1699,
        "image":  "/gardening-lawn-dethatching.webp",
        "includes":  [
                         "Thatch removal",
                         "Surface cleanup",
                         "Growth preparation"
                     ],
        "note":  "Price is for a standard residential lawn visit."
    },
    {
        "id":  "lawn-repair-reseeding",
        "category":  "Lawn Care",
        "name":  "Lawn Repair \u0026 Reseeding",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1999,
        "image":  "/gardening-lawn-repair-reseeding.webp",
        "includes":  [
                         "Patch assessment",
                         "Soil preparation",
                         "Reseeding support"
                     ],
        "note":  "Seeds and replacement soil are charged separately."
    },
    {
        "id":  "lawn-pest-disease-care",
        "category":  "Lawn Care",
        "name":  "Lawn Pest \u0026 Disease Care",
        "duration":  "Per Visit",
        "option":  "Service",
        "price":  1499,
        "image":  "/gardening-lawn-pest-disease-care.webp",
        "includes":  [
                         "Lawn inspection",
                         "Issue identification",
                         "Treatment guidance"
                     ],
        "note":  "Treatment chemicals are charged separately."
    },
    {
        "id":  "landscape-design",
        "category":  "Landscaping",
        "name":  "Landscape Design",
        "duration":  "Design Consultation",
        "option":  "Consultation",
        "price":  2499,
        "image":  "/gardening-landscape-design.webp",
        "includes":  [
                         "Site discussion",
                         "Layout concept",
                         "Planting guidance"
                     ],
        "note":  "Design fee starts at the listed amount."
    },
    {
        "id":  "complete-garden-setup",
        "category":  "Landscaping",
        "name":  "Complete Garden Setup",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  49999,
        "image":  "/gardening-complete-garden-setup.webp",
        "includes":  [
                         "Layout execution",
                         "Planting zones",
                         "Finishing work"
                     ],
        "note":  "Final quote depends on area, design and materials."
    },
    {
        "id":  "terrace-garden-setup",
        "category":  "Landscaping",
        "name":  "Terrace Garden Setup",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  24999,
        "image":  "/gardening-terrace-garden-setup.webp",
        "includes":  [
                         "Terrace layout",
                         "Drainage planning",
                         "Pot placement"
                     ],
        "note":  "Final quote depends on area, plants and materials."
    },
    {
        "id":  "natural-lawn-installation",
        "category":  "Landscaping",
        "name":  "Natural Lawn Installation",
        "duration":  "Up to 100 sq ft",
        "option":  "Installation",
        "price":  14999,
        "image":  "/gardening-natural-lawn-installation.webp",
        "includes":  [
                         "Ground preparation",
                         "Natural grass laying",
                         "Initial watering"
                     ],
        "note":  "Extra area and materials are quoted separately."
    },
    {
        "id":  "artificial-turf-installation",
        "category":  "Landscaping",
        "name":  "Artificial Turf Installation",
        "duration":  "Up to 100 sq ft",
        "option":  "Installation",
        "price":  24999,
        "image":  "/gardening-artificial-turf-installation.webp",
        "includes":  [
                         "Surface preparation",
                         "Turf fitting",
                         "Edge finishing"
                     ],
        "note":  "Extra area and premium turf are quoted separately."
    },
    {
        "id":  "irrigation-sprinkler-installation",
        "category":  "Landscaping",
        "name":  "Irrigation \u0026 Sprinkler Setup",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  14999,
        "image":  "/gardening-irrigation-sprinkler-installation.webp",
        "includes":  [
                         "Water-line planning",
                         "Sprinkler setup",
                         "Flow testing"
                     ],
        "note":  "Final quote depends on area and equipment."
    },
    {
        "id":  "garden-pathway-installation",
        "category":  "Landscaping",
        "name":  "Garden Pathway Installation",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  11999,
        "image":  "/gardening-garden-pathway-installation.webp",
        "includes":  [
                         "Path layout",
                         "Base preparation",
                         "Paver installation"
                     ],
        "note":  "Final quote depends on length and material."
    },
    {
        "id":  "garden-bed-border-setup",
        "category":  "Landscaping",
        "name":  "Garden Bed Border Setup",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  5999,
        "image":  "/gardening-garden-bed-border-setup.webp",
        "includes":  [
                         "Border layout",
                         "Edge preparation",
                         "Neat finishing"
                     ],
        "note":  "Final quote depends on length and material."
    },
    {
        "id":  "vertical-natural-installation",
        "category":  "Vertical Garden",
        "name":  "Natural Vertical Garden",
        "duration":  "Up to 30 sq ft",
        "option":  "Installation",
        "price":  24999,
        "image":  "/gardening-vertical-natural-installation.webp",
        "includes":  [
                         "Frame setup",
                         "Plant pockets",
                         "Basic irrigation"
                     ],
        "note":  "Extra area, plants and materials are quoted separately."
    },
    {
        "id":  "vertical-artificial-installation",
        "category":  "Vertical Garden",
        "name":  "Artificial Vertical Garden",
        "duration":  "Up to 30 sq ft",
        "option":  "Installation",
        "price":  14999,
        "image":  "/gardening-vertical-artificial-installation.webp",
        "includes":  [
                         "Wall measurement",
                         "Panel fitting",
                         "Edge finishing"
                     ],
        "note":  "Extra area and premium foliage are quoted separately."
    },
    {
        "id":  "vertical-balcony-setup",
        "category":  "Vertical Garden",
        "name":  "Balcony Vertical Garden",
        "duration":  "Starting Package",
        "option":  "Installation",
        "price":  9999,
        "image":  "/gardening-vertical-balcony-setup.webp",
        "includes":  [
                         "Space planning",
                         "Vertical frame",
                         "Pot arrangement"
                     ],
        "note":  "Plants and special materials are charged separately."
    },
    {
        "id":  "vertical-maintenance",
        "category":  "Vertical Garden",
        "name":  "Vertical Garden Maintenance",
        "duration":  "Per Visit",
        "option":  "Maintenance",
        "price":  1499,
        "image":  "/gardening-vertical-maintenance.webp",
        "includes":  [
                         "Plant inspection",
                         "Pruning and cleanup",
                         "Irrigation check"
                     ],
        "note":  "Replacement plants and parts are charged separately."
    },
    {
        "id":  "nursery-money-plant",
        "category":  "Nursery",
        "name":  "Money Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  199,
        "image":  "/gardening-nursery-money-plant.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-snake-plant",
        "category":  "Nursery",
        "name":  "Snake Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  299,
        "image":  "/gardening-nursery-snake-plant.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-areca-palm",
        "category":  "Nursery",
        "name":  "Areca Palm",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  399,
        "image":  "/gardening-nursery-areca-palm.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-peace-lily",
        "category":  "Nursery",
        "name":  "Peace Lily",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  299,
        "image":  "/gardening-nursery-peace-lily.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-zz-plant",
        "category":  "Nursery",
        "name":  "ZZ Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  499,
        "image":  "/gardening-nursery-zz-plant.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-rubber-plant",
        "category":  "Nursery",
        "name":  "Rubber Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  399,
        "image":  "/gardening-nursery-rubber-plant.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-tulsi",
        "category":  "Nursery",
        "name":  "Tulsi Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  149,
        "image":  "/gardening-nursery-tulsi.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "nursery-hibiscus",
        "category":  "Nursery",
        "name":  "Hibiscus Plant",
        "duration":  "1 Plant",
        "option":  "Plant",
        "price":  249,
        "image":  "/gardening-nursery-hibiscus.webp",
        "includes":  [
                         "Healthy nursery plant",
                         "Basic care guide",
                         "Nursery pot"
                     ],
        "note":  "Decorative pot is sold separately."
    },
    {
        "id":  "bonsai-adenium",
        "category":  "Nursery",
        "name":  "Adenium Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  799,
        "image":  "/gardening-bonsai-adenium.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-azalea",
        "category":  "Nursery",
        "name":  "Azalea Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-azalea.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-banyan",
        "category":  "Nursery",
        "name":  "Banyan Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2499,
        "image":  "/gardening-bonsai-banyan.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-ber",
        "category":  "Nursery",
        "name":  "Ber Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1299,
        "image":  "/gardening-bonsai-ber.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-bougainvillea",
        "category":  "Nursery",
        "name":  "Bougainvillea Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-bougainvillea.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-boxwood",
        "category":  "Nursery",
        "name":  "Boxwood Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1999,
        "image":  "/gardening-bonsai-boxwood.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-chinese-elm",
        "category":  "Nursery",
        "name":  "Chinese Elm Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2499,
        "image":  "/gardening-bonsai-chinese-elm.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-crabapple",
        "category":  "Nursery",
        "name":  "Crabapple Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2499,
        "image":  "/gardening-bonsai-crabapple.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-curry-leaf",
        "category":  "Nursery",
        "name":  "Curry Leaf Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-curry-leaf.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-dwarf-jade",
        "category":  "Nursery",
        "name":  "Dwarf Jade Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  699,
        "image":  "/gardening-bonsai-dwarf-jade.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-ficus",
        "category":  "Nursery",
        "name":  "Ficus Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-ficus.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-fukien-tea",
        "category":  "Nursery",
        "name":  "Fukien Tea Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-fukien-tea.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-ginseng-ficus",
        "category":  "Nursery",
        "name":  "Ginseng Ficus Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  899,
        "image":  "/gardening-bonsai-ginseng-ficus.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-guava",
        "category":  "Nursery",
        "name":  "Guava Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-guava.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-jade",
        "category":  "Nursery",
        "name":  "Jade Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  699,
        "image":  "/gardening-bonsai-jade.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-japanese-maple",
        "category":  "Nursery",
        "name":  "Japanese Maple Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2999,
        "image":  "/gardening-bonsai-japanese-maple.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-juniper",
        "category":  "Nursery",
        "name":  "Juniper Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1999,
        "image":  "/gardening-bonsai-juniper.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-lemon",
        "category":  "Nursery",
        "name":  "Lemon Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-lemon.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-mango",
        "category":  "Nursery",
        "name":  "Mango Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1799,
        "image":  "/gardening-bonsai-mango.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-neem",
        "category":  "Nursery",
        "name":  "Neem Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-neem.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-olive",
        "category":  "Nursery",
        "name":  "Olive Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2999,
        "image":  "/gardening-bonsai-olive.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-orange",
        "category":  "Nursery",
        "name":  "Orange Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1699,
        "image":  "/gardening-bonsai-orange.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-peepal",
        "category":  "Nursery",
        "name":  "Peepal Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-peepal.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-pine",
        "category":  "Nursery",
        "name":  "Pine Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  2499,
        "image":  "/gardening-bonsai-pine.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-pomegranate",
        "category":  "Nursery",
        "name":  "Pomegranate Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1699,
        "image":  "/gardening-bonsai-pomegranate.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-premna",
        "category":  "Nursery",
        "name":  "Premna Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1999,
        "image":  "/gardening-bonsai-premna.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-rose",
        "category":  "Nursery",
        "name":  "Rose Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-rose.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-sapota",
        "category":  "Nursery",
        "name":  "Sapota Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-sapota.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-schefflera",
        "category":  "Nursery",
        "name":  "Schefflera Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  999,
        "image":  "/gardening-bonsai-schefflera.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-serissa",
        "category":  "Nursery",
        "name":  "Serissa Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-serissa.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-tamarind",
        "category":  "Nursery",
        "name":  "Tamarind Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1499,
        "image":  "/gardening-bonsai-tamarind.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "bonsai-wrightia",
        "category":  "Nursery",
        "name":  "Wrightia Bonsai",
        "duration":  "1 Plant",
        "option":  "Bonsai",
        "price":  1999,
        "image":  "/gardening-bonsai-wrightia.webp",
        "includes":  [
                         "Healthy bonsai",
                         "Training pot",
                         "Care guide"
                     ],
        "note":  "Shape and size vary naturally."
    },
    {
        "id":  "planter-ceramic",
        "category":  "Pots",
        "name":  "Ceramic Pot",
        "duration":  "1 Pot",
        "option":  "Pot",
        "price":  599,
        "image":  "/gardening-planter-ceramic.webp",
        "includes":  [
                         "Ceramic body",
                         "Drainage provision",
                         "Decorative finish"
                     ],
        "note":  "Plant is sold separately."
    },
    {
        "id":  "planter-fiber",
        "category":  "Pots",
        "name":  "Fiber Pot",
        "duration":  "1 Pot",
        "option":  "Pot",
        "price":  899,
        "image":  "/gardening-planter-fiber.webp",
        "includes":  [
                         "Lightweight body",
                         "Weather-resistant finish",
                         "Drainage provision"
                     ],
        "note":  "Plant is sold separately."
    },
    {
        "id":  "planter-hanging",
        "category":  "Pots",
        "name":  "Hanging Pot",
        "duration":  "1 Pot",
        "option":  "Pot",
        "price":  349,
        "image":  "/gardening-planter-hanging.webp",
        "includes":  [
                         "Hanging support",
                         "Drainage provision",
                         "Space-saving design"
                     ],
        "note":  "Plant is sold separately."
    },
    {
        "id":  "planter-self-watering",
        "category":  "Pots",
        "name":  "Self-Watering Pot",
        "duration":  "1 Pot",
        "option":  "Pot",
        "price":  399,
        "image":  "/gardening-planter-self-watering.webp",
        "includes":  [
                         "Water reservoir",
                         "Drainage control",
                         "Easy-care design"
                     ],
        "note":  "Plant is sold separately."
    },
    {
        "id":  "compost-cocopeat-block",
        "category":  "Compost",
        "name":  "Cocopeat Block",
        "duration":  "1 kg",
        "option":  "Compost",
        "price":  249,
        "image":  "/gardening-compost-cocopeat-block.webp",
        "includes":  [
                         "Low-weight growing medium",
                         "Moisture retention",
                         "Easy expansion"
                     ],
        "note":  "Follow the pack directions before use."
    },
    {
        "id":  "compost-neem-cake",
        "category":  "Compost",
        "name":  "Neem Cake",
        "duration":  "1 kg",
        "option":  "Compost",
        "price":  299,
        "image":  "/gardening-compost-neem-cake.webp",
        "includes":  [
                         "Organic soil input",
                         "Slow nutrient release",
                         "Plant-care support"
                     ],
        "note":  "Use in the recommended quantity."
    },
    {
        "id":  "compost-potting-mix",
        "category":  "Compost",
        "name":  "Potting Mix",
        "duration":  "5 kg",
        "option":  "Compost",
        "price":  349,
        "image":  "/gardening-compost-potting-mix.webp",
        "includes":  [
                         "Ready-to-use mix",
                         "Balanced texture",
                         "Suitable for pots"
                     ],
        "note":  "Pack size is shown on the card."
    },
    {
        "id":  "compost-vermicompost",
        "category":  "Compost",
        "name":  "Vermicompost",
        "duration":  "5 kg",
        "option":  "Compost",
        "price":  399,
        "image":  "/gardening-compost-vermicompost.webp",
        "includes":  [
                         "Organic nutrition",
                         "Soil-conditioning support",
                         "Ready to apply"
                     ],
        "note":  "Use in the recommended quantity."
    },
    {
        "id":  "decor-buddha-statue",
        "category":  "Garden Decor",
        "name":  "Buddha Garden Statue",
        "duration":  "1 Piece",
        "option":  "Garden Decor",
        "price":  999,
        "image":  "/gardening-decor-buddha-statue.webp",
        "includes":  [
                         "Decorative statue",
                         "Garden-ready finish",
                         "Compact placement"
                     ],
        "note":  "Exact shade may vary."
    },
    {
        "id":  "decor-pebbles",
        "category":  "Garden Decor",
        "name":  "Decorative Pebbles",
        "duration":  "5 kg",
        "option":  "Garden Decor",
        "price":  499,
        "image":  "/gardening-decor-pebbles.webp",
        "includes":  [
                         "Sorted pebbles",
                         "Landscape decoration",
                         "Indoor or outdoor use"
                     ],
        "note":  "Natural colour and shape may vary."
    },
    {
        "id":  "decor-solar-lights",
        "category":  "Garden Decor",
        "name":  "Solar Garden Lights",
        "duration":  "Set of 4",
        "option":  "Garden Decor",
        "price":  799,
        "image":  "/gardening-decor-solar-lights.webp",
        "includes":  [
                         "Solar charging",
                         "Outdoor placement",
                         "Warm garden accent"
                     ],
        "note":  "Sunlight exposure affects runtime."
    },
    {
        "id":  "decor-water-fountain",
        "category":  "Garden Decor",
        "name":  "Garden Water Fountain",
        "duration":  "1 Piece",
        "option":  "Garden Decor",
        "price":  2999,
        "image":  "/gardening-decor-water-fountain.webp",
        "includes":  [
                         "Decorative fountain",
                         "Recirculating water feature",
                         "Garden placement"
                     ],
        "note":  "Electrical point and installation are extra."
    }
] as const;

export const GARDENER_BOOKING_SERVICES:
  readonly GardeningService[] = RAW_GARDENING_SERVICES.map(
    (service) => ({
      ...service,
      priceLabel:
        "\u20B9" + service.price.toLocaleString("en-IN"),
    }),
  );