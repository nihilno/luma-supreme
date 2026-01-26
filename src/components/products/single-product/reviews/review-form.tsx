"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpsertReview } from "@/lib/actions/review";
import { insertReviews, insertReviewsType } from "@/lib/schemas/review";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconChecks,
  IconLoader2,
  IconPlus,
  IconStar,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ReviewFormDialog({ productId }: { productId: string }) {
  const form = useForm<insertReviewsType>({
    defaultValues: {
      productId,
      title: "",
      description: "",
      rating: 5,
    },
    resolver: zodResolver(insertReviews),
  });

  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: insertReviewsType) {
    try {
      const result = await UpsertReview(formData);
      if (!result.success) {
        toast.error(
          result.message || "Failed to submit review. Please try again.",
        );
        return;
      }

      toast.success(result.message || "Review submitted successfully!");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Please try again.");
    }
    console.log(formData);
    form.reset();
    toast.success("Review submitted successfully!");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IconPlus /> Write a review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>
            Share your thoughts about the product with others.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter review title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-24 resize-none"
                      placeholder="Enter review description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="rating"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          <IconStar className="size-4.5" /> x{index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4 sm:justify-start">
              <Button
                type="submit"
                className="h-12 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <IconLoader2 className="size-5 animate-spin" />
                ) : (
                  <IconChecks className="size-5" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
