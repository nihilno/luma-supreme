import AdminProductForm from "@/components/admin/admin-product-form";
import { getProductById } from "@/lib/data/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit product",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return <AdminProductForm type="Update" product={product} productId={id} />;
}
