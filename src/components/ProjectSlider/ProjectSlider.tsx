import Image from "next/image";

const mockProjects: Project[] = [
  {
    title: 'WatchProject',
    image: 'https://placewaifu.com/image/1200/600',
    link: '/projects/watch-project',
  },
  {
    title: 'WatchProject2',
    image: 'https://placewaifu.com/image/1200/600',
    link: '/projects/watch-project-2',
  }
];

export default function ProjectSlider() {
  return (
    <section className="bg-secondary text-primary h-screen w-full flex justify-center" id="slider">
      <div className="max-w-1200 w-full flex flex-col flex-wrap m-24 relative overflow-hidden">
        {mockProjects.map((project, i) => (
          <ProjectSlide key={project.title} project={project} current={i} total={mockProjects.length < 10 ? `0${mockProjects.length}` : mockProjects.length} />
        ))}
      </div>
    </section>
  )
}

type Project = {
  title: string;
  image: string;
  link: string;
}

const ProjectSlide = ({ project, current, total }: { project: Project, current: number, total: string | number }) => {
  return (
    <div className="relative h-full w-full mr-56">
      {/* TODO: remove unoptimized (only for testing) */}
      <Image
        src={project.image}
        alt={project.title}
        width={1200}
        height={600}
        className="absolute left-0 top-0 w-full h-full object-cover"
        unoptimized
      />
      <div className="z-10 h-full w-full absolute left-0 top-0 bg-gradient-to-b from-transparent to-black font-piazzolla p-10 flex flex-col justify-end text-primary">
        <h2 className="text-6xl">{project.title}</h2>
        <p className="text-4xl">{current + 1 < 10 ? `0${current + 1}` : current} / {total}</p>
      </div>
    </div>
  )
}
