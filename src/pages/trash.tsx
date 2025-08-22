// src/pages/trash.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useConfirm } from "@/components/modals/global-confirm-dialog";

export default function Trash() {
  const [details, setDetails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const confirm = useConfirm();

  const handleRestore = async (id: string) => {
    const confirmed = await confirm({
      title: "Restore This Item?",
      description:
        "This will restore the item from trash back into your system.",
      confirmText: "Yes, Restore",
      cancelText: "Cancel",
    });
    if (!confirmed) return;
  };

  const handlePermanentDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Permanently delete item?",
      description:
        "This will permanently delete the item and all its data. This action cannot be undone.",
      confirmText: "Delete Permanently",
      cancelText: "Cancel",
      variant: "destructive",
    });
    if (!confirmed) return;
  };

  const handlePurgeAll = async () => {
    const confirmed = await confirm({
      title: "Permanently purge all trash?",
      description:
        "This will permanently delete ALL trashed items and cannot be undone.",
      confirmText: "Purge All",
      cancelText: "Cancel",
      variant: "destructive",
    });
    if (!confirmed) return;
  };

  return (
    <div className="md:p-3 lg:p-5 space-y-4">
      <div className="flex justify-between items-center mx-4">
        <h2 className="text-xl font-semibold tracking-tight">Trash</h2>
        <Button variant="destructive" size="sm" onClick={handlePurgeAll}>
          <Trash2 size={16} className="mr-1" /> Purge All
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground mx-4">Loading trash items...</p>
      ) : (
        <p className="text-muted-foreground mx-4">Trash is empty.</p>
      )}
    </div>
  );
}
