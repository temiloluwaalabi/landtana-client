"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormFieldTypes } from "@/config/enums";
import { useForgotPassword } from "@/lib/query/auth-service";
import { EmailSchema, EmailSchemaType } from "@/lib/validations/common.schema";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useForgotPassword();
  const loginForm = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {},
  });

  const LoginSubmit = async (values: z.infer<typeof EmailSchema>) => {
    mutate(values, {
      onSuccess: () => {
        loginForm.reset();
      },
    });
  };

  return (
    <Form {...loginForm}>
      <div className="space-y-4">
        <form
          onSubmit={loginForm.handleSubmit(LoginSubmit)}
          className=" space-y-4"
        >
          <div className="space-y-4">
            <CustomFormField
              control={loginForm.control}
              name="email"
              label="Email"
              fieldType={FormFieldTypes.INPUT}
              inputType="email"
              disabled={isPending}
              placeholder="Please enter your email address"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="flex h-[42px] w-full items-center bg-primary hover:bg-red-900"
          >
            {isPending && <Loader2 className="me-2 size-4 animate-spin" />}
            Reset Password
          </Button>
          <div className="text-center text-sm">
            Remember Password?
            <Link
              className="relative ms-2 text-right text-sm text-secondary underline"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
}
