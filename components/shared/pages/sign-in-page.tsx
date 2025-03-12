"use client";

import * as React from "react";

import LoginForm from "@/components/forms/login-form";

import { AuthContainer } from "./auth-container";
export const SignInPageClient = () => {
  return (
    <AuthContainer
      firstTitle="Welcome to"
      secondTitle="Landtana Crown Braids"
      desc=" Where beauty meets artistry. Sign in to book your next
            transformation."
      form={<LoginForm />}
    />
  );
};
