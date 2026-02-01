import { getPayload, TypedLocale } from "payload"
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import config from '@payload-config';
import { Media, Post } from "~/payload-types";
import PostContentRegistry from "@/components/PostContentRegistry/PostContentRegistry";
import PostHeroImage from "@/components/Blocks/PostHeroImage";
import ContactForm from "@/components/ContactForm/ContactForm";
import Section from "@/components/Atoms/Section";
import { ArticleJsonLd } from "@/components/JsonLd";

type PostPageParams = Promise<{
    slug: string,
    locale: string
}>

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: PostPageParams }): Promise<Metadata> {
  const { slug, locale } = await params;

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'post',
    locale: locale as TypedLocale,
    where: {
      slug: { equals: slug }
    },
    limit: 1,
  });

  const post = docs[0] as Post | undefined;

  if (!post) {
    return {
      title: 'Post Not Found | Gabsii',
    };
  }

  const image = post.titleImage as Media | undefined;
  const description = post.subtitle || `Explore the ${post.title} post by Gabsii - Digital Innovation & Web Solutions`;

  return {
    title: `${post.title} | Gabsii Posts`,
    description,
    alternates: {
      canonical: `/posts/${slug}`,
      languages: {
        'en': `/posts/${slug}`,
        'de': `/de/posts/${slug}`,
      }
    },
    openGraph: {
      title: `${post.title} | Gabsii Posts`,
      description,
      type: 'article',
      ...(image?.url && { images: [{ url: image.url, width: 1200, height: 650, alt: post.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Gabsii Posts`,
      description,
      ...(image?.url && { images: [image.url] }),
    },
  };
}

export async function generateStaticParams() {
  const posts = await (await getPayload({ config })).find({
    collection: 'post',
    context: {
      select: [
        'slug',
      ],
    }
  })

  const locales = ['en', 'de']; // Match your supported locales
  const params: Array<{ slug: string; locale: string }> = [];

  posts.docs.forEach((post) => {
    locales.forEach((locale) => {
      params.push({
        slug: post.slug,
        locale,
      });
    });
  });

  return params;
}

export default async function PostPage({ params }: { params: PostPageParams }) {
  const { slug, locale } = await params;

  const { totalDocs, docs } = await (await getPayload({ config })).find({
    collection: 'post',
    locale: locale as TypedLocale,
    where: {
      slug: {
        equals: slug
      },
    }
  });

  if (totalDocs === 0 || !docs[0]) {
    notFound();
  }

  const post = docs[0] as Post;
  const image = post.titleImage as Media | undefined;

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        description={post.subtitle ?? undefined}
        url={`https://gabsii.com/posts/${slug}`}
        image={image?.url ?? undefined}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <Hero post={post} />
      <PostContentRegistry content={post.content} />
      <ContactForm title="Let's work together" />
    </>
  )
}

const Hero = ({ post }: { post: Post }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const publishedAtFormatted = dateFormatter.format(new Date(post.publishedAt));

  return (
    <section className="mx-auto max-h-screen">
      <div className="relative">
        <PostHeroImage
          image={post.titleImage}
          title={post.title}
        />
        <div className="z-10 h-full w-full absolute left-0 top-0 bg-linear-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-primary" />
      </div>
      <Section as="div" className="grid lg:grid-cols-2 gap-x-5 lg:mt-12 text-secondary lg:pl-0 lg:px-2 px-2">
        <div>
          <h1 className="font-piazzolla font-semibold text-4xl lg:text-6xl">{post.title}</h1>
          <time className="font-suisse font-normal lg:text-xl inline-block mt-5">{publishedAtFormatted}</time>
        </div>
        <div>
          <h2 className="font-suisse font-normal lg:text-xl text-right leading-normal pt-4">{post.subtitle}</h2>
        </div>
      </Section>
    </section>
  )
}

