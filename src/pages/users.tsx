// src/pages/Users.tsx
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/user";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  console.log("In the Users Page");
  console.log(users);
  if (isLoading) return <p>Loading...</p>;

  if (!users?.success) return <p>Error: {users?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <Button className="mt-4" onClick={() => {}}>
        Reload
      </Button>

      <DataTable
        columns={columns}
        data={users.data}
        onRowClick={(user) => {
          console.log("user : ", user.userId);
        }}
      />
    </div>
  );
}
