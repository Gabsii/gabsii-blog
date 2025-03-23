// Workaround for multiple root layouts:
// https://github.com/vercel/next.js/discussions/50034
import { notFound } from "next/navigation";

export default function NotFound() {
  return notFound();
}
