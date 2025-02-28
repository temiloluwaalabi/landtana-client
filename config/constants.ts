import { AvailabilityResponse } from "@/types";

import { ServiceCategories } from "./enums";

export const servicesCategories = Object.values(ServiceCategories).map(
  (serv) => {
    const imageUrlMap: Record<ServiceCategories, string> = {
      [ServiceCategories.BRAIDING]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748137/landtana/92c01e2888429b399fe39527925d03db_oveh9w.png",
      [ServiceCategories.EXTENSION]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748142/landtana/DALL_E_2025-02-17_00.20.11_-_A_luxurious_hair_salon_offering_hair_extensions_showing_a_stylist_carefully_applying_long_voluminous_hair_extensions_to_a_client._The_salon_has_a_mo_hhlv6v.webp",
      //   [ServiceCategories.COLORING]:
      //     "https://res.cloudinary.com/davidleo/image/upload/v1739748139/landtana/DALL_E_2025-02-17_00.20.14_-_A_vibrant_hair_salon_scene_focused_on_hair_coloring_services_showing_a_professional_stylist_applying_hair_dye_to_a_client_s_hair_with_precision._The_yyn2iu.webp",
      [ServiceCategories.BARBING]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748141/landtana/DALL_E_2025-02-17_00.20.17_-_A_modern_barbershop_offering_barbing_services_featuring_a_skilled_barber_using_clippers_to_give_a_precise_haircut_to_a_male_client._The_barbershop_ha_hyksnm.webp",
      //   [ServiceCategories.OSTEOPATHY]:
      //     "https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/DALL_E_2025-02-17_00.20.21_-_A_serene_osteopathy_clinic_offering_therapeutic_services_showing_an_osteopath_gently_treating_a_client_s_neck_and_shoulders._The_clinic_has_a_calming_miscan.webp",
      //   [ServiceCategories.TREATMENTS]:
      //     "https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/DALL_E_2025-02-17_00.20.25_-_A_high-end_hair_salon_specializing_in_hair_treatments_showing_a_stylist_applying_a_nourishing_hair_mask_to_a_client_s_hair._The_salon_features_a_rela_rn2n6i.webp",
      [ServiceCategories.BLOWDRY]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/DALL_E_2025-02-17_00.20.36_-_A_chic_hair_salon_offering_blow-drying_services_showing_a_stylist_using_a_professional_hair_dryer_and_round_brush_to_style_a_client_s_hair._The_salon_ovmapu.webp",
      [ServiceCategories.CUTTING]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748137/landtana/DALL_E_2025-02-17_00.21.17_-_A_stylish_hair_salon_focusing_on_hair_cutting_services_showing_a_professional_hairstylist_using_scissors_to_trim_and_shape_a_client_s_hair._The_salon_oooton.webp",
      [ServiceCategories.CONSULTATION]:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748142/landtana/DALL_E_2025-02-17_00.21.27_-_A_modern_hair_salon_consultation_service_showing_an_expert_stylist_sitting_with_a_client_discussing_hair_care_and_styling_options._The_salon_has_a_w_uo5svw.webp",
    };

    return {
      label: serv,
      value: serv,
      href: `/services/category/${serv}`,
      imageUrl: imageUrlMap[serv],
    };
  }
);

export interface DemoInter {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
}
export const demoservices: DemoInter[] = [
  {
    name: "Box Braids",
    price: 50,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg",
    category: "box-braids",
    rating: 4.8,
  },
  {
    name: "Knotless Braids",
    price: 60,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726281/landtana/IMG-20250114-WA0022_lqkpls.jpg",
    rating: 5.0,
    category: "knotless-braids",
  },
  {
    name: "Cornrows",
    price: 40,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0026_advegw.jpg",
    rating: 4.2,
    category: "cornrows",
  },
  {
    name: "Fulani Braids",
    price: 55,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg",
    rating: 4.9,
    category: "fulani-braids",
  },
  {
    name: "Ghana Weaving",
    price: 50,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726296/landtana/IMG-20250114-WA0042_avbyia.jpg",
    rating: 4.8,
    category: "ghana-weaving",
  },
  {
    name: "Senegalese Twists",
    price: 65,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg",
    rating: 5.0,
    category: "senegalese-twists",
  },
  {
    name: "Passion Twists",
    price: 60,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726302/landtana/IMG-20250114-WA0036_uir5it.jpg",
    rating: 4.6,
    category: "passion-twists",
  },
  {
    name: "Feed-in Braids",
    price: 45,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg",
    rating: 4.3,
    category: "feed-in-braids",
  },
  {
    name: "Lemonade Braids",
    price: 55,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726307/landtana/IMG-20250114-WA0035_crydoz.jpg",
    rating: 4.7,
    category: "lemonade-braids",
  },
  {
    name: "Butterfly Locs",
    price: 70,
    imageUrl:
      "https://res.cloudinary.com/davidleo/image/upload/v1739726281/landtana/IMG-20250114-WA0021_vnsggh.jpg",
    rating: 4.6,
    category: "butterfly-locs",
  },
];

