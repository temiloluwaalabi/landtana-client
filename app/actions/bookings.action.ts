"use server"

import { bookingService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError } from "@/lib/error";
import logger from "@/lib/logger";


export const getBookingsByUser = async () => {
    try {
      const bookings = await bookingService.getUserBookings();
  
      logger.info("Bookings Successfully Fetched");
  
      return {
        success: true,
        bookings,
      };
    } catch (error) {
      logger.error({ error }, "FAILED FETCHING Bookings");
  
      if (error instanceof UnauthorizedError) {
        return {
          success: false,
          message: error.message,
          status: error.statusCode,
        };
      }
      if (error instanceof ApiError) {
        return {
          success: false,
          message: error.message,
          rawErrors: error.rawErrors,
          status: error.statusCode,
        };
      }
  
      return {
        success: false,
        message: "Fetching service failed",
        status: 500,
      };
    }
  };