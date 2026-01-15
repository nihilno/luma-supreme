function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="border-muted-foreground/75 space-y-1">
      <h6 className="font-medium sm:text-lg sm:font-semibold lg:text-base">
        {title}
      </h6>
      <p className="text-[10px] sm:text-sm lg:text-xs">{subtitle}</p>
    </div>
  );
}

export default Title;
