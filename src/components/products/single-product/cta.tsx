import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, toGBP } from "@/lib/utils";
import { IconCirclePlusFilled } from "@tabler/icons-react";

function Cta({ price, stock }: CtaProps) {
  return (
    <Card
      className={cn(
        stock === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        "group hover:bg-muted/60 mx-auto max-w-lg transition sm:mx-0",
      )}
    >
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h4>Price</h4>
          {toGBP(price)}
        </div>
        <div className="flex items-center justify-between">
          <h4>Status</h4>
          <Badge variant={stock === 0 ? "destructive" : "default"}>
            {stock === 0 ? "Out of Stock" : "In Stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-4 border-t border-dashed">
        <Button className={cn("w-full", stock === 0 && "cursor-not-allowed!")}>
          <IconCirclePlusFilled className="translate-y-px" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Cta;
