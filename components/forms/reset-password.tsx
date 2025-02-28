"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { FormFieldTypes } from "@/config/enums";
import { useResetPassword } from "@/lib/query/auth-service";
import {
  PasswordSchemaType,
  SetupPasswordCSchema,
} from "@/lib/validations/common.schema";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Reset Error");
      router.push("/sign-in");
    }
  }, [router, token]);

  const loginForm = useForm<PasswordSchemaType>({
    resolver: zodResolver(SetupPasswordCSchema),
    defaultValues: {
      password: "",
    },
  });
  const { mutate, isPending } = useResetPassword(token || "");

  const LoginSubmit = async (values: z.infer<typeof SetupPasswordCSchema>) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Form {...loginForm}>
      <div className="space-y-4">
        <form
          onSubmit={loginForm.handleSubmit(LoginSubmit)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <CustomFormField
              control={loginForm.control}
              name="password"
              label="Password"
              fieldType={FormFieldTypes.INPUT}
              inputType="password"
              disabled={isPending}
              placeholder="Please enter your new password password"
            />
            <CustomFormField
              control={loginForm.control}
              name="confirmPassword"
              label="Confirm Password"
              fieldType={FormFieldTypes.INPUT}
              inputType="password"
              disabled={isPending}
              placeholder="Re-enter password for confirmation"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="flex h-[42px] w-full items-center bg-primary hover:bg-red-900"
          >
            {isPending && <Loader2 className="me-2 size-4 animate-spin" />}
            Change Password
          </Button>
        </form>
      </div>
    </Form>
  );
}
