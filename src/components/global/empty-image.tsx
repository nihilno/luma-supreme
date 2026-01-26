import { IconFileUnknown } from "@tabler/icons-react";

function EmptyImage() {
  return (
    <div className="bg-muted/90 flex aspect-square flex-col items-center justify-center gap-4">
      <IconFileUnknown className="size-12 opacity-50" />
      <h4 className="text-center opacity-50">
        There is no image present <br /> for this product.
      </h4>
    </div>
  );
}

export default EmptyImage;
