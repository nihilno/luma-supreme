import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-1" aria-label="Home">
      <Image
        src={"/logo.png"}
        alt="Luma"
        width={32}
        height={32}
        priority={true}
        unoptimized={true}
        className="dark:bg-primary rounded-xl p-0.5"
      />
      <h1 className="-translate-y-0.5 text-2xl">Luma</h1>
    </Link>
  );
}

export default Logo;
