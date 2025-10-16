"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCreateBoostPlan, useUpdateBoostPlan } from "@/hooks/useBoostPlan";
import type { BoostPlan } from "@/types/entities";

// 🔹 Validation schema

export const boostPlanSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  duration: z.coerce.number().min(1, "Duration must be at least 1"),
  reward: z.coerce.number().min(0, "Reward must be positive"),

  views: z.coerce.number().min(0, "Views must be at least 1"),
  likes: z.coerce.number().min(0, "Likes must be positive"),
  subscribers: z.coerce.number().min(0, "Subscribers must be positive"),

  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

type BoostPlanFormValues = z.infer<typeof boostPlanSchema>;

type Props = {
  mode: "create" | "edit";
  plan?: BoostPlan;
  onSuccess?: () => void;
};

export function BoostPlanForm({ mode, plan, onSuccess }: Props) {
  const form = useForm<BoostPlanFormValues>({
    resolver: zodResolver(boostPlanSchema) as any,
    defaultValues:
      mode === "edit" && plan
        ? {
            title: plan.title,
            price: plan.price,
            duration: plan.duration,
            reward: plan.reward,

            views: plan.views,
            likes: plan.likes,
            subscribers: plan.subscribers,

            description: plan.description ?? "",
            isActive: plan.isActive,
          }
        : {
            title: "",
            description: "",
            price: 1,
            views: 0,
            likes: 0,
            subscribers: 0,
            duration: 1,
            reward: 1,
            isActive: true,
          },
  });

  const createMutation = useCreateBoostPlan();
  const updateMutation = useUpdateBoostPlan();

  function onSubmit(values: BoostPlanFormValues) {
    if (mode === "edit" && plan) {
      updateMutation.mutate(
        { id: plan.id, boostPlan: values },
        {
          onSuccess: () => {
            onSuccess?.();
            console.log("Plan updated successfully");
          },
          onError: (err) =>
            console.error("Failed to update plan:", err.message),
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
          console.log("Plan created successfully");
        },
        onError: (err) => console.error("Failed to create plan:", err.message),
      });
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        {mode === "edit" ? "Edit Boost Plan" : "Create Boost Plan"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter plan title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Views */}
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Views</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Likes */}
          <FormField
            control={form.control}
            name="likes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Likes</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subscribers */}
          <FormField
            control={form.control}
            name="subscribers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscribers</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reward */}
          <FormField
            control={form.control}
            name="reward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div>
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Whether this plan is available to users.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update Plan"
              : "Create Plan"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
