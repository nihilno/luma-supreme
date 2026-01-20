import Chart from "@/components/admin/chart";
import Recent from "@/components/admin/recent";
import Stats from "@/components/admin/stats";

export default async function AdminOverviewPage() {
  return (
    <div>
      <Stats />
      <div className="mt-4 grid h-full grid-cols-1 gap-4 xl:grid-cols-[3fr_2fr]">
        <Chart />
        <Recent />
      </div>
    </div>
  );
}
