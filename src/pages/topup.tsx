import {
  useCreateTopupOption,
  useDeleteTopupOption,
  useTopupOptions,
  useUpdateTopupOption,
} from "@/hooks/useTopupOptions";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/topop";
import { TopupDialog } from "@/components/TopUpDialog";
import type { TopupOptions } from "@/types/entities";

export default function TopupPage() {
  const { data: topupOptions, isLoading } = useTopupOptions();
  const createMutation = useCreateTopupOption();
  const updateMutation = useUpdateTopupOption();
  const deleteMutation = useDeleteTopupOption();

  if (isLoading) return <p>Loading...</p>;

  if (!topupOptions?.success)
    return <p>Error: {topupOptions?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Topup Options</h1>
      <TopupDialog
        mode={"create"}
        onSubmit={(form) => {
          console.log("Create", form);
          createMutation.mutate(form, {
            onSuccess: () => {
              console.log("Plan created successfully");
            },
            onError: (err) => {
              console.error("Failed to create plan:", err.message);
            },
          });
        }}
      />
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const plan = row.original as TopupOptions;
              return (
                <TopupDialog
                  mode="edit"
                  topup={plan}
                  triggerLabel="Edit"
                  onSubmit={(form) => {
                    console.log("Update", form);
                    updateMutation.mutate(
                      { id: form.id, topupOption: form },
                      {
                        onSuccess: () => {
                          console.log("Plan updated successfully");
                        },
                        onError: (err) => {
                          console.error("Failed to update plan:", err.message);
                        },
                      }
                    );
                  }}
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
        data={topupOptions.data}
        tableType="topup"
        onRowClick={(topupOption) => {
          console.log("topup option : ", topupOption.id);
        }}
      />
    </div>
  );
}
