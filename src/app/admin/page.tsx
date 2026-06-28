"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Database, 
  LogOut, 
  ShieldCheck,
  Eye
} from "lucide-react";
import { useProductsStore } from "@/lib/store/products";

export default function AdminDashboard() {
  const { products, loading, error, fetchProducts, deleteProduct, resetToDefault } = useProductsStore();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("doxa_admin_token");
    const adminUser = localStorage.getItem("doxa_admin_user");
    
    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }

    fetchProducts();
  }, [router, fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("doxa_admin_token");
    localStorage.removeItem("doxa_admin_user");
    router.push("/admin/login");
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setActionLoading(true);
    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to reset and seed the database? This will restore default products.")) return;

    setActionLoading(true);
    try {
      resetToDefault();
      alert("Database seeded successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to seed database");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Panel */}
        <div className="bg-white border border-ink-200 p-6 lg:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={18} className="text-[#D4AF37]" />
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-sans text-ink-400 font-semibold">
                Admin Console
              </span>
            </div>
            <h1 className="font-serif text-3xl text-ink-950 font-light tracking-wide">
              Product Management
            </h1>
            {user && (
              <p className="text-ink-400 text-xs font-sans mt-1">
                Logged in as: <span className="text-ink-950 font-semibold">{user.username}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/new">
              <Button variant="solid" size="sm" className="flex items-center gap-2">
                <Plus size={14} /> Add Product
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={actionLoading}
              className="flex items-center gap-2"
            >
              <Database size={14} /> Seed Database
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={14} /> Log Out
            </Button>
          </div>
        </div>

        {/* Dashboard Stats summary */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-ink-200/80 p-5 shadow-sm">
              <p className="text-[0.6rem] tracking-wider uppercase font-sans text-ink-400 font-medium">Total Products</p>
              <h2 className="font-serif text-3xl font-light text-ink-950 mt-1">{products.length}</h2>
            </div>
            <div className="bg-white border border-ink-200/80 p-5 shadow-sm">
              <p className="text-[0.6rem] tracking-wider uppercase font-sans text-ink-400 font-medium">Featured Items</p>
              <h2 className="font-serif text-3xl font-light text-[#D4AF37] mt-1">
                {products.filter(p => p.isFeatured).length}
              </h2>
            </div>
            <div className="bg-white border border-ink-200/80 p-5 shadow-sm">
              <p className="text-[0.6rem] tracking-wider uppercase font-sans text-ink-400 font-medium">Categories count</p>
              <h2 className="font-serif text-3xl font-light text-ink-950 mt-1">
                {new Set(products.map(p => p.category)).size}
              </h2>
            </div>
          </div>
        )}

        {/* Catalog Table */}
        <div className="bg-white border border-ink-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-2 border-ink-300 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-ink-400 font-sans text-sm">Loading catalog details...</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center px-6">
              <p className="text-red-600 font-serif text-xl mb-4">Error Loading Catalog</p>
              <p className="text-ink-500 font-sans text-sm mb-6 max-w-md mx-auto">{error}</p>
              <Button onClick={() => fetchProducts(true)} variant="outline" size="sm">
                Retry Connection
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center px-6">
              <p className="font-serif text-2xl text-ink-400 font-light mb-3">No products in database</p>
              <p className="text-ink-400 font-sans text-sm mb-8">Seed the database or add your first product to get started.</p>
              <Link href="/admin/new">
                <Button variant="solid" size="sm">
                  Add First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-sm text-ink-950">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-[0.65rem] tracking-wider uppercase font-semibold text-ink-500 select-none">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Slug</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Featured</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-ink-100/30 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div className="relative w-12 h-16 bg-ink-100 border border-ink-200 overflow-hidden shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full bg-ink-200 flex items-center justify-center text-[10px] text-ink-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <span className="font-serif text-[1rem] font-light truncate max-w-xs block">
                          {product.name}
                        </span>
                      </td>

                      {/* Product Slug */}
                      <td className="py-4 px-6 font-mono text-xs text-ink-500">
                        {product.slug}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 font-medium text-xs tracking-wider uppercase text-ink-500">
                        {product.category}
                      </td>

                      {/* Featured */}
                      <td className="py-4 px-6">
                        {product.isFeatured ? (
                          <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold bg-[#D4AF37]/10 text-[#D4AF37] rounded-full">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-ink-100 text-ink-400 rounded-full">
                            Standard
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        {/* View Product Details */}
                        <Link href={`/product/${product.slug}`} target="_blank" title="View details page">
                          <button className="w-8 h-8 rounded-full border border-ink-200 hover:bg-ink-50 text-ink-500 hover:text-ink-950 inline-flex items-center justify-center transition-colors">
                            <Eye size={14} />
                          </button>
                        </Link>
                        
                        {/* Edit Product */}
                        <Link href={`/admin/edit/${product.id}`} title="Edit product">
                          <button className="w-8 h-8 rounded-full border border-ink-200 hover:bg-ink-50 text-ink-500 hover:text-ink-950 inline-flex items-center justify-center transition-colors">
                            <Edit3 size={14} />
                          </button>
                        </Link>

                        {/* Delete Product */}
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={actionLoading}
                          title="Delete product"
                          className="w-8 h-8 rounded-full border border-red-200 hover:bg-red-50 text-red-500 hover:text-red-700 inline-flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
