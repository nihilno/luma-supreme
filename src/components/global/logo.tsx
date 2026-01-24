import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className="flex shrink-0 items-center gap-2"
      aria-label="Home"
    >
      <Image
        src={"/logo.svg"}
        alt="Luma"
        width={32}
        height={32}
        sizes="32px"
        priority
        quality={25}
        className="dark:bg-primary rounded-xl p-0.5 opacity-90"
      />
    </Link>
  );
}

export default Logo;
