// "use client";
// import { toast } from "sonner";

// import { ApiError } from "../api/client";

// export const handleMutationError = (error: unknown) => {
//   console.error("API Error:", error);

//   if (!(error instanceof ApiError)) {
//     toast.error("An unexpected error occurred.");
//     return;
//   }

//   const { status, message, errors } = error;

//   if (status === 401) {
//     toast.error(message || "Invalid credentials. Please try again.");
//     return;
//   }

//   if (status === 422 && errors) {
//     Object.values(errors).forEach((errorMessages) => {
//       errorMessages.forEach((msg) => toast.error(msg));
//     });
//     return;
//   }

//   toast.error(message || "An unexpected error occurred.");
// };
