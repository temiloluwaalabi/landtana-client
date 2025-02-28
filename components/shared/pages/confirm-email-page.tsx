/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { RotateCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import useSession from "@/hooks/use-session";
import { LOGIN_LINK } from "@/routes";

export default function ConfirmEmailPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clientLogoutSession, session } = useSession();
  const [error, setError] = useState<string>("");
  const token = searchParams.get("token");

  useEffect(() => {
    const handle = async () => {
      if (!token) {
        router.push(LOGIN_LINK);
        if (session.isLoggedIn) {
          await clientLogoutSession();
        }
        setError("No Confirmation params");
      }
    };
    handle();
  }, [clientLogoutSession, router, searchParams, session.isLoggedIn, token]);
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
                Confirmation...
              </h3>
              <p className="text-center text-sm text-gray-500">
                Please wait while we complete your email conformation
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
