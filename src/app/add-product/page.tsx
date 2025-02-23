"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";


const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

// Updated schema with conditional validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.number().int().positive("Category is required"),
  quantity: z.string().max(100).optional(),
  size: z.string().max(50).optional(),
  expire_at: z.string().optional(),
  image_url: z.string().optional(),
  status: z.number().int().default(1),
}).refine((data) => {
  // Validate size is required and valid for clothes
  if (data.category === 2) {
    return SIZES.includes(data.size as any);
  }
  return true;
}, {
  message: "Size is required for clothes",
  path: ["size"],
}).refine((data) => {
  // Validate expiry date is required for food
  if (data.category === 1) {
    return !!data.expire_at;
  }
  return true;
}, {
  message: "Expiry date is required for food items",
  path: ["expire_at"],
});

type FormValues = z.infer<typeof formSchema>;

const AddListing = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      quantity: "",
      size: "",
      expire_at: "",
      status: 1,
    },
  });

  const categories = [
    { id: 1, name: "Food", image: "/images/food.png" },
    { id: 2, name: "Clothes", image: "/images/clothes.png" },
    { id: 3, name: "Books", image: "/images/books.png" },
    { id: 4, name: "Utensils", image: "/images/utensils.png" },
    { id: 5, name: "Electronics", image: "/images/electronics.png" },
    { id: 6, name: "Stationary", image: "/images/stationary.png" },
  ];

  const selectedCategory = form.watch("category");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      form.setValue("image_url", imageUrl);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: new Date().toISOString(),
          expire_at: data.expire_at ? new Date(data.expire_at).toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      setShowSuccess(true);
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Listing</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-lg font-semibold">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter listing title"
                          className="text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-lg font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your listing"
                          className="min-h-[150px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-lg font-semibold">
                        Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity"
                          className="text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="px-4 md:px-0 pb-10">
                  <p className="text-lg font-bold mb-4 md:mb-6">Category</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <button
                        type="button"
                        key={category.id}
                        onClick={() => {
                          form.setValue("category", category.id);
                          // Clear category-specific fields when changing categories
                          if (category.id !== 2) {
                            form.setValue("size", "");
                          }
                          if (category.id !== 1) {
                            form.setValue("expire_at", "");
                          }
                        }}
                        className={`relative overflow-hidden rounded-2xl aspect-[4/3] group transition-transform hover:scale-105 ${
                          selectedCategory === category.id
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <span className="text-white text-base font-semibold">
                            {category.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCategory === 1 && (
                  <FormField
                    control={form.control}
                    name="expire_at"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-lg font-semibold">
                          Expiry Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedCategory === 2 && (
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-lg font-semibold">Size</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SIZES.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormItem className="mb-6">
                  <FormLabel className="text-lg font-semibold">
                    Product Image
                  </FormLabel>
                  <div className="mt-2 flex flex-col items-center">
                    <div className="grid grid-cols-1 gap-4 mb-4 w-full max-w-2xl">
                      {preview ? (
                        <div className="relative aspect-square rounded-lg overflow-hidden w-full max-w-xs mx-auto">
                          <img
                            src={preview}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setPreview(null);
                              form.setValue("image_url", "");
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <Label
                          htmlFor="image-upload"
                          className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors max-w-xs mx-auto w-full"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-base text-gray-500">
                            Upload Image
                          </span>
                        </Label>
                      )}
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <FormDescription className="text-base">
                      Upload a single image. Should not exceed 5MB.
                    </FormDescription>
                  </div>
                </FormItem>

                <div className="pt-6">
                  <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="submit"
                        className="w-full py-6 text-lg bg-black hover:bg-gray-800 rounded-full md:text-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Adding Listing..." : "Add Listing"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Successfully Added</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will receive notification when someone is
                          interested in your product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Link href="/">Done</Link>
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddListing;