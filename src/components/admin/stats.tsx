import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

function Stats() {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="grid place-items-center border-b border-dashed">
          Total Revenuse
        </CardHeader>
        <CardContent>123123</CardContent>
      </Card>
      <Card>
        <CardHeader className="grid place-items-center border-b border-dashed py-0">
          Sales
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>123123</CardContent>
      </Card>
      <Card>
        <CardHeader className="grid place-items-center border-b border-dashed py-0">
          Customers
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>123123</CardContent>
      </Card>
      <Card>
        <CardHeader className="grid place-items-center border-b border-dashed py-0">
          Products
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>123123</CardContent>
      </Card>
    </div>
  );
}

export default Stats;
