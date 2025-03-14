"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import useSession from "@/hooks/use-session";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ONBOARDING_REDIRECT,
  LOGIN_LINK,
} from "@/routes";

import { authService } from "../api/api";
import { apiClient, setAuthToken } from "../api/client";
import { ValidationError } from "../error";
import logger from "../logger";
import { handleMutationError } from "./handle-api-error";
import {
  EmailSchemaType,
  PasswordSchemaType,
} from "../validations/common.schema";
import { LoginSchema, OnboardingSchema } from "../validations/user/user.schema";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (credentials: z.infer<typeof LoginSchema>) => {
      const response = await apiClient.post("/api/auth/sign-in", credentials);
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      return response.data;
    },
    onSuccess: (data) => {
      logger.info("Login Successful");
      const message = data?.message || "Login successsful!";
      toast.success(message);
      // Check if there's a callbackUrl in the query parameters
      const callbackUrl = searchParams.get("callbackUrl");

      // Navigate to the callback URL if it exists, otherwise use the default
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: async (credentials: z.infer<typeof LoginSchema>) => {
      const response = await apiClient.post("/api/auth/sign-up", credentials);
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      return response.data;
    },
    onSuccess: (data) => {
      logger.info("Registration Successful");
      const message = data?.message || "Registration successsful!";
      toast.success(message);
      router.push(DEFAULT_ONBOARDING_REDIRECT);
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};

export const useOnboard = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "onboard"],
    mutationFn: async (credentials: z.infer<typeof OnboardingSchema>) => {
      console.log("Payload being sent:", credentials); // Ensure correct data is sent

      const response = await apiClient.put(`/api/auth/users`, credentials);
      return response.data;
    },
    onSuccess: () => {
      logger.info("Onboarded Successful");
      toast.success("Onboarded Successfully");
      router.push(DEFAULT_LOGIN_REDIRECT);
      router.refresh(); // Ensure client-side state updates
    },
    onError: (error: Error) => {
      logger.error({ error }, "Onboarding Failed");
      toast.error(error.message);

      // You can add error handling for specific error types here
      if (error instanceof ValidationError) {
        // Handle field-specific errors
        console.error("Validation errors:", error.details);
      }
    },
  });
};
export const useUser = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await apiClient.get(`/api/users/${id}`);
      console.log("FETCH USER BY ID RESPONSE", response);
      return response.data;
    },
    enabled,
  });
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "forgot_password"],
    mutationFn: async (email: EmailSchemaType) => {
      await authService.resetPasswordLink(email);

      return {
        success: true,
        message: "Password reset link sent to your mail",
      };
    },
    onSuccess: (data) => {
      logger.info(data.message);
      const message = data?.message;
      toast.success(message);
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};
export const useResetPassword = (token: string) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "reset_password"],
    mutationFn: async (password: PasswordSchemaType) => {
      await authService.resetPassword(password, token);

      return {
        success: true,
        message: "Password successfully reset",
      };
    },
    onSuccess: (data) => {
      logger.info(data.message);
      const message = data?.message;
      toast.success(message);
      router.push(LOGIN_LINK);
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};
export const useResendConfirmationLink = () => {
  const router = useRouter();
  const { session } = useSession();
  return useMutation({
    mutationKey: ["auth", "confirmation_resend"],
    mutationFn: async () => {
      await authService.resendConfirmationLink(session.token);
      return {
        success: true,
        message: "Email confirmation link resent to your mail",
      };
    },
    onSuccess: (data) => {
      logger.info(data.message);
      const message = data?.message;
      toast.success(message);
      router.push(DEFAULT_LOGIN_REDIRECT);
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};
export const useConfirmEmail = () => {
  const router = useRouter();
  const { session } = useSession();
  return useMutation({
    mutationKey: ["auth", "confirmation_resend"],
    mutationFn: async () => {
      await authService.confirmEmail(session.token);
      return {
        success: true,
        message: "Email Successfully confirmed",
      };
    },
    onSuccess: (data) => {
      logger.info(data.message);
      const message = data?.message;
      toast.success(message);
      router.push(DEFAULT_LOGIN_REDIRECT);
      router.refresh(); // Ensure client-side state updates
    },
    onError: handleMutationError,
  });
};
