import { useTopupOptions } from "@/hooks/useTopupOptions";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/topop";

export default function TopupPage() {
  const { data: topupOptions, isLoading } = useTopupOptions();
  console.log("In the Topup Page");
  console.log(topupOptions);
  if (isLoading) return <p>Loading...</p>;

  if (!topupOptions?.success)
    return <p>Error: {topupOptions?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Topup Options</h1>
      <Button className="mt-4" onClick={() => {}}>
        Reload
      </Button>

      <DataTable
        columns={columns}
        data={topupOptions.data}
        onRowClick={(topupOption) => {
          console.log("topup option : ", topupOption.id);
        }}
      />
    </div>
  );
}
