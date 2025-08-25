// src/components/boost/CreateBoostPlanDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateBoostPlanForm } from "./CreateBoostPlanForm";

type CreateBoostPlanDialogProps = {
  triggerLabel?: string;
};

export function CreateBoostPlanDialog({
  triggerLabel = "New Boost Plan",
}: CreateBoostPlanDialogProps) {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Boost Plan</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new Boost Plan.
          </DialogDescription>
        </DialogHeader>

        <CreateBoostPlanForm />
      </DialogContent>
    </Dialog>
  );
}
