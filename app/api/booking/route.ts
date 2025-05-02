import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getSession } from "@/app/actions/session.action";
import { bookingService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError, ValidationError } from "@/lib/error";
import logger from "@/lib/logger";
import { CreateBookingSchema } from "@/lib/validations/main-schema";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }
    const body = await request.json();
    const validatedData = CreateBookingSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const headersList = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session.token}`,

      // "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };
    // 🚀 Directly call fetch instead of authService.login
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
      {
        method: "POST",
        headers: headersList,
        body: JSON.stringify(validatedData.data),
      },
    );
    const responseData = await response.json();

    if (!response.ok) {
      logger.error(
        {
          status: response.status,
          error: responseData,
        },
        "API AUTH FAILED",
      );

      return NextResponse.json(
        {
          message: responseData.message || "Authentication failed",
          errors: responseData.errors || null,
        },
        {
          status: response.status,
        },
      );
    }

    const data = responseData;

    logger.info("Booking Created Successfully");
    revalidatePath("/book-service");
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error({ error }, "Booking Failed");

    if (error instanceof ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 422 },
      );
    }
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { errors: error.details || "Validation failed" },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Authentication failed",
      },
      { status: 401 },
    );
  }
}
export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.isLoggedIn) {
      throw new UnauthorizedError();
    }

    const bookings = await bookingService.getUserBookings();

    return NextResponse.json(
      {
        message: "All bookings fetched successfully",
        bookings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("FAILED FETCHING bookings", error);

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
          error instanceof Error
            ? error.message
            : "Fetching all services failed",
      },
      { status: 500 },
    );
  }
}
