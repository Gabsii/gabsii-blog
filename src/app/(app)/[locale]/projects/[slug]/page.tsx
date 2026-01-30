import { getPayload, TypedLocale } from "payload"
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

import config from '@payload-config';
import { Media, Project } from "~/payload-types";
import HeroButton from "./HeroButton";
import { ServicesOptions } from "@/collections/Projects";
import ProjectContentRegistry from "@/components/ProjectContentRegistry/ProjectContentRegistry";
import ContactForm from "@/components/ContactForm/ContactForm";
import Section from "@/components/Atoms/Section";
import { ProjectJsonLd } from "@/components/JsonLd";

type ProjectPageParams = Promise<{
    slug: string,
    locale: string
}>
type ServiceValue = typeof ServicesOptions[number]['value'];

const mappedServices: Record<ServiceValue, string> = ServicesOptions.reduce((obj, { value, label }) => ({ ...obj, [value as ServiceValue]: label }), {} as Record<ServiceValue, string>);

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: ProjectPageParams }): Promise<Metadata> {
  const { slug, locale } = await params;
  
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    locale: locale as TypedLocale,
    where: {
      slug: { equals: slug }
    },
    limit: 1,
  });

  const project = docs[0] as Project | undefined;
  
  if (!project) {
    return {
      title: 'Project Not Found | Gabsii',
    };
  }

  const image = project.image as Media | undefined;
  const description = project.subtitle || `Explore the ${project.title} project by Gabsii - Digital Innovation & Web Solutions`;

  return {
    title: `${project.title} | Gabsii Projects`,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        'en': `/projects/${slug}`,
        'de': `/de/projects/${slug}`,
      }
    },
    openGraph: {
      title: `${project.title} | Gabsii Projects`,
      description,
      type: 'article',
      ...(image?.url && { images: [{ url: image.url, width: 1200, height: 650, alt: project.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Gabsii Projects`,
      description,
      ...(image?.url && { images: [image.url] }),
    },
  };
}

export async function generateStaticParams() {
  const projects = await (await getPayload({ config })).find({
    collection: 'projects',
    context: {
      select: [
        'slug',
      ],
    }
  })

  const locales = ['en', 'de']; // Match your supported locales
  const params: Array<{ slug: string; locale: string }> = [];

  projects.docs.forEach((project) => {
    locales.forEach((locale) => {
      params.push({
        slug: project.slug,
        locale,
      });
    });
  });

  return params;
}

export default async function ProjectPage({ params }: { params: ProjectPageParams }) {
  const { slug, locale } = await params;

  const { totalDocs, docs } = await (await getPayload({ config })).find({
    collection: 'projects',
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

  const project = docs[0] as Project;
  const image = project.image as Media | undefined;

  return (
    <>
      <ProjectJsonLd
        name={project.title}
        description={project.subtitle ?? undefined}
        url={`https://gabsii.com/projects/${slug}`}
        image={image?.url ?? undefined}
        datePublished={project.dateFrom}
      />
      <Hero project={project} />
      <ProjectContentRegistry {...project} />
      <ContactForm title="Let's work together" />
    </>
  )
}

const Hero = ({ project }: { project: Project }) => {
  const image = project.image as Media;

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const dateFrom = dateFormatter.format(new Date(project.dateFrom));
  const dateTo = project.dateTo ? dateFormatter.format(new Date(project.dateTo)) : null;

  return (
    <section className="mx-auto max-h-screen">
      <div className="relative">
        <Image
          src={image?.url || ''}
          alt={project.title}
          width={1200}
          height={650}
          priority={true}
          className="object-cover h-[50vh] lg:h-auto max-h-162.5 w-full"
        />
        <div className="z-10 h-full w-full absolute left-0 top-0 bg-linear-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-primary" />
      </div>
      <Section as="div" className="grid lg:grid-cols-2 gap-x-5 lg:mt-12 text-secondary">
        <div>
          <h1 className="font-piazzolla font-semibold text-4xl lg:text-6xl">{project.title}</h1>
          {project.services && (
            <ul className="list-none mt-8 pr-4 pb-3 border-b border-secondary w-fit">
              {project.services.map((service, index) => (
                <li key={service} className="inline font-suisse font-normal lg:text-xl">{`${index !== project.services.length - 1 ? `${mappedServices[service]}, ` : `${mappedServices[service]}`}`}</li>
              )
              )}
            </ul>
          )}
          {
            dateFrom && dateTo
              ? (<time className="font-suisse font-normal lg:text-xl inline-block mt-5">{`${dateFrom} - ${dateTo}`}</time>)
              : (<time className="font-suisse font-normal lg:text-xl inline-block mt-5">{`Since ${dateFrom}`}</time>)
          }
        </div>
        <div>
          <h2 className="font-suisse font-normal lg:text-xl text-right leading-normal pt-4">{project.subtitle}</h2>
          <HeroButton url={project.url} />
        </div>
      </Section>
    </section>
  )
}

