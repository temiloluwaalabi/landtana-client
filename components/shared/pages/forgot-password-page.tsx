"use client";
import * as React from "react";

import ForgotPasswordForm from "@/components/forms/forgot-password";

import { AuthContainer } from "./auth-container";
export const ForgotPasswordClient = () => {
  return (
    <AuthContainer
      secondTitle="Forgot Your Password?"
      desc="Enter your email to reset it!"
      form={<ForgotPasswordForm />}
    />
  );
};
