import { getSession } from "@/app/actions/session.action";
import { SlotAvailability } from "@/components/shared/booking/date-selection-comp";
import {
  Booking,
  GetAllCategoriesResponse,
  GetAllServicesResponse,
  GetAllSubCatResponse,
} from "@/types";

import { ApiError, authClient } from "../api/client";
import logger from "../logger";
import {
  EmailSchemaType,
  PasswordSchemaType,
} from "../validations/common.schema";
import { CreateBookingSchemaType } from "../validations/main-schema";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/auth/signin`,
      );
      console.log("Login Credentials:", credentials);
    }

    const response = await authClient.post("/auth/signin", credentials);

    if (process.env.NODE_ENV === "development") {
      console.log("Login Response:", response.data);
    }

    return response.data;
  },
  getUserByID: async (token: string, id: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/users`,
      );
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.get(`/users/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // ✅ Check response status manually like `fetch`

      if (process.env.NODE_ENV === "development") {
        console.log("Response:", response.data);
      }

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SINGLE USER FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response USER:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  confirmEmail: async (token: string) => {
    // ✅ Log headers before making the request

    const response = await authClient.post("/auth/confirm-email", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
      },
    });
    // ✅ Check response status manually like `fetch`

    if (process.env.NODE_ENV === "development") {
      console.log("Response:", response.data);
    }

    return response.data;
  },
  resendConfirmationLink: async (token: string) => {
    // ✅ Log headers before making the request

    const response = await authClient.post("/auth/resend-confirmation-link", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // ✅ Check response status manually like `fetch`

    if (process.env.NODE_ENV === "development") {
      console.log("Response:", response.data);
    }

    return response.data;
  },
  resetPasswordLink: async (values: EmailSchemaType) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/auth/reset-password-link`,
      );
      console.log("Payload:", values);
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.post(
        "/auth/reset-password-link",
        values,
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      );
      // ✅ Check response status manually like `fetch`

      if (process.env.NODE_ENV === "development") {
        console.log("Response:", response.data);
      }

      return response.data;
    } catch (error) {
      // logger.error({ error }, "Service Creation ACTION Failed");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  resetPassword: async (values: PasswordSchemaType, token: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/auth/reset-password`,
      );
      console.log("Payload:", values);
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.post(
        "/auth/reset-password",
        values.password,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            token,
          },
        },
      );
      // ✅ Check response status manually like `fetch`

      if (process.env.NODE_ENV === "development") {
        console.log("Response:", response.data);
      }

      return response.data;
    } catch (error) {
      // logger.error({ error }, "Service Creation ACTION Failed");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response RESET PASSWORD:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
};
export const servService = {
  getAllServices: async (
    page: number = 1,
    limit: number = 35,
  ): Promise<GetAllServicesResponse> => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/services`,
      );
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/services", {
        withCredentials: true,

        params: {
          page,
          limit,
        },
      });
      // ✅ Check response status manually like `fetch`

      // if (process.env.NODE_ENV === "development") {
      //   console.log("Response:", response.data);
      // }

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SERVICES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  // ✅ Get services by category
  getServicesByCategory: async (categoryId: string) => {
    try {
      const response = await authClient.get(
        `/services/category/${categoryId}`,
        {},
      );

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error Response SERVICES:", error);
      throw error;
    }
  },
  // ✅ Get service by ID
  getServiceByID: async (serviceId: string) => {
    try {
      const response = await authClient.get(`/services/${serviceId}`, {});
      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error Response SERVICES:", error);
      throw error;
    }
  },
};
export const categoriesService = {
  getAllCategories: async (
    page: number = 1,
    limit: number = 35,
  ): Promise<GetAllCategoriesResponse> => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/categories`,
      );
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/categories", {
        withCredentials: true,
        params: {
          page,
          limit,
        },
      });
      // ✅ Check response status manually like `fetch`

      // if (process.env.NODE_ENV === "development") {
      //   console.log("Response:", response.data);
      // }

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "CATEGORIES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response CATEGORIES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  // ✅ Get service by ID
  getCategoryByID: async (
    categoryID: string,
    page: number = 1,
    limit: number = 35,
  ) => {
    try {
      const response = await authClient.get(`/categories/${categoryID}`, {
        params: {
          page,
          limit,
        },
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error Response SERVICES:", error);
      throw error;
    }
  },
  getSubByCatId: async (
    categoryID: string,
    page: number = 1,
    limit: number = 35,
  ): Promise<GetAllSubCatResponse> => {
    try {
      const response = await authClient.get(
        `/categories/${categoryID}/subcategories`,
        {
          params: {
            page,
            limit,
          },
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      );
      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error Response SERVICES:", error);
      throw error;
    }
  },
};
export const bookingService = {
  createBooking: async (values: CreateBookingSchemaType) => {
    const session = await getSession();
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/bookings`,
      );
      console.log("Payload:", values);
    }

    try {
      // ✅ Log headers before making the request

      const response = await authClient.post("/booking", values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      // ✅ Check response status manually like `fetch`

      // if (process.env.NODE_ENV === "development") {
      //   console.log("Response:", response.data);
      // }

      return response.data;
    } catch (error) {
      // logger.error({ error }, "Service Creation ACTION Failed");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response BOOKINGS:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  getAllBookings: async () // page: number = 1,
  // limit: number = 35,
  : Promise<GetAllServicesResponse> => {
    const session = await getSession();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/bookings`,
      );
    }
    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/bookings", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SERVICES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  getAvailableDates: async (
    date: string, // page: number = 1,
    // limit: number = 35,
  ): Promise<SlotAvailability> => {
    const session = await getSession();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/saloon-capacity?date=2025-06-12`,
      );
    }
    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/saloon-capacity", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
        params: {
          date,
        },
      });

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SERVICES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  getUserBookings: async () // page: number = 1,
  // limit: number = 35,
  : Promise<Booking[]> => {
    const session = await getSession();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/bookings/user`,
      );
    }
    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/bookings/user", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SERVICES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  getUserGroupBookings: async () // page: number = 1,
  // limit: number = 35,
  : Promise<Booking[]> => {
    const session = await getSession();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/bookings/user`,
      );
    }
    try {
      // ✅ Log headers before making the request

      const response = await authClient.get("/bookings/user/group", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      logger.error({ error }, "SERVICES FETCHING FAILED");

      if (process.env.NODE_ENV === "development") {
        console.error("API Error Response SERVICES:", error);
      }
      throw error; // 👈 **Ensure error is re-thrown for useMutation to catch**
    }
  },
  // ✅ Get BOOKING by ID
  getBookingByID: async (
    token: string,
    serviceId: string,
  ): Promise<Booking> => {
    try {
      const response = await authClient.get(`/bookings/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new ApiError({
          statusCode: 500,
          messages: "Data not found in response",
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error Response SERVICES:", error);
      throw error;
    }
  },
};
