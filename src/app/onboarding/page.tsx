'use client';
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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

// Schema and type definitions remain the same
const formSchema = z.object({
  userType: z.enum(["INDIVIDUAL", "NGO"], {
    required_error: "Please select a user type",
  }),
  supportingDocument: z.instanceof(File).optional().or(z.literal('')),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Invalid phone number format"),
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }, {
    required_error: "Location access is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>("");

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: undefined,
      supportingDocument: '',
      phoneNumber: '',
      email: user?.primaryEmailAddress?.emailAddress || '',
    },
  });

  // Handle file change remains the same
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a PDF, JPG, or PNG file"
        });
        e.target.value = '';
        return;
      }
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

  // Get location function remains the same
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
    if (!data.location) {
      toast.error("Location access required", {
        description: "Please grant location access before submitting"
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Map userType to account_type integer
      const accountTypeMap = {
        'INDIVIDUAL': 1,
        'NGO': 2
      };
  
      const requestBody = {
        email: data.email,
        phone_no: data.phoneNumber,
        account_type: accountTypeMap[data.userType],
        latitude: data.location.latitude,
        longitude: data.location.longitude
      };
  
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      const result = await response.json();
  
      // Handle file upload separately if it exists and user type is NGO
      if (data.userType === 'NGO' && data.supportingDocument instanceof File) {
        const formData = new FormData();
        formData.append('supportingDocument', data.supportingDocument);
        formData.append('email', data.email); // To associate the document with the user
  
        const fileUploadResponse = await fetch('/api/user/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!fileUploadResponse.ok) {
          throw new Error('Failed to upload file');
        }
      }
  
      toast.success('Form submitted successfully');
      form.reset();
      setLocationStatus("");
  
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
  if (user?.primaryEmailAddress?.emailAddress) {
    form.setValue('email', user.primaryEmailAddress.emailAddress);
  }
}, [user, form]);
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }: { field: ControllerRenderProps<FormValues, "userType"> }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
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

            {form.watch("userType") === "NGO" && (
              <FormItem>
                <FormLabel>Supporting Documents</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+1234567890" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                className="w-full"
                disabled={isSubmitting}
              >
                {locationStatus ? locationStatus : "Grant Location Access"}
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}