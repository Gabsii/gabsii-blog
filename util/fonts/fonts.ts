import localFont from "next/font/local";
import { Piazzolla } from "next/font/google";

export const piazzolla = Piazzolla({
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-piazzolla",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const suisseIntl = localFont({
  src: [
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Black-Web.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-BlackItalic-Web.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Bold-Web.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-BoldItalic-Web.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Book-Web.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-BookItalic-Web.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Light-Web.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-LightItalic-Web.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Medium-Web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-MediumItalic-Web.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Regular-Web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-RegularItalic-Web.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-SemiBold-Web.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-SemiBoldItalic-Web.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Thin-Web.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-ThinItalic-Web.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-Ultralight-Web.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/SuisseIntl/SuisseIntl-UltralightItalic-Web.woff2",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-suisse-intl",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
