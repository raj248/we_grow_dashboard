import { useUser } from "@/hooks/useUsers";
import { format } from "date-fns";

interface UserHoverContentProps {
  userId: string;
}

export function UserHoverContent({ userId }: UserHoverContentProps) {
  const { data, isLoading, isError } = useUser(userId);

  if (isLoading)
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError || !data?.data)
    return <p className="text-sm text-muted-foreground">User not found</p>;

  const user = data.data;

  return (
    <div className="text-sm space-y-1">
      <p>
        <span className="font-medium">User ID:</span> {user.userId}
      </p>
      <p>
        <span className="font-medium">Wallet:</span> ₹
        {user.wallet?.balance ?? 0}
      </p>
      <p>
        <span className="font-medium">Last Active:</span>{" "}
        {user.lastActiveAt
          ? format(new Date(user.lastActiveAt), "dd MMM yyyy HH:mm")
          : "N/A"}
      </p>
      <p>
        <span className="font-medium">Joined:</span>{" "}
        {format(new Date(user.createdAt), "dd MMM yyyy")}
      </p>
    </div>
  );
}
