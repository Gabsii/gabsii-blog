import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

// Keeps /sitemap.xml in sync whenever sitemap-listed content is published,
// edited or removed in the admin panel.
export const revalidateSitemapAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating sitemap')
  revalidatePath('/sitemap.xml')

  return doc
}

export const revalidateSitemapAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating sitemap')
  revalidatePath('/sitemap.xml')

  return doc
}
