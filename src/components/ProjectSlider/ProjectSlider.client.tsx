'use client';

import { RefObject, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import type { Project, Media } from '~/payload-types';

export const ProjectSliderWrapper = ({ projects }: { projects: Project[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef as RefObject<HTMLDivElement>,
  })

  const smoothY = useSpring(scrollYProgress, { mass: 0.1 })
  const x = useTransform(smoothY, [0, 1], ["5%", "-50%"])

  return (
    <div ref={targetRef} className="relative h-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* @ts-ignore fml this is a bug in framer-motion */}
        <motion.div style={{ x: x as any }} className="flex">
          {projects.map((project, i) => (
            <ProjectSlide project={project} current={i} total={projects.length < 10 ? `0${projects.length}` : projects.length} key={`${project.title}-${i}`} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}


const ProjectSlide = ({ project, current, total }: { project: Project, current: number, total: string | number }) => {
  const image = project.image as Media;

  return (
    // TODO: fallback image ?
    <Link href={`/projects/${project.slug}`} className="relative h-[66vh] flex-shrink-0 w-[90vw] max-w-[1500px] mr-56">
      <Image
        src={image?.url || ''}
        alt={project.title || 'Project Image'}
        width={1200}
        height={650}
        className="object-cover h-full w-full"
      />
      <div className="z-10 h-full w-full absolute left-0 top-0 bg-gradient-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-primary">
        <h2 className="text-4xl lg:text-6xl leading-normal">{project.title}</h2>
        <p className="text-2xl lg:text-4xl">{current + 1 < 10 ? `0${current + 1}` : current} / {total}</p>
      </div>
    </Link>
  )
}
