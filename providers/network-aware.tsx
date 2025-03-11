// components/NetworkAwareComponent.tsx
"use client";

import { ReactNode } from "react";

import { NoInternetError } from "@/components/ui/error-states";
import { useNetworkStatus } from "@/hooks/use-network-status";

type NetworkAwareComponentProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function NetworkAwareComponent({
  children,
  fallback = <NoInternetError />,
}: NetworkAwareComponentProps) {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return fallback;
  }

  return <>{children}</>;
}
