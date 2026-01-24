import AdminProductForm from "@/components/admin/admin-product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new product",
};

export default function NewProductPage() {
  return <AdminProductForm type="Create" />;
}
