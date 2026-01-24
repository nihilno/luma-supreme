import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/data/products";
import { IconCategory } from "@tabler/icons-react";
import Link from "next/link";

async function CategoriesDrawer() {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant={"outline"} size="icon-sm" title="Categories">
          <IconCategory className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader className="border-b border-dashed">
          <DrawerTitle>Select Category</DrawerTitle>
        </DrawerHeader>
        <div className="mt-8 space-y-2 px-6">
          {categories.map((c) => (
            <Button
              className="w-full justify-start"
              key={c.category}
              asChild
              variant="ghost"
            >
              <DrawerClose asChild>
                <Link href={`/search?category=${c.category}`}>
                  {c.category} ({c._count})
                </Link>
              </DrawerClose>
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CategoriesDrawer;
