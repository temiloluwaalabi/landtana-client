/* eslint-disable camelcase */
import { Cormorant_Garamond, Instrument_Sans, Lora } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "700", "600"],
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "700", "600"],
});
export const iSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-isans",
  weight: ["400", "500", "700", "600"],
});
