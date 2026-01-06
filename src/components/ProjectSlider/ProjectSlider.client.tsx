'use client';

import { RefObject, useRef } from 'react';
import Image from 'next/image';
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import type { Project, Media } from '~/payload-types';
import { cn } from '~/util/cn';

type ProjectSliderWrapperProps = Pick<Project, 'title' | 'slug' | 'image'>;

export const ProjectSliderWrapper = ({ projects }: { projects: ProjectSliderWrapperProps[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef as RefObject<HTMLDivElement>,
  })

  const smoothY = useSpring(scrollYProgress, { mass: 0.1 })
  const x = useTransform(smoothY, [0, 1], ["5%", "-50%"])

  return (
    <div ref={targetRef} className="relative h-full">
      <div className={cn("sticky top-0 flex h-screen items-center overflow-hidden", projects.length <= 1 && 'justify-center')}>
        {projects.length > 1 ? (
          /* @ts-ignore fml this is a bug in framer-motion */
          <motion.div style={{ x: x as any }} className="flex">
            {projects.map((project, i) => (
              <ProjectSlide project={project} current={i} total={projects.length} className="mr-56" key={`${project.title}-${i}`} />
            ))}
          </motion.div>
        ) : <ProjectSlide project={projects[0]} current={0} total={1} />}
      </div>
    </div>
  )
}


const ProjectSlide = ({ project, current, total, className }: { project: ProjectSliderWrapperProps, current: number, total: number, className?: string }) => {
  const image = project.image as Media;

  return (
    // TODO: fallback image ?
    <Link href={`/projects/${project.slug}`} className={cn("relative h-[66vh] shrink-0 w-[90vw] max-w-[1500px]", className)}>
      <Image
        src={image?.url || ''}
        alt={project.title || 'Project Image'}
        width={1200}
        height={650}
        className="object-cover h-full w-full"
      />
      <div className="z-10 h-full w-full absolute left-0 top-0 bg-linear-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-light text-white">
        <h2 className="text-4xl lg:text-6xl leading-normal">{project.title}</h2>
        <p className="text-2xl lg:text-4xl">{current + 1 < 10 ? `0${current + 1}` : current} / {total < 10 ? `0${total}` : total}</p>
      </div>
    </Link>
  )
}
