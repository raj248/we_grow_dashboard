// src/components/boost/BoostPlanDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BoostPlanForm } from "./BoostPlanForm";
import type { BoostPlan } from "@/types/entities";
import { useState } from "react";

type BoostPlanDialogProps = {
  mode: "create" | "edit"; // Create or Edit
  triggerLabel?: string;
  plan?: BoostPlan; // Required if mode = edit
  onDelete?: (planId: string) => void;
};

export function BoostPlanDialog({
  mode,
  triggerLabel = mode === "create" ? "New Boost Plan" : "Edit Plan",
  plan,
  onDelete,
}: BoostPlanDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Boost Plan" : "Edit Boost Plan"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details below to create a new Boost Plan."
              : "Update the details of this Boost Plan."}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="w-full">
          <BoostPlanForm
            plan={plan}
            onSuccess={() => setOpen(false)}
            mode={mode}
          />
        </div>

        {/* Footer actions */}
        <DialogFooter className="flex justify-between">
          {mode === "edit" && onDelete && plan && (
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(plan.id);
                setOpen(false);
              }}
            >
              Delete
            </Button>
          )}

          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
