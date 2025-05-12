import React, { Suspense } from "react";

import { ResetPasswordClient } from "@/components/shared/pages/reset-password-page";

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
