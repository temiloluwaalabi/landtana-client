import { GetAllCategoriesResponse, GetAllServicesResponse } from "@/types";

import { ApiError, authClient } from "../api/client";
import logger from "../logger";
import {
  EmailSchemaType,
  PasswordSchemaType,
} from "../validations/common.schema";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/v1/auth/signin`,
      );
      console.log("Login Credentials:", credentials);
    }

    const response = await authClient.post("/v1/auth/signin", credentials);

    if (process.env.NODE_ENV === "development") {
      console.log("Login Response:", response.data);
    }

    return response.data;
  },
  getUserByID: async (token: string, id: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending login request to:",
        `${authClient.defaults.baseURL}/v1/users`,
      );
    }

    try {
      // ✅ Log headers before making the request
      const headers = authClient.defaults.headers.common;
      console.log("Request Headers:", headers);
      const response = await authClient.get(`/v1/users/${id}`, {
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
    const headers = authClient.defaults.headers.common;
    console.log("Request Headers:", headers);
    const response = await authClient.post("/v1/auth/confirm-email", {
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
    const headers = authClient.defaults.headers.common;
    console.log("Request Headers:", headers);
    const response = await authClient.post(
      "/v1/auth/resend-confirmation-link",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
        `${authClient.defaults.baseURL}/v1/auth/reset-password-link`,
      );
      console.log("Payload:", values);
    }

    try {
      // ✅ Log headers before making the request
      const headers = authClient.defaults.headers.common;
      console.log("Request Headers:", headers);
      const response = await authClient.post(
        "/v1/auth/reset-password-link",
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
        `${authClient.defaults.baseURL}/v1/auth/reset-password`,
      );
      console.log("Payload:", values);
    }

    try {
      // ✅ Log headers before making the request
      const headers = authClient.defaults.headers.common;
      console.log("Request Headers:", headers);
      const response = await authClient.post(
        "/v1/auth/reset-password",
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
        `${authClient.defaults.baseURL}/v1/services`,
      );
    }

    try {
      // ✅ Log headers before making the request
      const headers = authClient.defaults.headers.common;
      console.log("Request Headers:", headers);
      const response = await authClient.get("/v1/services", {
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
        `/v1/services/category/${categoryId}`,
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
      const response = await authClient.get(`/v1/services/${serviceId}`, {});
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
        `${authClient.defaults.baseURL}/v1/categories`,
      );
    }

    try {
      // ✅ Log headers before making the request
      const headers = authClient.defaults.headers.common;
      console.log("Request Headers:", headers);
      const response = await authClient.get("/v1/categories", {
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
  getCategoryByID: async (categoryID: string) => {
    try {
      const response = await authClient.get(`/v1/categories/${categoryID}`, {
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
};
