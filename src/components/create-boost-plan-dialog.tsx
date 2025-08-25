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
import { BoostPlanForm } from "./BoostPlanForm";
import type { BoostPlan } from "@/types/entities";
import { useState } from "react";

type BoostPlanDialogProps = {
  mode: "create" | "edit";
  triggerLabel?: string;
  plan?: BoostPlan;
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this Boost Plan?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The plan{" "}
                    <span className="font-semibold">{plan.title}</span> will be
                    permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(plan.id);
                      setOpen(false); // close parent dialog after delete
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