export const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What are your operating hours?",
        answer:
          "Our salon is open Monday to Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays.",
      },
      {
        question: "Where are you located?",
        answer:
          "We are located at 1234 Crown Street, Lagos, Nigeria. You can find us on Google Maps for easy navigation.",
      },
      {
        question: "Do I need to book an appointment in advance?",
        answer:
          "Yes, we recommend booking an appointment in advance to secure your preferred time slot.",
      },
      {
        question: "Do you accept walk-ins?",
        answer:
          "We do accept walk-ins, but availability is not guaranteed. Booking in advance is recommended.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via email at support@landtanacrownbraids.com or call us at +234-123-456-7890.",
      },
      {
        question: "Do you offer home services?",
        answer:
          "Yes, we offer home services at an additional cost. Please check the Home Services section for more details.",
      },
    ],
  },
  {
    category: "Booking & Appointments",
    questions: [
      {
        question: "How do I book an appointment?",
        answer:
          "You can book an appointment through our website by selecting your preferred service, date, and time.",
      },
      {
        question: "Can I choose my stylist?",
        answer:
          "No, stylists are assigned by the administrator based on availability.",
      },
      {
        question: "What happens if I am late for my appointment?",
        answer:
          "We offer a 15-minute grace period. After this, your appointment may be canceled or rescheduled.",
      },
      {
        question: "How can I cancel or reschedule my appointment?",
        answer:
          "You can cancel or reschedule your appointment through the booking section on your dashboard.",
      },
      {
        question: "Is there a cancellation fee?",
        answer:
          "Yes, cancellations made within 24 hours of the appointment will incur a 20% cancellation fee.",
      },
      {
        question: "Do you send appointment reminders?",
        answer:
          "Yes, you will receive reminders via email and SMS 24 hours before your appointment.",
      },
    ],
  },
  {
    category: "Services",
    questions: [
      {
        question: "What types of braiding services do you offer?",
        answer:
          "We offer a variety of braiding styles including box braids, cornrows, twists, and faux locs.",
      },
      {
        question: "Do you provide hair extensions?",
        answer:
          "Yes, we provide hair extensions at an additional cost. You can also bring your own.",
      },
      {
        question: "How long does a braiding session take?",
        answer:
          "The duration depends on the style. Box braids take about 4-6 hours, while cornrows take 1-2 hours.",
      },
      {
        question: "Can I wash my hair before coming?",
        answer:
          "Yes, we recommend washing your hair before your appointment. We also offer hair washing services if needed.",
      },
      {
        question: "Do you offer aftercare tips?",
        answer:
          "Yes, we provide aftercare tips for every braiding style to help maintain your hair.",
      },
      {
        question: "Can I book multiple services in one session?",
        answer:
          "Yes, you can book multiple services, but the duration will be adjusted accordingly.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How much do your services cost?",
        answer:
          "Our prices vary depending on the service. Please visit the services page for detailed pricing.",
      },
      {
        question: "Do you require a deposit?",
        answer: "Yes, a 50% deposit is required to secure your booking.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit/debit cards, bank transfers, and mobile payments.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          "No, full payment must be made before or after the service is completed.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refunds are only available for cancellations made 48 hours before the appointment.",
      },
    ],
  },
  {
    category: "Salon Policies",
    questions: [
      {
        question: "Are children allowed in the salon?",
        answer: "Children are welcome but must be supervised at all times.",
      },
      {
        question: "What is your late arrival policy?",
        answer:
          "We allow a 15-minute grace period. If you arrive later, your appointment may be rescheduled.",
      },
      {
        question: "Do you allow food and drinks in the salon?",
        answer:
          "No, we do not allow food or drinks in the salon for hygiene reasons.",
      },
      {
        question: "Can I bring a friend or family member to my appointment?",
        answer:
          "Yes, but due to space limitations, we allow only one guest per client.",
      },
    ],
  },
  {
    category: "Gift Cards & Special Offers",
    questions: [
      {
        question: "Do you sell gift cards?",
        answer:
          "Yes, we offer gift cards in different amounts. They can be purchased online or in-store.",
      },
      {
        question: "How do I redeem a gift card?",
        answer: "Enter the gift card code at checkout when booking a service.",
      },
      {
        question: "Do gift cards expire?",
        answer: "Yes, gift cards expire 12 months from the date of purchase.",
      },
      {
        question: "Do you offer discounts for referrals?",
        answer: "Yes, refer a friend and get 10% off your next appointment.",
      },
    ],
  },
  {
    category: "Support & Technical Issues",
    questions: [
      {
        question:
          "I'm having trouble booking an appointment. What should I do?",
        answer:
          "Please try clearing your browser cache or contact our support team for assistance.",
      },
      {
        question:
          "I didn't receive my booking confirmation email. What should I do?",
        answer:
          "Check your spam folder. If you still don’t see it, contact support to verify your booking.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Go to the login page and click on 'Forgot Password' to reset your password.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "You can update your profile details in the 'Profile' section of your dashboard.",
      },
    ],
  },
];

