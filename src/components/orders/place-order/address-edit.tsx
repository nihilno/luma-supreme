import EditButton from "@/components/buttons/edit";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { shippingType } from "@/lib/schemas/shipping-address";
import { IconMapPins } from "@tabler/icons-react";

function AddressEdit({
  address,
  readOnly = false,
}: {
  address: shippingType;
  readOnly?: boolean;
}) {
  const { fullName, streetAddress, city, postalCode, country } = address;

  return (
    <Card className="relative h-full overflow-hidden">
      <CardHeader className="text-xl font-bold">Shipping Address</CardHeader>
      <CardContent>
        <p>{fullName}</p>
        <span>{streetAddress}, </span>
        <span>{city}, </span>
        <span>{postalCode}, </span>
        <span>{country}</span>
      </CardContent>
      <CardFooter className="mt-auto">
        {readOnly ? (
          <Badge variant={"destructive"} className="text-sm">
            Not Delivered
          </Badge>
        ) : (
          <EditButton href="/shipping-address" />
        )}
      </CardFooter>
      <IconMapPins className="absolute right-0 bottom-0 size-96 overflow-hidden opacity-4" />
    </Card>
  );
}

export default AddressEdit;
