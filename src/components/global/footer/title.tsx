function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="border-muted-foreground/75 space-y-1">
      <h6 className="font-medium sm:text-lg sm:font-semibold lg:text-base xl:text-lg 2xl:text-xl">
        {title}
      </h6>
      <p className="text-xs sm:text-sm lg:text-xs xl:text-sm">{subtitle}</p>
    </div>
  );
}

export default Title;
