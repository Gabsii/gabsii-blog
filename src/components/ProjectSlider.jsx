import { motion } from 'framer-motion';
import React from 'react'
import styled from 'styled-components';

import TriangleBox from './TriangleBox';
import { breakpoints } from '../js/constants';

const ProjectShowcase = styled.div`
  width: 100%;
  
  display: grid;
  grid-gap: 10px 20px;
  grid-template-columns: repeat(2, 150px);
  justify-content: center;

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(4, 150px);
  }

  @media ${breakpoints.lg} {
    grid-template-columns: repeat(6, 150px);
  }
`;

const Img = styled(motion.img)`
  height: 150px;
  width: 150px;

  scroll-snap-align: start;
  transition: all 0.25s;

  &:hover {
    cursor: pointer;
  }

  /* todo: add transition */

  ${({isactive}) => isactive && `
    // outline: 2px solid #9efafe; 
    box-shadow: rgba(255, 255, 190, 0.4) 0px 0px 6px 2px;
    border: 1px solid rgba(248,247,217, 1); 
  `}
`;

const ProjectWrapper = styled.div`
  position: relative;
  transform-origin: 50% 50% 0px;

  height: 150px; 
  width: 150px;
`

const ProjectSlider = ({projects, activeIndex, setActiveProject}) => {
  return (
    <>
      <ProjectShowcase>
      {projects.map((project, index) => 
        <ProjectWrapper key={`project-${index}`}>
          { index === activeIndex && <TriangleBox />}
          <Img 
            src={project.node.better_featured_image.media_details.sizes.thumbnail.source_url} 
            alt={project.node.better_featured_image.alt_text}
            loading='lazy'
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            height="150"
            width="150"
            isactive={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveProject(index)}
          />
        </ProjectWrapper>
      )}
      </ProjectShowcase>
    </>
  )
}

ProjectSlider.defaultProps = {
  projects: [{}],
  activeIndex: 0
}

export default ProjectSlider;
