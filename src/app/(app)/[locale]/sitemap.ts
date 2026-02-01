import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Fetch projects and posts in parallel
  const [{ docs: projects }, { docs: posts }] = await Promise.all([
    payload.find({
      collection: 'projects',
      select: {
        slug: true,
        updatedAt: true,
      }
    }),
    payload.find({
      collection: 'post',
      select: {
        slug: true,
        updatedAt: true,
      }
    })
  ]);

  const projectsUrls = projects.map((project) => ({
    url: `https://gabsii.com/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 1,
    alternates: {
      languages: {
        en: `https://gabsii.com/projects/${project.slug}`,
        de: `https://gabsii.com/de/projects/${project.slug}`,
      }
    }
  }));

  const postsUrls = posts.map((post) => ({
    url: `https://gabsii.com/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `https://gabsii.com/posts/${post.slug}`,
        de: `https://gabsii.com/de/posts/${post.slug}`,
      }
    }
  }));

  return [
    {
      url: 'https://gabsii.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://gabsii.com',
          de: 'https://gabsii.com/de',
        }
      }
    },
    {
      url: 'https://gabsii.com/now',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://gabsii.com/now',
          de: 'https://gabsii.com/de/now',
        }
      }
    },
    {
      url: 'https://gabsii.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://gabsii.com/contact',
          de: 'https://gabsii.com/de/contact',
        }
      }
    },
    {
      url: 'https://gabsii.com/imprint',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: 'https://gabsii.com/imprint',
          de: 'https://gabsii.com/de/imprint',
        }
      }
    },
    {
      url: 'https://gabsii.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: 'https://gabsii.com/privacy',
          de: 'https://gabsii.com/de/privacy',
        }
      }
    },
    ...projectsUrls,
    ...postsUrls,
  ]
}
