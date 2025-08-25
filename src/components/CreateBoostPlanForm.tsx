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
import { useCreateBoostPlan } from "@/hooks/useBoostPlan";

// 🔹 Validation schema

export const boostPlanSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  views: z.coerce.number().min(1, "Views must be at least 1"),
  duration: z.coerce.number().min(1, "Duration must be at least 1"),
  reward: z.coerce.number().min(0, "Reward must be positive"),
  isActive: z.boolean().default(true),
});

type BoostPlanFormValues = z.infer<typeof boostPlanSchema>;

export function CreateBoostPlanForm() {
  const form = useForm<BoostPlanFormValues>({
    resolver: zodResolver(boostPlanSchema) as any, // Fix type mismatch
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      views: 1,
      duration: 1,
      reward: 0,
      isActive: true,
    },
  });

  const { mutate, isPending } = useCreateBoostPlan();

  function onSubmit(values: BoostPlanFormValues) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
      onError: (err) => {
        console.error("Failed to create plan:", err.message);
      },
    });
  }

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Create Boost Plan</h2>

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
            {isPending ? "Creating..." : "Create Plan"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
