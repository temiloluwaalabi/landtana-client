"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormFieldTypes } from "@/config/enums";
import { useLogin } from "@/lib/query/auth-service";
import { LoginSchema } from "@/lib/validations/user/user.schema";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const LoginSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Form {...loginForm}>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Button
              disabled={isPending}
              variant="outline"
              className="relative h-[42px] w-full"
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
                className="absolute left-0 top-0 z-50 size-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form
          onSubmit={loginForm.handleSubmit(LoginSubmit)}
          className="space-y-2"
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
            <CustomFormField
              control={loginForm.control}
              name="password"
              label="Password"
              fieldType={FormFieldTypes.INPUT}
              inputType="password"
              disabled={isPending}
              placeholder="Please enter your password"
              underText={
                <div className="flex justify-end">
                  <Link
                    className="relative my-2 text-right text-sm text-secondary underline"
                    href={"/forgot-password"}
                  >
                    Forgot Password?
                  </Link>
                </div>
              }
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="flex h-[42px] w-full items-center bg-primary hover:bg-red-900"
          >
            {isPending && <Loader2 className="me-2 size-4 animate-spin" />}
            Sign In
          </Button>
          <div className="text-center text-sm">
            Dont&apos;t have an account yet?{" "}
            <Link
              className="relative ms-2 text-right text-sm text-secondary underline"
              href={"/sign-up"}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
}
