"use server";

import { bookingService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError } from "@/lib/error";
import logger from "@/lib/logger";

import { getSession } from "./session.action";

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
export const getGroupBookingsByUser = async () => {
  try {
    const bookings = await bookingService.getUserGroupBookings();

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
export const getAllBookings = async () => {
  try {
    const session = await getSession();

    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }
    const bookings = await bookingService.getAllBookings();

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
export const getBookingByID = async (id: string) => {
  try {
    const session = await getSession();
    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }
    const service = await bookingService.getBookingByID(session.token, id);

    logger.info("BOOKING Successfully Fetched");

    return {
      success: true,
      service,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING BOOKING");

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
