export interface GalleryItem {
  id: string;
  title: string;
  category: "living-room" | "dining-room" | "royal-sets" | "bedroom" | "outdoor" | "decor";
  mediaType: "image" | "video";
  url: string;
  description: string;
}

const categories = ["living-room", "dining-room", "royal-sets", "bedroom", "outdoor", "decor"] as const;

// Helper to generate image items
const images: GalleryItem[] = Array.from({ length: 43 }, (_, i) => {
  const index = i + 11; // dox11 to dox53
  const catIndex = i % categories.length;
  const category = categories[catIndex];
  
  // Custom titles for categories
  let title = `Premium Piece - View ${index}`;
  let description = "Exquisitely crafted furniture matching high-end standards.";
  
  if (category === "living-room") {
    title = `Luxury Sofa Setup - Dox ${index}`;
    description = "Hand-upholstered comfort designed to anchor modern Nigerian living rooms.";
  } else if (category === "dining-room") {
    title = `Elegant Dining Detail - Dox ${index}`;
    description = "Precious marble and solid wood crafting designed for memorable gatherings.";
  } else if (category === "royal-sets") {
    title = `Royale Collection Detail - Dox ${index}`;
    description = "Opulent gold trimmings and rich tufted velvet for palatial spaces.";
  } else if (category === "bedroom") {
    title = `Bespoke Wardrobe Detail - Dox ${index}`;
    description = "Restful luxury and robust internal storage panels.";
  } else if (category === "outdoor") {
    title = `Premium Outdoor Accent - Dox ${index}`;
    description = "Weather-resistant, premium-treated structural pieces.";
  } else if (category === "decor") {
    title = `Aesthetic Décor Accessory - Dox ${index}`;
    description = "The finishing touches — luxury rugs, lighting, and accessories.";
  }

  return {
    id: `gal-img-${index}`,
    title,
    category,
    mediaType: "image",
    url: `/images/dox${index}.jpeg`,
    description
  };
});

// Helper to generate video items
const videos: GalleryItem[] = Array.from({ length: 8 }, (_, i) => {
  const index = i + 1; // dox_video1 to dox_video8
  const catIndex = i % categories.length;
  const category = categories[catIndex];
  
  let title = `Showcase Video - Showcase ${index}`;
  let description = "A cinematic look at the detailing and design of our furniture.";
  
  if (category === "living-room") {
    title = "Modular Sofa Showcase Video";
    description = "Take an editorial walk around our deep-cushioned modular sectionals.";
  } else if (category === "dining-room") {
    title = "Sintered Dining Set Video";
    description = "Cinematic video showing marble reflections and scratch-resistant finishing.";
  } else if (category === "royal-sets") {
    title = "Royale Palatial Collection Video";
    description = "Gold-plated frames and button-tufted craftsmanship up close.";
  } else if (category === "bedroom") {
    title = "Bespoke Bed Frames Video";
    description = "A video guide showing high-density headboard styling and storage drawers.";
  } else if (category === "outdoor") {
    title = "Nigerian Climate Treated Loungers Video";
    description = "Testing materials for heat resistance and premium finishes.";
  } else if (category === "decor") {
    title = "Interior Lighting Setup Video";
    description = "Luminous crystal details and warm gold glow showcase video.";
  }

  return {
    id: `gal-vid-${index}`,
    title,
    category,
    mediaType: "video",
    url: `/images/dox_video${index}.mp4`,
    description
  };
});

// Combine both lists
export const galleryItems: GalleryItem[] = [...videos, ...images];
