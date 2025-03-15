"use client";

import PWAInstallPrompt from "./pwa-install-prompt";
import PWARegistration from "./pwa-register-client";

export function PWAComponents() {
  // Add any client-side only code here
  return (
    <>
      <PWARegistration />
      <PWAInstallPrompt />
    </>
  );
}
