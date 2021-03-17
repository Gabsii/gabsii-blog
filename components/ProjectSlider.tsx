import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import NextImage from 'next/image';

import TriangleBox from './TriangleBox'
import { breakpoints } from '../utils/constants'
import { ProjectsOverview } from '../types/entries'

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
`

const ImgWrapper = styled(motion.div)`
  z-index: 1;

  div {
    position: static !important;
  }
`

const Img = styled(NextImage)<{isActive: boolean}>`
  height: 150px;
  width: 150px;

  z-index: 0;
  object-fit: cover;
  scroll-snap-align: start;
  transition: all 0.25s;

  &:hover {
    cursor: pointer;
  }

  /* todo: add transition */

  ${({ isActive }) =>
    isActive &&
    `
    // outline: 2px solid #9efafe; 
    box-shadow: rgba(255, 255, 190, 0.4) 0px 0px 6px 2px;
    border: 1px solid rgba(248,247,217, 1) !important; 
  `}
`

const ProjectWrapper = styled.div`
  position: relative;
  transform-origin: 50% 50% 0px;

  height: 150px;
  width: 150px;
`

type ProjectSliderProps = {
  projects: ProjectsOverview, 
  activeIndex: Number, 
  setActiveProject: Dispatch<SetStateAction<number>>
};

const ProjectSlider = ({ projects, activeIndex, setActiveProject }: ProjectSliderProps) => {
  return (
    <>
      <ProjectShowcase>
        {projects.map((project, index) => (
          <ProjectWrapper key={`project-${index}`}>
            {index === activeIndex && <TriangleBox />}
            <ImgWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              >
              <Img
                src={project.coverImage}
                alt={project.title}
                height="150"
                width="150"
                isActive={index === activeIndex}
                onMouseOver={() => setActiveProject(index)}
                priority
                />
            </ImgWrapper>
          </ProjectWrapper>
        ))}
      </ProjectShowcase>
    </>
  )
}

ProjectSlider.defaultProps = {
  projects: [{}],
  activeIndex: 0,
}

export default ProjectSlider
