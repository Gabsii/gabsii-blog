'use client';

import { RefObject, useRef } from 'react';
import Image from 'next/image';
import { Link } from "@/i18n/navigation";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useInView
} from 'motion/react';

import type { Project, Media } from '~/payload-types';
import { cn } from '~/util/cn';

type ProjectSliderWrapperProps = Pick<Project, 'title' | 'slug' | 'image'>;

export const ProjectSliderWrapper = ({ projects }: { projects: ProjectSliderWrapperProps[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: targetRef as RefObject<HTMLDivElement>,
  });

  // Smooth spring for horizontal scroll
  const smoothProgress = useSpring(scrollYProgress, { 
    mass: 0.1,
    stiffness: 100,
    damping: 20
  });
  
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-50%"]);

  return (
    <div ref={targetRef} className="relative h-full">
      {/* Section Header */}
      <div 
        ref={headerRef}
        className="sticky top-0 z-20 pt-8 pb-4 px-8 lg:px-16 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-baseline justify-between"
        >
          <h2 className="font-piazzolla text-2xl lg:text-3xl font-light tracking-tight">
            Selected Work
          </h2>
          <span className="font-suisse text-sm text-grey uppercase tracking-widest">
            {projects.length.toString().padStart(2, '0')} Projects
          </span>
        </motion.div>
      </div>

      {/* Slider container */}
      <div className={cn(
        "sticky top-0 flex h-screen items-center overflow-hidden",
        projects.length <= 1 && 'justify-center'
      )}>
        {projects.length > 1 ? (
          <motion.div 
            style={{ x }} 
            className="flex pl-8 lg:pl-16"
          >
            {projects.map((project, i) => (
              <ProjectSlide 
                project={project} 
                index={i} 
                total={projects.length} 
                className="mr-12 lg:mr-24" 
                key={`${project.slug}-${i}`} 
              />
            ))}
            {/* End spacer */}
            <div className="w-[20vw] shrink-0" />
          </motion.div>
        ) : (
          <ProjectSlide 
            project={projects[0]} 
            index={0} 
            total={1} 
          />
        )}
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="w-32 lg:w-48 h-px bg-primary/20 overflow-hidden">
          <motion.div 
            className="h-full bg-primary origin-left"
            style={{ scaleX: smoothProgress }}
          />
        </div>
      </div>
    </div>
  );
};


const ProjectSlide = ({ 
  project, 
  index, 
  total,
  className 
}: { 
  project: ProjectSliderWrapperProps;
  index: number;
  total: number;
  className?: string;
}) => {
  const image = project.image as Media;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link 
        ref={cardRef}
        href={`/projects/${project.slug}`} 
        className={cn(
          "group relative block h-[60vh] lg:h-[70vh] shrink-0 w-[85vw] lg:w-[70vw] max-w-[900px]",
          "overflow-hidden",
          className
        )}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image?.url || ''}
            alt={project.title || 'Project Image'}
            fill
            priority={index < 2}
            sizes="(max-width: 1024px) 85vw, 70vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out",
              "group-hover:scale-105"
            )}
          />
        </div>

        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0 z-10",
          "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
          "transition-opacity duration-300",
          "group-hover:from-black/60"
        )} />

        {/* Content */}
        <div className="relative z-20 h-full w-full p-8 lg:p-12 flex flex-col justify-end">
          {/* Project number */}
          <span className={cn(
            "absolute top-8 right-8 lg:top-12 lg:right-12",
            "font-suisse text-sm lg:text-base text-primary/60",
            "transition-colors duration-300",
            "group-hover:text-primary/90"
          )}>
            {(index + 1).toString().padStart(2, '0')}
          </span>

          {/* Title */}
          <h2 className={cn(
            "font-piazzolla text-4xl lg:text-6xl xl:text-7xl",
            "text-light leading-tight tracking-tight",
            "transition-transform duration-300 ease-out",
            "group-hover:translate-x-2"
          )}>
            {project.title}
          </h2>

          {/* View project indicator */}
          <div className={cn(
            "flex items-center gap-3 mt-4",
            "opacity-0 translate-y-2",
            "transition-all duration-300",
            "group-hover:opacity-100 group-hover:translate-y-0"
          )}>
            <span className="font-suisse text-sm uppercase tracking-widest text-primary/80">
              View Project
            </span>
            <span className="text-primary/80">&rarr;</span>
          </div>

          {/* Progress dots */}
          {total > 1 && (
            <div className="flex gap-2 mt-6">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === index 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-primary/30 group-hover:bg-primary/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
