// @flow
import * as React from "react";

import RegisterForm from "@/components/forms/register-form";

import { AuthContainer } from "./auth-container";
export const SignUpPageClient = () => {
  return (
    <AuthContainer
      firstTitle="Join Landtana"
      secondTitle="Crown Braids Today!"
      desc=" Where beauty meets artistry. Sign in to book your next
            transformation."
      form={<RegisterForm />}
    />
  );
};
