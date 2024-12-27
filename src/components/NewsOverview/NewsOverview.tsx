import { Link } from "@/lib/i18n";

type Article = {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
}

function getArticles(): Article[] {
  return [
    {
      title: "Article 1",
      subtitle: "Content of article 1",
      slug: "article-1",
      coverImage: "https://placewaifu.com/image"
    },
    {
      title: "Article 2",
      subtitle: "Content of article 2",
      slug: "article-2",
      coverImage: "https://placewaifu.com/image"
    }
  ]
}


export default function NewsOverview() {
  const articles = getArticles();

  return (
    <section className="mt-24 relative" id="news">
      <div className="max-w-1200 mx-auto">
        <h2 className="h-max text-4xl pb-7">News/Blog/Thoughts</h2>
      </div>
      <hr className="border border-secondary" />
      {articles.map((article) => (
        <div className="" key={article.slug}>
          {/* TODO: hover animation (show image) */}
          <Link href={article.slug} className="max-w-1200 mx-auto flex items-end justify-between pt-6 pb-5">
            <h3 className="h-max text-2xl font-piazzolla font-medium">{article.title}</h3>
            <p className="font-light text-ellipsis">{article.subtitle}</p>
          </Link>
          <hr className="border border-secondary" />
        </div>
      ))}
    </section>
  )
}
