import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { routing } from '@/i18n/routing'
import { localePath } from '@/lib/seo'
import config from '@payload-config';

const BASE_URL = 'https://gabsii.com';

type Page = Pick<MetadataRoute.Sitemap[number], 'lastModified' | 'changeFrequency' | 'priority'> & {
  path: string
}

const absoluteUrl = (locale: string, path: string) => {
  const localised = localePath(locale, path);
  return localised === '/' ? BASE_URL : `${BASE_URL}${localised}`;
};

const languages = (path: string) => ({
  ...Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(locale, path)])),
  // shown to users whose language matches neither locale
  'x-default': absoluteUrl(routing.defaultLocale, path),
});

/**
 * Google requires a separate <url> element per language version, each repeating
 * the full alternate set including a self-reference — listing the alternates
 * under a single <loc> leaves the other languages unlisted.
 */
const entriesFor = ({ path, ...rest }: Page): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    alternates: { languages: languages(path) },
    ...rest,
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Fetch projects and posts in parallel
  const [{ docs: projects }, { docs: posts }] = await Promise.all([
    payload.find({
      collection: 'projects',
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      }
    }),
    payload.find({
      collection: 'post',
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      }
    })
  ]);

  const staticPages: Page[] = ([
    { path: '', changeFrequency: 'yearly', priority: 1 },
    { path: '/now', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.9 },
    { path: '/imprint', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ] as Omit<Page, 'lastModified'>[]).map((page) => ({ ...page, lastModified: new Date() }));

  const projectPages: Page[] = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'yearly',
    // below the home page, alongside /services — the portfolio centrepiece
    priority: 0.9,
  }));

  const postPages: Page[] = posts.map((post) => ({
    path: `/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages, ...postPages].flatMap(entriesFor)
}
