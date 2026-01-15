function Links() {
  return (
    <div className="bg-foreground text-background/75 rounded-xl border px-8 py-12">
      <div className="text-background border-muted-foreground/75 mb-6 space-y-1 border-b border-dashed pb-6">
        <h6 className="font-medium">Shop with Confidence </h6>
        <p className="text-[10px]">
          Explore our collections, get support, and learn more about who we are.
        </p>
      </div>
      <article className="grid grid-cols-2 gap-y-12">
        <div>
          <h4 className="text-background mb-2 pb-2 font-semibold">Shop</h4>
          <ul className="space-y-1">
            <li className="hover:text-background cursor-pointer text-xs transition-colors">
              Men
            </li>
            <li className="hover:text-background cursor-pointer text-xs transition-colors">
              Women
            </li>
            <li className="hover:text-background cursor-pointer text-xs transition-colors">
              Accesories
            </li>
            <li className="hover:text-background cursor-pointer text-xs transition-colors">
              New Arrivals
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-background mb-2 pb-2 font-semibold whitespace-nowrap">
            Customer Support
          </h4>
          <ul className="space-y-1">
            <li className="line-clamp-1">Contact us</li>
            <li className="line-clamp-1">Shipping & delivery</li>
            <li className="line-clamp-1">Returns & refunds</li>
            <li className="line-clamp-1">FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="border-muted-foreground/75 text-background mb-2 border-b border-dashed pb-2 font-semibold">
            Company
          </h4>
          <ul className="space-y-1">
            <li className="hover:text-background cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-background cursor-pointer transition-colors">
              Our Mission
            </li>
            <li className="hover:text-background cursor-pointer transition-colors">
              Store Locations
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default Links;
