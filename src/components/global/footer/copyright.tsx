import Link from "next/link";

function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 flex flex-col items-center space-y-3 lg:col-span-2">
      <h6 className="hover:text-foreground/80 text-foreground/60 cursor-pointer transition-colors">
        Privacy Notice
      </h6>
      <p className="text-foreground/60 text-center text-xs leading-5">
        &copy; {currentYear} Luma &bull; All rights reserved. <br /> Created by{" "}
        <Link href={"https://maciejpolowy.space"} className="text-distinct">
          Maciej Polowy
        </Link>
        .
      </p>
    </div>
  );
}

export default Copyright;
