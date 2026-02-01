import { getPayload } from "payload";

import config from '@payload-config';
import type { Post } from "~/payload-types";
import NewsOverviewItem from "./NewsOverviewItem";

/** Subset of Post fields needed for the news overview */
type ArticlePreview = Pick<Post, "title" | "subtitle" | "slug" | "titleImage">;

async function getArticles(): Promise<ArticlePreview[]> {
  try {
    const payload = await getPayload({ config })

    const { docs: posts } = await payload.find({
      collection: 'post',
      select: {
        title: true,
        subtitle: true,
        titleImage: true,
        slug: true
      },
      limit: 10,
      sort: '-publishedAt',
    })

    return posts as ArticlePreview[];
  } catch (error) {
    console.error('[NewsOverview] Failed to fetch posts:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Return null to gracefully degrade - user will still see rest of page
    return [];
  }
}


export default async function NewsOverview() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="my-24 relative" id="news">
      <div className="max-w-1200 mx-auto">
        <h2 className="h-max text-4xl pb-7">Blog/News/Articles/Thoughts</h2>
      </div>
      <hr className="border border-secondary" />
      {articles.map((article) => (
        <NewsOverviewItem key={article.slug} article={article} />
      ))}
    </section>
  )
}
