import Link from "next/link";
import { TypedLocale } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { Metadata } from "next";

import { getCachedGlobal } from "~/src/lib/globals";
import { localeAlternates } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: tMeta('nowTitle'),
    description: tMeta('nowDescription'),
    alternates: localeAlternates(locale, '/now'),
    openGraph: {
      title: tMeta('nowTitle'),
      description: tMeta('nowDescription'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: tMeta('nowTitle'),
      description: tMeta('nowDescription'),
    },
  };
}

export default async function NowPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('General');

  const { content, updatedAt } = await getCachedGlobal('now', 1, locale as TypedLocale)() as { updatedAt: string, content: SerializedEditorState | null };

  return (
    <div className="max-w-1200 mx-auto w-full h-full px-2 lg:px-0 py-8 lg:py-24">
      <div className="mb-8">
        <h1 className="font-piazzolla text-8xl">Now</h1>
          <p className="mt-4 mb-2 text-sm lowercase">{t('updatedAt')} {new Date(updatedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })}</p>
      </div>
      <hr className="w-full border-secondary border border-opacity-10 my-8" />
      {content && (
        <section className="content prose max-w-none" dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({data: content}) }}>
        </section>
      )}
      <hr className="w-full border-secondary border border-opacity-10 my-8" />
      <p className="italic">
        This is a <Link className="underline squiggly" href="https://nownownow.com/about">now page</Link> where I will share what I am currently working on, learning, or exploring.
      </p>
    </div>
  )
}
