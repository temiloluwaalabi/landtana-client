import React from "react";

import {
  getAllCategories,
  getAllServices,
} from "@/app/actions/services.action";
import { BookServiceClient } from "@/components/shared/pages/book-service-client";
import ClientOnly from "@/providers/client-only";

export default async function BookPage() {
  const services = await getAllServices();

  const categories = await getAllCategories();
  return (
    <React.Suspense>
      <ClientOnly>
        <BookServiceClient
          services={services.services?.services || []}
          categories={categories.categories || []}
        />
      </ClientOnly>
    </React.Suspense>
  );
}
