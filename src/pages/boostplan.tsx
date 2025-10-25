import { useBoostPlans, useDeleteBoostPlan } from "@/hooks/useBoostPlan";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/boostplan";
import { BoostPlanDialog } from "@/components/BoostPlanDialog";
import type { BoostPlan } from "@/types/entities";
import { useProtectAdminRoute } from "@/hooks/useProtectAdminRoute";

export default function BoostPlanPage() {
  const { data: boostPlans, isLoading } = useBoostPlans();
  const deleteMutation = useDeleteBoostPlan();
  useProtectAdminRoute();

  if (isLoading) return <p>Loading...</p>;

  if (!boostPlans?.success)
    return <p>Error: {boostPlans?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Boost Plans</h1>

      <BoostPlanDialog mode={"create"} />
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const plan = row.original as BoostPlan;
              return (
                <BoostPlanDialog
                  mode="edit"
                  plan={plan}
                  triggerLabel="Edit"
                  onDelete={(planId: string) => {
                    console.log("Delete", planId);
                    deleteMutation.mutate(planId, {
                      onSuccess: () => {
                        console.log("Plan deleted successfully");
                      },
                      onError: (err) => {
                        console.error("Failed to delete plan:", err.message);
                      },
                    });
                  }}
                />
              );
            },
          },
        ]}
        data={boostPlans.data}
        tableType="boost-plan"
        onRowClick={(boostPlan) => {
          console.log("boost plan : ", boostPlan.id);
        }}
        inputLabel="Find by Title, Description, Price, Views, Duration and Reward"
      />
    </div>
  );
}
