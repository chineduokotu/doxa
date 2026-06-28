"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react";
import { useProductsStore } from "@/lib/store/products";

const CATEGORIES = [
  { slug: "living-room", label: "Living Room" },
  { slug: "dining-room", label: "Dining Room" },
  { slug: "royal-sets", label: "Royal Sets" },
  { slug: "bedroom", label: "Bedroom" },
  { slug: "outdoor", label: "Outdoor" },
  { slug: "decor", label: "Décor" },
];

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    price: "",
    category: "living-room",
    customCategory: "",
    description: "",
    featured: false,
    rating: "4.5",
  });
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [useCustomCategory, setUseCustomCategory] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("doxa_admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchProductDetails();
  }, [id, router]);

  const fetchProductDetails = () => {
    setLoading(true);
    setError("");
    try {
      const store = useProductsStore.getState();
      const product = store.products.find(p => p.id === id);
      if (!product) throw new Error("Product not found");

      const isStandardCat = CATEGORIES.some(cat => cat.slug === product.category);

      setFormData({
        productId: product.slug || product.id || "",
        name: product.name || "",
        price: product.price?.toString() || "",
        category: isStandardCat ? product.category : "living-room",
        customCategory: isStandardCat ? "" : product.category || "",
        description: product.description || "",
        featured: product.isFeatured || false,
        rating: "4.5",
      });
      
      setUseCustomCategory(!isStandardCat);
      setExistingImages(product.images || []);
    } catch (err: any) {
      setError(err.message || "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewFiles((prev) => [...prev, ...selectedFiles].slice(0, 10));
    }
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const markImageForDeletion = (url: string) => {
    setImagesToDelete((prev) => [...prev, url]);
  };

  const cancelImageDeletion = (url: string) => {
    setImagesToDelete((prev) => prev.filter((p) => p !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    const token = localStorage.getItem("doxa_admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const remainingImagesCount = existingImages.length - imagesToDelete.length + newFiles.length;
    if (remainingImagesCount === 0) {
      setError("Products must have at least one image");
      setSubmitLoading(false);
      return;
    }

    try {
      const keptImages = existingImages.filter(img => !imagesToDelete.includes(img));

      // Read new files as base64
      const base64NewImages = await Promise.all(
        newFiles.map((file) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        }))
      );

      const finalImages = [...keptImages, ...base64NewImages];

      const store = useProductsStore.getState();
      await store.updateProduct(id, {
        name: formData.name.trim(),
        category: useCustomCategory ? formData.customCategory.trim() : formData.category,
        price: Number(formData.price),
        description: formData.description.trim(),
        images: finalImages,
        isFeatured: formData.featured,
      });

      alert("Product updated successfully!");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to update product");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-ink-200 p-8 lg:p-10 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-ink-100">
          <Link href="/admin">
            <button className="w-9 h-9 border border-ink-200 hover:bg-ink-50 flex items-center justify-center text-ink-500 hover:text-ink-950 transition-colors">
              <ChevronLeft size={16} />
            </button>
          </Link>
          <div>
            <span className="text-[#D4AF37] text-[0.55rem] tracking-[0.2em] uppercase font-sans font-semibold">
              Management Portal
            </span>
            <h1 className="font-serif text-2xl text-ink-950 font-light mt-0.5">
              Edit Product Details
            </h1>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-sans mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-ink-300 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-ink-400 font-sans text-sm">Loading product details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label" htmlFor="productId">
                  Product Slug / Key
                </label>
                <input
                  id="productId"
                  name="productId"
                  type="text"
                  required
                  disabled
                  value={formData.productId}
                  className="form-control bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="name">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Walnut Dining Table"
                  className="form-control"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label" htmlFor="price">
                  Base Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 15000"
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="rating">
                  Product Rating
                </label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  disabled
                  value={formData.rating}
                  className="form-control bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Category layout */}
            <div className="border-t border-ink-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="form-label mb-0">Category</label>
                <button
                  type="button"
                  onClick={() => setUseCustomCategory(!useCustomCategory)}
                  className="text-[0.6rem] font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-[#AA7700]"
                >
                  {useCustomCategory ? "Select Standard" : "Enter Custom"}
                </button>
              </div>

              {useCustomCategory ? (
                <input
                  name="customCategory"
                  type="text"
                  required
                  value={formData.customCategory}
                  onChange={handleInputChange}
                  placeholder="e.g. Smart Lighting"
                  className="form-control"
                />
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="form-label" htmlFor="description">
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of materials, sizes, and craftsmanship..."
                className="form-control h-32"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#D4AF37] border-ink-300 rounded focus:ring-[#D4AF37]"
              />
              <label htmlFor="featured" className="font-sans text-xs text-ink-950 font-semibold uppercase tracking-wider select-none cursor-pointer">
                Feature this product on homepage list
              </label>
            </div>

            {/* Existing Images section */}
            {existingImages.length > 0 && (
              <div className="border-t border-ink-100 pt-5">
                <label className="form-label mb-3">Current Images</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {existingImages.map((img, i) => {
                    const isMarked = imagesToDelete.includes(img);
                    return (
                      <div
                        key={i}
                        className={`relative aspect-[3/4] border overflow-hidden group transition-all duration-200 ${
                          isMarked ? "border-red-500 opacity-40 grayscale" : "border-ink-200"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="Product detail"
                          fill
                          className="object-cover"
                        />
                        {isMarked ? (
                          <button
                            type="button"
                            onClick={() => cancelImageDeletion(img)}
                            className="absolute inset-0 bg-red-950/20 text-white font-sans text-[10px] font-semibold tracking-wider uppercase flex items-center justify-center transition-colors"
                          >
                            Keep Image
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => markImageForDeletion(img)}
                            className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-red-600 text-white flex items-center justify-center rounded-full transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                            title="Delete this image"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* New Images Upload section */}
            <div className="border-t border-ink-100 pt-5">
              <label className="form-label mb-3">Add New Images</label>
              
              <div className="border-2 border-dashed border-ink-200 p-6 text-center hover:border-ink-400 transition-colors cursor-pointer relative bg-ink-50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto text-ink-400 mb-2" size={24} />
                <p className="font-sans text-xs text-ink-950 font-semibold uppercase tracking-wider">
                  Click or Drag new files to upload
                </p>
                <p className="font-sans text-[10px] text-ink-400 mt-1">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </div>

              {newFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                  {newFiles.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div key={index} className="relative aspect-[3/4] bg-ink-100 border border-ink-200 overflow-hidden group">
                        <Image
                          src={url}
                          alt={`New Preview ${index}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewFile(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black text-white flex items-center justify-center rounded-full transition-colors"
                        >
                          <X size={12} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[8px] text-white truncate text-center">
                          {file.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-ink-100 flex justify-end gap-3">
              <Link href="/admin">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="solid"
                size="lg"
                disabled={submitLoading}
                className="px-10"
              >
                {submitLoading ? (
                  <>
                    <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    Save Product <ChevronRight size={14} />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
