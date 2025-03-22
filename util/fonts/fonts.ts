import localFont from "next/font/local";
import { Piazzolla } from "next/font/google";

export const piazzolla = Piazzolla({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],  // Only include weights you actually use
  style: ["normal"],
  variable: "--font-piazzolla",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,  // Helps prevent layout shift
});

export const suisseIntl = localFont({
  src: [
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Book.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-suisse-intl",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
