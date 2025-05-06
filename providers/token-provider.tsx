"use client";
import React, { useEffect } from "react";

import useSession from "@/hooks/use-session";
import { authClient, setAuthToken } from "@/lib/api/client";

export default function TokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();
  const headers = authClient.defaults.headers.common;
  console.log(headers);
  useEffect(() => {
    console.log("PROVIDER");

    if (session.token) {
      setAuthToken(session.token);
    }
  }, [session.token]);
  return <div>{children}</div>;
}
