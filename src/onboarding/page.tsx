'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the form schema with Zod
const formSchema = z.object({
  userType: z.enum(["INDIVIDUAL", "NGO"], {
    required_error: "Please select a user type",
  }),
  supportingDocument: z.instanceof(File).optional().or(z.literal('')),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Invalid phone number format"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>("");

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: undefined,
      supportingDocument: '',
      phoneNumber: '',
    },
  });

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a PDF, JPG, or PNG file"
        });
        e.target.value = '';
        return;
      }
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "File size should not exceed 5MB"
        });
        e.target.value = '';
        return;
      }
      form.setValue('supportingDocument', file);
    }
  };

  // Get location
  const getLocation = () => {
    setLocationStatus("Requesting location access...");
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue('location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus("Location access granted");
        toast.success("Location access granted");
      },
      (error) => {
        setLocationStatus(`Error: ${error.message}`);
        toast.error("Failed to get location", {
          description: error.message
        });
      }
    );
  };

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Add your form submission logic here
          console.log(data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Submitting form...',
      success: 'Form submitted successfully',
      error: 'Something went wrong'
    });

    try {
      await promise;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Type */}
            <FormField
              control={form.control}
              name="userType"
              render={({ field }: { field: ControllerRenderProps<FormValues, "userType"> }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                      <SelectItem value="NGO">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Supporting Document (NGO only) */}
            {form.watch("userType") === "NGO" && (
              <FormItem>
                <FormLabel>Supporting Documents</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Permission */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                className="w-full"
              >
                {locationStatus ? locationStatus : "Grant Location Access"}
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Complete Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}