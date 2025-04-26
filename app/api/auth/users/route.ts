// src/app/api/auth/onboard/route.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// import { ValidationError } from "@/lib/error";
import { getSession, onBoardSession } from "@/app/actions/session.action";
import logger from "@/lib/logger";
import { OnboardingSchema } from "@/lib/validations/user/user.schema";

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    const validatedData = OnboardingSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { errors: validatedData.error.flatten().fieldErrors },
        { status: 422 }
      );
      //   throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const basU = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${session.id}`
    );
    const response = await fetch(basU.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Onboarding failed" },
        { status: 400 }
      );
    }

    const updatedUser = await response.json();
    await onBoardSession(updatedUser);
    logger.info({ userId: updatedUser.id }, "User onboarded successfully");

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Backend Error:", error);

    logger.error({ error }, "Onboarding Failed");

    if (error instanceof ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Onboarding failed",
      },
      { status: 400 }
    );
  }
}
