/**
 * An array of routes that are accesible to the public
 * These routes do no require authentication
 * @type {string[]}
 */

export const guestRoutes = [
  "/forgot-password",
  "/o-auth",
  "/sign-in",
  "/sign-up",
  "/api/uploadthing",
  "/reset-password",
  "/error",
  "/confirm-email",
  "access-denied",
  "/",
];

export const sharedRoutes = ["/services", "/confirm-email"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to "/dashboard"
 * @type {string[]}
 */
export const authRoutes = ["/forgot-password", "/sign-in", "/reset-password"];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
export const LOGIN_LINK = "/sign-in";
export const REGISTER_LINK = "/sign-up";
export const DEFAULT_ONBOARDING_REDIRECT = "/onboard";
export const ACCESS_DENIED = "/access-denied";
export const DEFAULT_BOOK_REDIRECT = "/book-service";

/**
 * Role-based dashboards (Rewritten URLs)
 * The actual file structure will still use "/dashboard",
 * but the URL will be dynamically rewritten to "/dashboard/{role}"
 */
export const DASHBOARD_ROUTES = {
  SuperAdmin: "/dashboard/superadmin",
  Manager: "/dashboard/manager",
  Staff: "/dashboard/staff",
  Support: "/dashboard/support",
};
