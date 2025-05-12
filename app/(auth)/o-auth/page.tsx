import React, { Suspense } from "react";

import OAuthCallback from "@/components/shared/pages/oauthcallback-page";

export default function OAuthPage() {
  return (
    <Suspense>
      <OAuthCallback />
    </Suspense>
  );
}
