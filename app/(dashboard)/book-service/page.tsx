import React from "react";

import { BookServiceClient } from "@/components/shared/pages/book-service-client";
import ClientOnly from "@/providers/client-only";

export default function BookPage() {
  return (
    <React.Suspense>
      <ClientOnly>
        <BookServiceClient />
      </ClientOnly>
    </React.Suspense>
  );
}
