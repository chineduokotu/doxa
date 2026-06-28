export type Category =
  | "living-room"
  | "dining-room"
  | "royal-sets"
  | "bedroom"
  | "outdoor"
  | "decor"
  | string;

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const categories: CategoryMeta[] = [
  {
    slug: "living-room",
    label: "Living Room",
    description: "Sofas, sectionals & coffee tables for refined living",
    image: "/images/dox7.jpeg",
    featured: true,
  },
  {
    slug: "dining-room",
    label: "Dining Room",
    description: "Dining sets crafted for memorable gatherings",
    image: "/images/dox4.jpeg",
    featured: true,
  },
  {
    slug: "royal-sets",
    label: "Royal Sets",
    description: "Complete collections for a palatial interior",
    image: "/images/dox6.jpeg",
    featured: true,
  },
  {
    slug: "bedroom",
    label: "Bedroom",
    description: "Beds, wardrobes & dressers for restful luxury",
    image: "/images/dox10.jpeg",
    featured: false,
  },
  {
    slug: "outdoor",
    label: "Outdoor",
    description: "Premium outdoor furniture for Nigerian climates",
    image: "/images/dox3.jpeg",
    featured: false,
  },
  {
    slug: "decor",
    label: "Décor",
    description: "Finishing touches — rugs, lighting & accessories",
    image: "/images/dox8.jpeg",
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
