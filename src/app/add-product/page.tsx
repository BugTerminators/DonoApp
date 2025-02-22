"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ListingFormData {
  name: string;
  description: string;
  category: string;
  images: FileList | null;
}

const AddListing = () => {
  const [preview, setPreview] = useState<string[]>([]);

  const form = useForm<ListingFormData>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      images: null,
    },
  });

  const categories = [
    { id: "food", name: "Food", image: "/images/food.jpg" },
    { id: "clothes", name: "Clothes", image: "/images/clothes.jpg" },
    { id: "books", name: "Books", image: "/images/books.jpg" },
    { id: "utensils", name: "Utensils", image: "/images/utensils.jpg" },
    {
      id: "electronics",
      name: "Electronics",
      image: "/images/electronics.jpg",
    },
    { id: "stationary", name: "Stationary", image: "/images/stationary.jpg" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview((prev) => [...prev, ...newPreviews]);
      form.setValue("images", files);
    }
  };

  const onSubmit = (data: ListingFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
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
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-lg font-semibold">
                        Product Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          className="text-base"
                          {...field}
                        />
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
                    <FormItem className="mb-6">
                      <FormLabel className="text-lg font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product"
                          className="min-h-[150px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Image Upload */}
                <FormItem className="mb-6">
                  <FormLabel className="text-lg font-semibold">
                    Product Images
                  </FormLabel>
                  <div className="mt-2 flex flex-col items-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 w-full max-w-2xl">
                      {preview.map((url, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <Label
                        htmlFor="image-upload"
                        className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-base text-gray-500">
                          Upload Image
                        </span>
                      </Label>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <FormDescription className="text-base">
                      Upload image. Should not exceed 5MB.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              
                {/* Category Section */}
                <div className="px-4 md:px-0 pb-10">
                  <p className="text-lg font-bold mb-4 md:mb-6">
                    Category
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="relative overflow-hidden rounded-2xl aspect-[4/3] group transition-transform hover:scale-105"
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
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
                

            {/* Submit Button */}
            <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full py-6 text-lg bg-black hover:bg-gray-800 rounded-full md:text-xl">
                                Add Listing
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Successfully Added</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will receive notification when someone is interested in your product.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Link href={"/"}>Done</Link></AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddListing;