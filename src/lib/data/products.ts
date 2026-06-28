import type { Category } from "./categories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  details: string[];
  material: string;
  finish: string;
  dimensions?: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "walnut-dining-table-set",
    name: "Obasi Walnut Dining Table Set",
    shortName: "Obasi Dining Set",
    category: "dining-room",
    price: 1850000,
    images: ["/images/dox1.jpeg"],
    description:
      "The Obasi dining set is a masterclass in understated luxury. A beautifully grained solid walnut tabletop sits on tapered wooden legs, surrounded by cloud-soft cream bouclé chairs that invite long, leisurely meals.",
    details: [
      "Solid walnut wood tabletop",
      "Seats 6–8 guests comfortably",
      "Cream bouclé upholstered dining chairs",
      "Tapered solid wood legs",
      "Easy-clean surface treatment",
    ],
    material: "Solid Walnut, Bouclé Fabric",
    finish: "Natural Oil",
    dimensions: "200cm × 100cm × 76cm",
    inStock: true,
    isNew: true,
    isFeatured: true,
    badge: "New Arrival",
  },
  {
    id: "prod-002",
    slug: "black-slate-dining-set",
    name: "Ade Black Slate Dining Set",
    shortName: "Ade Dining Set",
    category: "dining-room",
    price: 1450000,
    images: ["/images/dox2.jpeg"],
    description:
      "Bold, dramatic and distinctly modern — the Ade dining set pairs a matte black sintered stone tabletop with sculptural white tulip chairs. The perfect statement for a contemporary Lagos home.",
    details: [
      "Matte black sintered stone surface",
      "Seats 4–6 guests",
      "White sculptural tulip-style dining chairs",
      "Powder-coated steel frame",
      "Heat and scratch resistant top",
    ],
    material: "Sintered Stone, Steel",
    finish: "Matte Black",
    dimensions: "160cm × 90cm × 75cm",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "prod-003",
    slug: "grey-l-shape-sectional",
    name: "Ekene Grey L-Shape Sectional",
    shortName: "Ekene Sectional",
    category: "living-room",
    price: 2250000,
    originalPrice: 2600000,
    images: ["/images/dox3.jpeg"],
    description:
      "Generous, grid-tufted and supremely comfortable, the Ekene sectional redefines the living room as a destination. Available in deep charcoal grey with matching cushions and an optional chaise extension.",
    details: [
      "Deep-tufted grid fabric upholstery",
      "L-shape with optional chaise",
      "High-density foam cushioning",
      "Solid hardwood internal frame",
      "Stain-resistant fabric treatment",
    ],
    material: "Boucle Fabric, Hardwood Frame",
    finish: "Charcoal Grey",
    dimensions: "320cm × 220cm × 85cm",
    inStock: true,
    isFeatured: true,
    badge: "Sale",
  },
  {
    id: "prod-004",
    slug: "marble-dining-table-set",
    name: "Chukwu Marble Dining Table",
    shortName: "Chukwu Marble Set",
    category: "dining-room",
    price: 2100000,
    images: ["/images/dox4.jpeg"],
    description:
      "A single slab of Calacatta marble makes every dinner feel like a special occasion. The Chukwu table is paired with sleek grey leatherette dining chairs on matte black legs — effortlessly refined.",
    details: [
      "Full Calacatta marble tabletop",
      "Seats 8 guests",
      "Grey leatherette dining chairs",
      "Matte black powder-coated legs",
      "Marble sealed and polished",
    ],
    material: "Calacatta Marble, Leatherette",
    finish: "Polished Marble / Matte Black",
    dimensions: "220cm × 105cm × 76cm",
    inStock: true,
    isFeatured: true,
    isNew: true,
    badge: "Premium",
  },
  {
    id: "prod-005",
    slug: "beige-sofa-marble-coffee-table-set",
    name: "Emeka Living Room Set",
    shortName: "Emeka Set",
    category: "living-room",
    price: 1950000,
    images: ["/images/dox5.jpeg"],
    description:
      "The Emeka set is warmth embodied. A generous beige boucle sofa with rolling back pillows, paired with a marble and gold coffee table that adds a glamorous focal point to any living room.",
    details: [
      "Beige textured boucle upholstery",
      "Rolled bolster back cushions",
      "Includes marble-top coffee table",
      "Gold-finish steel coffee table base",
      "Solid oak tapered sofa legs",
    ],
    material: "Bouclé, Marble, Gold Steel",
    finish: "Natural / Antique Gold",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "prod-006",
    slug: "white-gold-dining-set-royal",
    name: "Royale White & Gold Dining Set",
    shortName: "Royale Dining Set",
    category: "royal-sets",
    price: 2800000,
    images: ["/images/dox6.jpeg"],
    description:
      "Our most opulent dining collection. A gleaming white lacquer tabletop with champagne gold edge detailing, surrounded by button-tufted velvet dining chairs on brushed gold legs. A set worthy of royalty.",
    details: [
      "White lacquered glass table top",
      "Champagne gold edging and base",
      "Seats 8 in brushed gold chairs",
      "Button-tufted grey velvet chairs",
      "Includes decorative candelabra centrepiece",
    ],
    material: "Lacquered Glass, Gold-Plated Steel, Velvet",
    finish: "Gloss White / Champagne Gold",
    dimensions: "220cm × 110cm × 78cm",
    inStock: true,
    isFeatured: true,
    isNew: true,
    badge: "Royal Collection",
  },
  {
    id: "prod-007",
    slug: "grey-modular-sectional-sofa",
    name: "Nnamdi Modular Sectional",
    shortName: "Nnamdi Sectional",
    category: "living-room",
    price: 2650000,
    images: ["/images/dox7.jpeg"],
    description:
      "Expansive, modular and designed for extended families. The Nnamdi sectional wraps around the room in rich mid-grey, with a built-in side console and stone-top round coffee table included.",
    details: [
      "6-piece modular configuration",
      "Built-in side console tray",
      "Includes round stone-top coffee table",
      "Deep-seat low-profile design",
      "Grade-A upholstery fabric",
    ],
    material: "Premium Fabric, Stone, Steel",
    finish: "Mid-Grey / Dark Steel",
    dimensions: "420cm × 300cm (U-shape)",
    inStock: true,
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "prod-008",
    slug: "marble-gold-coffee-table-aerial",
    name: "Ife Marble & Gold Coffee Table",
    shortName: "Ife Coffee Table",
    category: "living-room",
    price: 680000,
    images: ["/images/dox8.jpeg", "/images/dox9.jpeg"],
    description:
      "A luxurious focal point for any living room — the Ife coffee table features a stunning Calacatta marble top mounted on an architectural gold-plated steel frame with chain link detail.",
    details: [
      "Calacatta marble tabletop",
      "Gold-plated welded steel base",
      "Architectural chain-link design element",
      "Anti-tip weighted base",
      "Available in two sizes",
    ],
    material: "Calacatta Marble, Gold-Plated Steel",
    finish: "Polished / Antique Gold",
    dimensions: "120cm × 60cm × 40cm",
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prod-009",
    slug: "ivory-linen-sofa",
    name: "Amara Ivory Linen Sofa",
    shortName: "Amara Sofa",
    category: "living-room",
    price: 1100000,
    images: ["/images/dox10.jpeg"],
    description:
      "Pure, calm and timeless — the Amara sofa in ivory linen is the ultimate neutral anchor for any curated interior. Wide seats, thin arms, and contrasting terracotta and slate cushions make it effortlessly styled.",
    details: [
      "Premium ivory linen upholstery",
      "Contrasting cushion set included",
      "Low-profile slim-arm silhouette",
      "Solid kiln-dried hardwood frame",
      "Cushion covers are removable and washable",
    ],
    material: "Linen, Velvet Cushions, Hardwood",
    finish: "Ivory / Natural",
    dimensions: "230cm × 95cm × 80cm",
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "prod-010",
    slug: "marble-gold-coffee-table-front",
    name: "Ife Coffee Table — Grand",
    shortName: "Ife Grand Coffee Table",
    category: "living-room",
    price: 820000,
    images: ["/images/dox9.jpeg", "/images/dox8.jpeg"],
    description:
      "The larger-format Ife Grand is a showstopping centrepiece. The same signature Calacatta-and-gold construction, scaled up for expansive living spaces and sectional sofas.",
    details: [
      "Extra-large Calacatta marble top",
      "Gold-plated chain-link base",
      "Pairs perfectly with Emeka or Nnamdi sets",
      "Anti-scratch protective pads",
      "Handcrafted in limited quantities",
    ],
    material: "Calacatta Marble, Gold-Plated Steel",
    finish: "Polished / Antique Gold",
    dimensions: "150cm × 80cm × 42cm",
    inStock: true,
    isFeatured: false,
  },
  {
    id: "prod-011",
    slug: "royal-tufted-king-bed",
    name: "Bespoke Royal Tufted Bed Frame",
    shortName: "Royale Bed Frame",
    category: "bedroom",
    price: 3400000,
    images: ["/images/dox11.jpeg"],
    description: "An elegant, extra-large wingback bed upholstered in premium cream velvet, featuring deep button tufting and detailed champagne gold trim.",
    details: [
      "Plush button-tufted headboard",
      "Sturdy solid wood internal frame",
      "Reinforced steel support joints",
      "Premium stain-resistant velvet fabric",
      "Mattress not included"
    ],
    material: "Velvet, Hardwood, Steel",
    finish: "Cream Velvet / Gold Trim",
    dimensions: "220cm × 240cm × 150cm",
    inStock: true,
    isNew: true,
    isFeatured: true,
    badge: "Royal Bedroom"
  },
  {
    id: "prod-012",
    slug: "leather-lounge-armchair",
    name: "Luxe Leather Lounge Armchair",
    shortName: "Luxe Armchair",
    category: "living-room",
    price: 750000,
    images: ["/images/dox12.jpeg"],
    description: "A mid-century modern lounge chair wrapped in hand-finished tan aniline leather, sitting on sleek black walnut legs.",
    details: [
      "Genuine aniline leather upholstery",
      "High-density ergonomic padding",
      "Solid walnut frame and legs",
      "Hand-stitched leather panels",
      "Contoured lumbar support cushion"
    ],
    material: "Aniline Leather, Black Walnut",
    finish: "Tan / Matte Walnut",
    dimensions: "85cm × 90cm × 95cm",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-013",
    slug: "modernist-marble-console",
    name: "Modernist Marble Console Table",
    shortName: "Modernist Console",
    category: "living-room",
    price: 980000,
    images: ["/images/dox13.jpeg"],
    description: "Make an entry statement. A heavy slab of polished Calacatta marble mounted on a clean, geometric brushed gold steel frame.",
    details: [
      "Polished Calacatta marble top",
      "Brushed gold stainless steel frame",
      "Slim profile ideal for entryways",
      "Includes floor protection pads",
      "Easy-clean finish"
    ],
    material: "Calacatta Marble, Stainless Steel",
    finish: "Polished White / Brushed Gold",
    dimensions: "140cm × 40cm × 80cm",
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: "prod-014",
    slug: "imperial-velvet-sofa-set",
    name: "Imperial Royale Velvet Sofa",
    shortName: "Imperial Sofa",
    category: "royal-sets",
    price: 4500000,
    images: ["/images/dox14.jpeg"],
    description: "Draped in rich emerald green velvet, the Imperial Royale features handcrafted gold leaf accent panels and deep scrollwork details.",
    details: [
      "Handcrafted solid wood scrollwork",
      "Genuine gold leaf application",
      "Deep emerald green luxury velvet",
      "Includes matching silk accent cushions",
      "Plush high-density down-blend padding"
    ],
    material: "Velvet, Solid Beechwood, Gold Leaf",
    finish: "Emerald Green / Gold Leaf",
    dimensions: "260cm × 100cm × 90cm",
    inStock: true,
    isFeatured: true,
    badge: "Imperial Collection"
  },
  {
    id: "prod-015",
    slug: "teak-outdoor-sofa",
    name: "Lagos Teak Outdoor Sofa",
    shortName: "Teak Outdoor Sofa",
    category: "outdoor",
    price: 1800000,
    images: ["/images/dox15.jpeg"],
    description: "Premium Grade-A teak wood constructed sofa featuring quick-dry white canvas cushions, perfect for coastal climates.",
    details: [
      "Natural weather-resistant Grade-A teak",
      "Quick-dry outdoor foam padding",
      "Water-repellent white canvas fabric",
      "Marine-grade stainless steel joints",
      "Seats 3 adults comfortably"
    ],
    material: "Grade-A Teak, Outdoor Canvas",
    finish: "Natural Teak / Pure White",
    dimensions: "220cm × 90cm × 78cm",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-016",
    slug: "brass-welded-coffee-table",
    name: "Artisanal Brass Coffee Table Set",
    shortName: "Brass Coffee Table",
    category: "living-room",
    price: 720000,
    images: ["/images/dox16.jpeg"],
    description: "A nesting set of two circular coffee tables featuring hammered antiqued brass tops and matte black structural frames.",
    details: [
      "Antique brass hammered surface",
      "Set of two nesting circular tables",
      "Matte black welded steel frames",
      "Versatile configuration options",
      "Handcrafted by local artisans"
    ],
    material: "Brass, Steel",
    finish: "Antiqued Brass / Matte Black",
    dimensions: "Large: 90cm dia, Small: 70cm dia",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-017",
    slug: "walnut-master-wardrobe",
    name: "Minimalist Walnut Master Wardrobe",
    shortName: "Walnut Wardrobe",
    category: "bedroom",
    price: 2900000,
    images: ["/images/dox17.jpeg"],
    description: "Expansive three-section master wardrobe with soft-closing sliding doors, integrated LED lighting, and velvet-lined jewelry drawers.",
    details: [
      "Premium walnut veneer panels",
      "Soft-closing sliding glass track system",
      "Motion-activated internal LED strips",
      "Velvet-lined jewelry compartments",
      "Built-in trouser rack and shoe shelves"
    ],
    material: "Walnut Wood, Tinted Glass, Velvet",
    finish: "Natural Walnut / Smoky Glass",
    dimensions: "240cm × 65cm × 220cm",
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: "prod-018",
    slug: "black-lacquer-dining-set",
    name: "Zen Black Lacquer Dining Set",
    shortName: "Zen Dining Set",
    category: "dining-room",
    price: 2150000,
    images: ["/images/dox18.jpeg"],
    description: "A striking minimalist table in deep black piano lacquer finish, paired with low-profile chairs in structured off-white linen.",
    details: [
      "High-gloss black piano lacquer surface",
      "Seats 6 guests",
      "Structured off-white linen chairs",
      "Solid beechwood legs",
      "Includes protective heat pads"
    ],
    material: "Beechwood, Linen Upholstery",
    finish: "Gloss Piano Black / Off-White",
    dimensions: "180cm × 90cm × 76cm",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-019",
    slug: "premium-wool-tufted-rug",
    name: "Amaka Woolen Tufted Rug",
    shortName: "Amaka Rug",
    category: "decor",
    price: 450000,
    images: ["/images/dox19.jpeg"],
    description: "Thick, luxurious, and hand-tufted from 100% New Zealand wool, featuring an organic abstract pattern in soft sand and charcoal tones.",
    details: [
      "100% New Zealand pure wool",
      "Hand-tufted dense pile height (15mm)",
      "Organic abstract luxury pattern",
      "Stain-resistant wool fibers",
      "Anti-slip cotton backing"
    ],
    material: "100% New Zealand Wool",
    finish: "Sand / Charcoal Abstract",
    dimensions: "250cm × 350cm",
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: "prod-020",
    slug: "gold-crystal-chandelier",
    name: "Royale Gold Crystal Chandelier",
    shortName: "Crystal Chandelier",
    category: "decor",
    price: 1350000,
    images: ["/images/dox20.jpeg"],
    description: "A multi-tier luxury chandelier dripping in K9 crystal drops, suspended from an ornate 24k gold-plated steel frame.",
    details: [
      "Premium K9 clear cut crystal drops",
      "24k gold-plated steel frame",
      "12 light bulb sockets (E14)",
      "Adjustable gold chain suspension",
      "Dimmable controller compatible"
    ],
    material: "K9 Crystal, Gold-Plated Steel",
    finish: "Clear Crystal / Polished Gold",
    dimensions: "80cm diameter × 110cm height",
    inStock: true,
    isFeatured: true,
    badge: "Royal Decor"
  }
];

