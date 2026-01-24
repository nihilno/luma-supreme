import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

function Search() {
  return (
    <form
      action={"/search"}
      method="GET"
      className="hidden w-full max-w-[300px] gap-2 sm:flex md:max-w-md"
    >
      <div className="relative w-full">
        <Input
          placeholder="Search..."
          type="text"
          name="q"
          aria-label="Search"
          className="w-full rounded-xl"
        />
        <Button
          size="icon-sm"
          variant={"ghost"}
          className="absolute top-1/2 right-2 -translate-y-1/2"
          type="submit"
          aria-label="Submit search"
        >
          <IconSearch className="size-5" />
        </Button>
      </div>
    </form>
  );
}

export default Search;
