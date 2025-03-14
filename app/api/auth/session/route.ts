import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { sessionOptions } from "@/lib/auth/session";
import { sleep } from "@/lib/utils";
import { User } from "@/types";
import { defaultSession, SessionData } from "@/types/main";

export async function POST(
  request: NextRequest,
  user: User,
  accessToken: string
) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  //   const formData = await request.formData();

  session.isLoggedIn = true;
  session.email = user.email;
  session.id = user.id || "";
  session.first_name = user.first_name || "";
  session.token = accessToken;

  await session.save();

  await sleep(250);

  const url = new URL("/dashboard", request.url);

  return NextResponse.redirect(url.toString(), 303);
}

export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const action = new URL(request.url).searchParams.get("action");

  if (action === "logout") {
    session.destroy();
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  await sleep(250);

  if (session.isLoggedIn !== true) {
    return NextResponse.json(defaultSession, { status: 401 });
  }

  return NextResponse.json(session);
}

export async function PATCH() {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    // Update to a fixed expiration time (e.g., 1 hour)
    const fixedMaxAge = 3600; // 1 hour in seconds

    session.updateConfig({
      ...sessionOptions,
      cookieOptions: {
        ...sessionOptions.cookieOptions,
        maxAge: fixedMaxAge,
      },
    });

    await session.save();

    return NextResponse.json({ message: "Session updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update session", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.destroy();

  return Response.json(defaultSession);
}
