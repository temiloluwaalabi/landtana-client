import React, { Suspense } from "react";

import ConfirmEmailPageClient from "@/components/shared/pages/confirm-email-page";

export default function ConfirmEmailPage() {
  return (
    <Suspense>
      <ConfirmEmailPageClient />
    </Suspense>
  );
}
