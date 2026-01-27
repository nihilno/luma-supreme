function Statbox({ label, value }: { label: string; value: number }) {
  return (
    <li className="w-full p-4 text-center">
      <p className="text-distinct text-2xl font-bold sm:text-3xl lg:text-5xl">
        {value}
      </p>
      <p className="line-clamp-1 text-sm">{label}</p>
    </li>
  );
}

export default Statbox;
