import Badges from "./badges";
import Copyright from "./copyright";
import Header from "./header";
import Links from "./links";
import Newsletter from "./newsletter";

function Footer() {
  return (
    <footer className="bg-white/40 py-16 text-sm dark:bg-white/7">
      <div className="wrapper flex flex-col gap-4">
        <Header />
        <Links />
        <div className="border-muted-foreground/50 flex flex-col gap-8 rounded-xl border border-dashed p-4">
          <Newsletter />
          <Badges />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer;
