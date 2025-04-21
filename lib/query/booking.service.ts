"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { Booking } from "@/types";

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

export const useGetUserBookings = () => {
  return useQuery<{
    message: string;
    bookings: Booking[];
  }>({
    queryKey: ["booking", "fetchAll"], // Unique key for this query
    queryFn: async () => {
      const response = await apiClient.get("/api/bookings", {
        withCredentials: true,
      });
      return response.data.data; // Assuming the API returns an array of categories
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2,
  });
};
