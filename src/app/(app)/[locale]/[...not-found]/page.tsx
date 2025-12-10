// Workaround for multiple root layouts:
// https://github.com/vercel/next.js/discussions/50034
import { log } from "console";
import { notFound } from "next/navigation";

export default function NotFound() {
  log("404 - Page Not Found");
  return notFound();
}
