/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { RotateCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { loginSession } from "@/app/actions/session.action";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Extract user data from query params
        const userId = searchParams.get("id");
        const email = searchParams.get("email");
        const role = searchParams.get("role");
        const isOnboarded = searchParams.get("is_onboarded");
        const firstName = searchParams.get("first_name");

        if (!userId || !email || !role || !isOnboarded) {
          setError("Missing required authentication parameters");
          setTimeout(() => router.push("/sign-in"), 2000);
          return;
        }

        // Prepare user data
        const user: Partial<User> = {
          id: userId,
          email,
          role,
          first_name: firstName || "",
          is_onboarded: isOnboarded === "true",
        };

        // Save session with HTTP-only cookie token
        await loginSession(user);

        // Redirect to dashboard after successful authentication
        router.push("/");
      } catch (err) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => router.push("/sign-in"), 2000);
      }
    };
    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent className="flex flex-col items-center space-y-4">
          {error ? (
            <div className="text-center text-red-500">
              <p className="text-lg font-medium">{error}</p>
              <p className="text-sm">Redirecting to sign-in...</p>
            </div>
          ) : (
            <>
              <div className="animate-spin">
                <RotateCw className="size-12 text-blue-600" />
              </div>{" "}
              <h3 className="text-xl font-semibold text-gray-900">
                Authenticating...
              </h3>
              <p className="text-sm text-gray-500">
                Please wait while we complete your sign-in
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
