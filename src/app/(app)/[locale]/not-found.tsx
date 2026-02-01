"use client";

import Button from "~/src/components/Atoms/Button";
// import { Link } from "~/src/lib/i18n";

export const metadata = {
  title: "404 - Page Not Found | Gabsii",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="p-8 lg:p-24 relative h-screen">
      <div className="max-w-1200 mx-auto w-full flex flex-col">
        <h1 className="font-piazzolla text-7xl mb-4">404 - Page Not Found</h1>
        <p className="text-4xl pb-8">Looks like our code took a detour on the way to production!</p>
        {/* <Link href="/">
          <Button isInverted>
            Return Home
          </Button>
        </Link> */}
      </div>
    </section>
  )
}
