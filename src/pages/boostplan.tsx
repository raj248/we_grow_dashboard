import { useBoostPlans } from "@/hooks/useBoostPlan";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/boostplan";

export default function BoostPlanPage() {
  const { data: boostPlans, isLoading } = useBoostPlans();
  console.log("In the BoostPlan Page");
  console.log(boostPlans);
  if (isLoading) return <p>Loading...</p>;

  if (!boostPlans?.success)
    return <p>Error: {boostPlans?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Boost Plans</h1>
      <Button className="mt-4" onClick={() => {}}>
        Reload
      </Button>

      <DataTable
        columns={columns}
        data={boostPlans.data}
        onRowClick={(boostPlan) => {
          console.log("boost plan : ", boostPlan.id);
        }}
      />
    </div>
  );
}
