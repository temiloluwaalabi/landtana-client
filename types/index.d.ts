export interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  gender: string | null;
  phone_no: string | null;
  city: string | null;
  country: string | null;
  avatar: string | null;
  is_verified: boolean;
  is_onboarded: boolean;
  provider: string | null;
  provider_id: string | null;
  role: string;
  created_at: Date;
  updated_at: Date;
  // bookings: Booking[];
}

export interface LoginResponse {
  id: string;
  access_token: string;
  email: string;
  role: string;
  is_onboarded: boolean;
  first_name: null;
}
interface TimeSlot {
  startTime: string; // ISO format or "HH:MM" format
  endTime: string;
  available?: boolean;
}
interface StylistAvailability {
  id: string;
  name: string;
  avatar: string;
  availableSlots: TimeSlot[];
}
export interface AvailabilityResponse {
  dates: {
    [date: string]: {
      available: boolean;
      fullyBooked?: boolean;
      bookedSlot?: TimeSlot[];
      message?: string;
      stylists?: StylistAvailability[];
    };
  };
}

export interface Stylist {
  id: string;
  bio: string;
  specializations: string[];
  available_slots: string[] | null;
  booked_slots: string[];
}

export interface GetAllStylistsResponse {
  stylists: Stylist[];
  total: number;
}

export interface GetStylistByIdResponse {
  stylist: Stylist;
}
export interface StyleOption {
  id: string;
  name: string;
  price: string;
  duration: number;
  service_id: string;
}
export interface Service {
  id: string;
  name: string;
  description: string;
  base_price: string;
  duration: number;
  category_id: null | string;
  aftercare_tips: null | string;
  images: string[];
  is_active: boolean;
  featured_image: null | string;

  is_addon: boolean;
  created_by: string;
  updated_by: string;
  is_deleted: boolean;
  deleted_at: null;
  deleted_by: null;
  created_at: Date;
  style_options: StyleOption[];
  variations: StyleOption[];

  updated_at: Date;
}
export interface GetAllServicesResponse {
  services: Service[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  is_deleted: boolean;
  parent_id: string | null;
  deleted_at: null;
  deleted_by: null;
  created_at: Date;
  updated_at: Date;
  parent?: Category;
  services?: Service[];
}

export type GetAllCategoriesResponse = {
  categories: Category[];
  total: number;
};
export type Booking = {
  id: string;
  booking_datetime: Date;
  status: string;
  additional_notes: string;
  user: User;
  services: Service[];
  created_at: Date;
  updated_at: Date;
};
export interface GetAllSubCatResponse {
  categories: Category[];
  count: number;
}
