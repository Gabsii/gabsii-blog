import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { EntriesOverview } from '../types/entries';

function getSlugByType(type: string): string[]
{
  const postsDirectory = join(process.cwd(), type);
  return fs.readdirSync(postsDirectory);
}

export function getAllEntriesByType(path: string): EntriesOverview
{ 
  const slugs = getSlugByType(path);

  const entries = slugs.map((slug) => {
    const fileContents = fs.readFileSync(`${path}/${slug}/index.md`);
    const { data } = matter(fileContents);

    return {
      slug,
      title: data?.title,
      date: data?.date,
      categories: data?.categories || null,
      coverImage: `${path.replace('public/', '')}/${slug}/images/${data?.coverImage}`,
    }
  }).sort((entry1, entry2) => entry1?.date > entry2?.date ? -1 : 1);

  return entries;
}

