"use server";

import { categoriesService, servService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/client";
import { UnauthorizedError } from "@/lib/error";
import logger from "@/lib/logger";

export const getAllServices = async () => {
  try {
    const services = await servService.getAllServices();

    return {
      success: true,
      services,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING SERVICES");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching all services failed",
      status: 500,
    };
  }
};
export const getAllCategories = async () => {
  try {
    // const session = await getSession();
    // if (!session || !session.isLoggedIn) {
    //   throw new UnauthorizedError();
    // }
    const categories = await categoriesService.getAllCategories();

    return {
      success: true,
      categories: categories.categories,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING SERVICES");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching all services failed",
      status: 500,
    };
  }
};

export const getServiceById = async (id: string) => {
  try {
    const service = await servService.getServiceByID(id);

    logger.info("Service Successfully Fetched");

    return {
      success: true,
      service,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING SERVICES");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching service failed",
      status: 500,
    };
  }
};
export const getCategoryByID = async (id: string) => {
  try {
    const category = await categoriesService.getCategoryByID(id);

    logger.info("Category Successfully Fetched");

    return {
      success: true,
      category,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING CATEGORY");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching category failed",
      status: 500,
    };
  }
};
export const getSubCategoriesByCategoryID = async (id: string) => {
  try {
    const category = await categoriesService.getSubByCatId(id);

    logger.info("sub Successfully Fetched");

    return {
      success: true,
      category: category.categories,
    };
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING SUBCATEGORY");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching sub-category failed",
      status: 500,
    };
  }
};

export const getServicesByCategory = async (category: string) => {
  try {
    // const session = await getSession();
    // if (!session || !session.isLoggedIn) {
    //   throw new UnauthorizedError();
    // }
    return await servService.getServicesByCategory(category);
  } catch (error) {
    logger.error({ error }, "FAILED FETCHING SERVICES");

    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        rawErrors: error.rawErrors,
        status: error.statusCode,
      };
    }

    return {
      success: false,
      message: "Fetching all services by category failed",
      status: 500,
    };
  }
};
