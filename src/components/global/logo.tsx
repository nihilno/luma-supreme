import Image from "next/image";
import Link from "next/link";

function Logo({ withTitle = false }: { withTitle?: boolean }) {
  return (
    <Link
      href={"/"}
      className="flex shrink-0 items-center gap-1"
      aria-label="Home"
    >
      <Image
        src={"/logo.svg"}
        alt="Luma"
        width={32}
        height={32}
        priority={true}
        unoptimized={true}
        className="dark:bg-primary rounded-xl p-0.5 opacity-90"
      />
      {withTitle && (
        <h1 className="hidden -translate-y-0.5 text-2xl sm:block">Luma</h1>
      )}
    </Link>
  );
}

export default Logo;
