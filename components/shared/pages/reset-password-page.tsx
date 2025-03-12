// @flow
import * as React from "react";

import ResetPasswordForm from "@/components/forms/reset-password";

import { AuthContainer } from "./auth-container";
export const ResetPasswordClient = () => {
  return (
    <AuthContainer
      secondTitle="Reset Your Password"
      form={<ResetPasswordForm />}
    />
  );
};