export // Sample data that would come from backend
const sampleAvailabilityData: AvailabilityResponse = {
  dates: {
    "2025-01-13": {
      available: true,
      bookedSlot: [
        { startTime: "10:00 am", endTime: "10:45 am", available: true },
        { startTime: "11:00 am", endTime: "11:45 am", available: true },
        { startTime: "12:00 pm", endTime: "12:45 pm", available: true },
        { startTime: "1:00 pm", endTime: "1:45 pm", available: true },
        { startTime: "2:00 pm", endTime: "2:45 pm", available: false },
        { startTime: "3:00 pm", endTime: "3:45 pm", available: true },
      ],
    },
    "2025-01-14": {
      available: true,
      bookedSlot: [
        { startTime: "10:00 am", endTime: "10:45 am", available: true },
        { startTime: "11:00 am", endTime: "11:45 am", available: true },
        { startTime: "12:00 pm", endTime: "12:45 pm", available: true },
        { startTime: "1:00 pm", endTime: "1:45 pm", available: true },
        { startTime: "3:00 pm", endTime: "3:45 pm", available: true },
      ],
    },
    "2025-01-15": {
      available: true,
      bookedSlot: [
        { startTime: "10:00 am", endTime: "10:45 am", available: true },
        { startTime: "11:00 am", endTime: "11:45 am", available: true },
      ],
    },
    "2025-01-16": {
      available: false,
      fullyBooked: true,
      message: "Fully booked on this date",
      stylists: [
        {
          id: "stylist1",
          name: "Funky",
          avatar: "FO",
          availableSlots: [],
        },
      ],
    },
    "2025-01-17": {
      available: false,
      fullyBooked: true,
      message: "Fully booked on this date",
    },
    "2025-01-18": {
      available: true,
      bookedSlot: [
        { startTime: "11:00 am", endTime: "11:45 am", available: true },
        { startTime: "1:00 pm", endTime: "1:45 pm", available: true },
      ],
    },
    "2025-02-25": {
      available: true,
      bookedSlot: [
        { startTime: "10:30", endTime: "11:15", available: false },
        { startTime: "10:45", endTime: "11:30", available: false },
        { startTime: "11:00", endTime: "11:45", available: false },
        { startTime: "11:15", endTime: "12:00", available: false },
        { startTime: "11:30", endTime: "12:15", available: false },
        { startTime: "11:45", endTime: "12:30", available: false },
        { startTime: "12:00", endTime: "12:45", available: false },
        { startTime: "13:20", endTime: "14:14", available: false },
      ],
    },
    "2025-02-26": {
      available: false,
      message: "Sorry, no availability.",
    },
    "2025-02-27": {
      available: false,
      message: "Sorry, no availability.",
    },
    "2025-02-28": {
      available: true,
      message: "Choose other available staff",
      stylists: [
        {
          id: "stylist2",
          name: "Jennifer",
          avatar: "JE",
          availableSlots: [
            { startTime: "10:00 AM", endTime: "10:45 AM", available: true },
            { startTime: "11:00 AM", endTime: "11:45 AM", available: true },
          ],
        },
        {
          id: "stylist3",
          name: "Michael",
          avatar: "MI",
          availableSlots: [
            { startTime: "1:00 PM", endTime: "1:45 PM", available: true },
            { startTime: "2:00 PM", endTime: "2:45 PM", available: true },
          ],
        },
      ],
    },
  },
};
