import AdminProductForm from "@/components/admin/admin-product-form";

export default function NewProductPage() {
  const product = {
    id: "123",
    name: "...",
    slug: "...",
    category: "...",
    brand: "...",
    description: "...",
    stock: 10,
    images: [],
    isFeatured: true,
    banner: null,
    price: 99,
  };

  return <AdminProductForm type="Create" />;
}
