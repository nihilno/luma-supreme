import ShippingForm from "@/components/shipping/shipping-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shippig Address",
};

export default async function ShippingAddressPage() {
  return <ShippingForm />;
}
