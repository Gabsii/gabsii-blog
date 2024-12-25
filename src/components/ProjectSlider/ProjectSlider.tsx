import { getPayload } from "payload";

import config from '@payload-config';
import { ProjectSliderWrapper } from "./ProjectSlider.client";

export default async function ProjectSlider() {

  const payload = await getPayload({ config })

  const { docs: projects, totalDocs } = await payload.find({
    collection: 'projects',
    context: {
      select: [
        'title',
        'image',
        'slug'
      ],
    }
  })

  return (
    <section className="bg-secondary text-primary" style={{ height: `${totalDocs * 100}vh` }} id="slider">
      <ProjectSliderWrapper projects={projects} />
    </section>
  )
}
