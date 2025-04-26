"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { sessionOptions } from "@/lib/auth/session";
import { sleep } from "@/lib/utils";
import { User } from "@/types";
import { defaultSession, SessionData } from "@/types/main";

export async function getSession() {
  const shouldSleep = process.env.NODE_ENV === "development"; // Only sleep in development

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.email = defaultSession.email;
  }

  if (shouldSleep) {
    await sleep(250);
  }

  return session;
}

export async function logout() {
  const session = await getSession();

  session.destroy();
  // Redirect to the homepage (or login page) immediately
  const headers = new Headers();
  headers.set("cache-control", "no-store");
  headers.set("location", "/"); // Correct location header setting

  return new Response(null, {
    status: 303,
    headers,
  });
}

export async function loginSession(user: Partial<User>, accessToken?: string) {
  // const userInfo = await getUserInfo(accessToken);
  const session = await getSession();

  const token = (await cookies()).get("access_token")?.value;

  Object.assign(session, {
    id: user.id,
    first_name: user.first_name,
    is_boarded: user.is_onboarded,
    isLoggedIn: true,
    email: user.email,
    role: user.role,
    token: accessToken || token,
  });

  await session.save();

  revalidatePath("/dashboard");
}

export async function onBoardSession(user: Partial<User>) {
  const session = await getSession();

  session.is_boarded = true; // Simplified
  session.first_name = user.first_name || "";

  await session.save();
}
export async function RegisterSession(
  user: Partial<User>,
  accessToken?: string
) {
  const session = await getSession();

  Object.assign(session, {
    id: user.id,
    isLoggedIn: false,
    email: user.email,
    role: user.role,
    token: accessToken,
  });

  await session.save();
  revalidatePath("/");
}

export async function OAuthSession(token: string) {
  const session = await getSession();

  session.isLoggedIn = true; // Simplified
  session.token = token;
  session.is_boarded = true;
  session.id = "";
  session.email = "";
  // session.role = "ADMIN";

  await session.save();
}
