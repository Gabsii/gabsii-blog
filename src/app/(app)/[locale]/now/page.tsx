import { getLocale } from "next-intl/server";
import Link from "next/link";
import { TypedLocale } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { Metadata } from "next";

import { getCachedGlobal } from "~/src/lib/globals";

export const metadata: Metadata = {
  title: "Now - What I'm Currently Working On | Gabsii",
  description: "Discover what Gabsii is currently working on, learning, and exploring. Updated regularly with current projects, interests, and focus areas.",
  alternates: {
    canonical: "/now",
    languages: {
      'en': '/now',
      'de': '/de/now',
    }
  },
  openGraph: {
    title: "Now - What I'm Currently Working On | Gabsii",
    description: "Discover what Gabsii is currently working on, learning, and exploring.",
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Now - What I'm Currently Working On | Gabsii",
    description: "Discover what Gabsii is currently working on, learning, and exploring.",
  },
};

export default async function NowPage() {
  const locale = await getLocale();
  const { content, updatedAt } = await getCachedGlobal('now', 1, locale as TypedLocale)() as { updatedAt: string, content: SerializedEditorState | null };

  return (
    <div className="max-w-1200 mx-auto w-full h-full px-2 lg:px-0 py-8 lg:py-24">
      <div className="mb-8">
        <h1 className="font-piazzolla text-8xl">Now</h1>
          <p className="mt-4 mb-2 text-sm lowercase">updated @ {new Date(updatedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })}</p>
      </div>
      <hr className="w-full border-secondary border border-opacity-10 my-8" />
      {content && (
        <section className="content prose prose-primary max-w-none text-primary" dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({data: content}) }}>
        </section>
      )}
      <hr className="w-full border-secondary border border-opacity-10 my-8" />
      <p className="italic">
        This is a <Link className="underline squiggly" href="https://nownownow.com/about">now page</Link> where I will share what I am currently working on, learning, or exploring.
      </p>
    </div>
  )
}
