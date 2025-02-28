"use client";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotPage: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const getPageName = () => {
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];

    // Remove hyphens and capitalize words
    const formattedName = lastPart
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return formattedName;
  };

  const goBack = () => {
    router.back();
  };
  return (
    <div
      className="itemc flex h-screen
         flex-col justify-center"
    >
      <div className="dark:text-light-700 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          {getPageName()} - Does not exist!!
        </h1>
        <p className="dark:text-light-500 text-gray-600">
          We&apos;re working on something awesome. Stay tuned!
        </p>
        <p className="mt-4 text-red-500">
          Page not found: <code>{pathname}</code>
        </p>
        <div className="mt-6 space-x-4">
          <Button
            className="bg-primary-500 rounded px-4 py-2 text-white
                    "
            onClick={goBack}
          >
            Go Back
          </Button>

          <Button
            className="rounded bg-green-500 px-4 py-2 text-white
                    "
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotPage;
