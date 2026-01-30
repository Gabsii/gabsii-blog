import { getPayload } from "payload";

import config from '@payload-config';
import { ProjectSliderWrapper } from "./ProjectSlider.client";

export default async function ProjectSlider() {
  try {
    const payload = await getPayload({ config })

    const { docs: projects, totalDocs } = await payload.find({
      collection: 'projects',
      select: {
        title: true,
        image: true,
        slug: true
      }
    })

    if (totalDocs === 0) {
      return null;
    }

    return (
      <section className="bg-secondary text-primary" style={{ height: `${totalDocs * 100}vh` }} id="slider">
        <ProjectSliderWrapper projects={projects} />
      </section>
    )
  } catch (error) {
    console.error('[ProjectSlider] Failed to fetch projects:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Return null to gracefully degrade - user will still see rest of page
    return null;
  }
}
