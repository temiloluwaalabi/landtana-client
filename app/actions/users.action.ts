"use server";

import { authService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError } from "@/lib/error";
import logger from "@/lib/logger";

import { getSession } from "./session.action";

export async function getUserAction() {
  try {
    const session = await getSession();

    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }

    if (!session.id) {
      throw new ApiError({
        statusCode: 400,
        messages: "User ID is required",
      });
    }

    const user = await authService.getUserByID(session.token, session.id);
    return { success: true, message: "User fetched", user };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING USER");

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

    return { success: false, message: "Fetching user failed", status: 500 };
  }
}
