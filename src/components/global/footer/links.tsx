import { footerList } from "@/lib/constants/lists";
import Title from "./title";

function Links() {
  return (
    <div className="bg-foreground text-background/75 rounded-xl px-8 py-12 shadow-sm lg:h-full">
      <div className="text-background border-muted-foreground/75 mb-6 space-y-1 border-b border-dashed pb-6">
        <Title
          title="Shop with Confidence"
          subtitle="Explore our collections, get support, and learn more about who we are."
        />
      </div>
      <article className="grid grid-cols-2 gap-y-12">
        {footerList.map(({ title, items }) => (
          <div key={title}>
            <h4 className="text-background mb-2 pb-2 font-semibold">{title}</h4>
            <ul className="space-y-1">
              {items.map((item) => (
                <li
                  className="hover:text-background cursor-pointer text-xs transition-colors"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    </div>
  );
}

export default Links;