/** Get all products */
export function getAllProducts(): Product[] {
  return products;
}

/** Get product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products by category */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get featured products */
export function getFeaturedProducts(limit = 6): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

/** Get new arrivals */
export function getNewArrivals(limit = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

/** Search products */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.material.toLowerCase().includes(q)
  );
}

/** Get related products (same category, excluding current) */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}

// Map MongoDB document returned by API to frontend Product structure
export function mapRemoteProduct(p: any): Product {
  const nameSlug = p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = nameSlug || p._id;

  return {
    id: p._id,
    slug: slug,
    name: p.name,
    shortName: p.name,
    category: p.category.toLowerCase().replace(/\s+/g, "-"),
    price: p.price,
    images: p.images && p.images.length > 0 ? p.images.map((img: any) => img.url) : ["/images/placeholder.jpg"],
    description: p.description || "",
    details: [
      p.description || "Premium quality craftsmanship",
      "Robust materials designed for longevity",
      "Bespoke aesthetic and premium build"
    ],
    material: "Premium Materials",
    finish: "Handcrafted Finish",
    inStock: true,
    isFeatured: p.featured || false,
    isNew: p.createdAt ? new Date(p.createdAt).getTime() > Date.now() - 60 * 24 * 60 * 60 * 1000 : false
  };
}

export async function getRemoteProducts(): Promise<Product[]> {
  // Pure frontend: return static list directly without calling backend APIs
  return products;
}

export async function getRemoteProductByIdOrSlug(idOrSlug: string): Promise<Product | undefined> {
  // Pure frontend: find product in local static products array
  return products.find(p => p.slug === idOrSlug || p.id === idOrSlug);
}

export async function getRemoteRelatedProducts(category: string, currentId: string, limit = 4): Promise<Product[]> {
  // Pure frontend: return filtered local static products directly
  return products
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, limit);
}

