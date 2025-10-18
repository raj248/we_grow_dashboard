"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { TopupOptions } from "@/types/entities";

type TopupDialogProps = {
  mode: "create" | "edit";
  triggerLabel?: string;
  topup?: TopupOptions;
  onDelete?: (id: string) => void;
  onSubmit: (topup: TopupOptions) => void;
};

export function TopupDialog({
  mode,
  triggerLabel = mode === "create" ? "New Topup" : "Edit Topup",
  topup,
  onDelete,
  onSubmit,
}: TopupDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TopupOptions>({
    id: topup?.id || "",
    coins: topup?.coins || 0,
    originalPrice: topup?.originalPrice || 0,
    isActive: topup?.isActive ?? true,
    createdAt: topup?.createdAt || "",
    updatedAt: topup?.updatedAt || "",
  });

  const handleChange = (field: keyof TopupOptions, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // send the full form for creation
    onSubmit(form);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Topup" : "Edit Topup"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details below to create a new Topup."
              : "Update the details of this Topup."}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="space-y-4 mt-4">
          {/* ID (read-only when editing) */}
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <Input
              value={form.id}
              onChange={(e) => handleChange("id", e.target.value)}
              disabled={mode === "edit"}
              placeholder="Unique ID for Topup"
            />
          </div>

          {/* Coins */}
          <div>
            <label className="block text-sm font-medium mb-1">Coins</label>
            <Input
              type="number"
              value={form.coins}
              onChange={(e) => handleChange("coins", Number(e.target.value))}
              placeholder="Number of coins"
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Original Price
            </label>
            <Input
              type="number"
              value={form.originalPrice}
              onChange={(e) =>
                handleChange("originalPrice", Number(e.target.value))
              }
              placeholder="Optional display price"
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={form.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <span>Active</span>
          </div>
        </div>

        {/* Footer actions */}
        <DialogFooter className="flex justify-between mt-6">
          {mode === "edit" && onDelete && topup && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this Topup?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The topup with ID{" "}
                    <span className="font-semibold">{topup.id}</span> will be
                    permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(topup.id);
                      setOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
