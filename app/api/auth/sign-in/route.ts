/* eslint-disable camelcase */
// src/app/api/users/route.ts

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { loginSession } from "@/app/actions/session.action";
import { ValidationError } from "@/lib/error";
import logger from "@/lib/logger";
import { LoginSchema } from "@/lib/validations/user/user.schema";
import { LoginResponse, User } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = LoginSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // 🚀 Directly call fetch instead of authService.login
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

    const {
      id,
      first_name,
      email,
      role,
      is_onboarded,
      access_token,
    }: LoginResponse = responseData;

    const user: Partial<User> = { id, first_name, email, role, is_onboarded };

    await loginSession(user, access_token);
    logger.info({ userId: id }, "User logged in successfully");
    revalidatePath("/");
    return NextResponse.json({
      success: true,
      token: access_token,
      user,
    });
  } catch (error) {
    logger.error({ error }, "Login Failed");

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
