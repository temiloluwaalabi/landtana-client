"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { apiClient } from "../api/client";
import logger from "../logger";
import { handleMutationError } from "./handle-api-error";
import { CreateBookingSchema } from "../validations/main-schema";

export const useCreateBooking = (onSuccessCallback?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["booking", "create"],
    mutationFn: async (credentials: z.infer<typeof CreateBookingSchema>) => {
      const response = await apiClient.post("/api/booking", credentials);

      return response.data;
    },
    onSuccess: (data) => {
      logger.info("Booking Successful");
      const message = data?.message || "Booking successsful!";
      toast.success(message);
      // Check if there's a callbackUrl in the query parameters

      router.refresh();
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: handleMutationError,
  });
};
