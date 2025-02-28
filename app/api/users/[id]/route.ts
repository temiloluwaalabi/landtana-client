import { NextResponse } from "next/server";

import { getSession } from "@/app/actions/session.action";
import { authService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError } from "@/lib/error";
import logger from "@/lib/logger";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    const userId = (await params).id;

    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }
    if (!userId) {
      throw new ApiError({
        statusCode: 400,
        messages: "User ID is required",
      });
    }
    const user = await authService.getUserByID(session.token, userId);

    return NextResponse.json(
      {
        message: "User fetched",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING USER");

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message, details: error.rawErrors },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Fetching user failed",
      },
      { status: 500 },
    );
  }
}
