import Badges from "./badges";
import Copyright from "./copyright";
import Header from "./header";
import Links from "./links";
import Newsletter from "./newsletter";

function Footer() {
  return (
    <footer className="bg-white/40 py-16 text-sm dark:bg-white/7">
      <div className="wrapper grid grid-cols-1 gap-4">
        <div className="lg:mx-auto lg:mb-8 lg:w-full lg:max-w-3xl">
          <Header />
        </div>
        <div className="h-full space-y-4 lg:grid lg:grid-cols-2 lg:gap-8">
          <Links />
          <div className="border-muted-foreground/75 flex flex-col gap-8 rounded-xl border border-dashed px-8 py-12">
            <Newsletter />
            <div className="lg:mt-auto">
              <Badges />
            </div>
          </div>
        </div>
        <div>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
