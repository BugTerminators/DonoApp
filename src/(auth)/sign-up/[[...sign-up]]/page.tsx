import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import OnboardingForm from "@/onboarding/page";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col justify-center items-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold text-[#2E2A47]">Welcome back!</h1>
          <p className="text-base text-[#7E8CA0] pb-4">
            Log in or Create account to continue
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" signInFallbackRedirectUrl="/onboarding" fallbackRedirectUrl="/onboarding" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
          
        </div>
      </div>
    </div>
  );
}
