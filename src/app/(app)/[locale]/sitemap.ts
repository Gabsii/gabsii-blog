import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    select: {
      slug: true
    }
  })

  const projectsUrls = projects.map((project) => ({
    url: `https://gabsii.com/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
    alternates: {
      languages: {
        de: `https://gabsii.com/de/projects/${project.slug}`,
      }
    }
  }))

  return [
    {
      url: 'https://gabsii.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          de: 'https://gabsii.com/de',
        }
      }
    },
    {
      url: 'https://gabsii.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          de: 'https://gabsii.com/de/contact',
        }
      }
    },
    {
      url: 'https://gabsii.com/imprint',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          de: 'https://gabsii.com/de/imprint',
        }
      }
    },
    {
      url: 'https://gabsii.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          de: 'https://gabsii.com/de/privacy',
        }
      }
    },
    ...projectsUrls
  ]
}
