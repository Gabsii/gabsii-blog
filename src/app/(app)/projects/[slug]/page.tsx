import { getPayload } from "payload"
import { notFound } from "next/navigation";
import Image from "next/image";

import config from '@payload-config';
import { Media, Project } from "~/payload-types";
import HeroButton from "./HeroButton";
import { ServicesOptions } from "@/collections/Projects";
import ProjectContentRegistry from "@/components/ProjectContentRegistry/ProjectContentRegistry";
import ContactForm from "@/components/ContactForm/ContactForm";
import Section from "@/components/Atoms/Section";

type ProjectPageParams = Promise<{
    slug: string
}>
type ServiceValue = typeof ServicesOptions[number]['value'];

const mappedServices: Record<ServiceValue, string> = ServicesOptions.reduce((obj, { value, label }) => ({ ...obj, [value as ServiceValue]: label }), {} as Record<ServiceValue, string>);

export async function generateStaticParams() {
  const projects = await (await getPayload({ config })).find({
    collection: 'projects',
    context: {
      select: [
        'slug',
      ],
    }
  })

  const slugs = projects.docs.map((project) => ({
    slug: project.slug,
  }));

  console.log(slugs);

  return slugs
}

// @ts-ignore
export default async function ProjectPage({ params: { slug } }: { params: ProjectPageParams }) {
  const { totalDocs, docs } = await (await getPayload({ config })).find({
    collection: 'projects',
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

  return (
    <>
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
          className="object-cover h-[50vh] lg:h-auto max-h-[650px] w-full"
        />
        <div className="z-10 h-full w-full absolute left-0 top-0 bg-gradient-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-primary" />
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

