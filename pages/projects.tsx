import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { useWindupString } from 'windups'

import useKeyPress from '../utils/hooks/useKeyPress'
import Header from '../components/Header'
import Main from '../components/Main'
import ProjectSlider from '../components/ProjectSlider'
import Head from '../components/Head'
import { breakpoints, PROJECTS_LOCATION } from '../utils/constants'
import { getAllEntriesByType } from '../utils/entries'
import { EntriesOverview } from '../types/entries'

const pulse = keyframes`
  0% {
    text-shadow: 0px 0px 6px #9EFAFE;
  }

  50% {
    text-shadow: 0px 0px 8px #9EFAFE;
  }

  100% {
    text-shadow: 0px 0px 6px #9EFAFE;
  }
`

const Title = styled.h2`
  width: 100%;
  margin-bottom: 4rem;
  text-align: center;
  font-size: 3rem;
  transition: all;
  animation: 2s ${pulse} ease infinite;

  a {
    text-decoration: none;
    color: #9efafe;
  }
`

const Center = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9efafe;
  font-weight: bold;

  font-family: 'Calamity Sans';
`

const H3 = styled.h3`
  text-align: center;
  font-size: 2rem;
  color: #9efafe;
  line-height: 2.5rem;
  height: 40px;
  text-shadow: 0px 0px 4px #9efafe;
`

const HR = styled(motion.div)<{extended?: boolean}>`
  margin: 10px auto 20px;
  max-width: ${({ extended }) => (extended ? '500px' : '350px')};

  width: 100%;
  opacity: 1;

  transition: width 2s 0.1s cubic-bezier(0.49, 0.02, 0.29, 1.06),
    opacity 0.6s 0.1s ease;
  background-color: #af966d;
  color: #af966d;
  height: 2px;
  position: relative;

  &::before,
  &::after {
    width: 23px;
    height: 6px;
    position: absolute;
    top: 50%;
    background: url('/img/arrow-decoration-tip.svg') center center no-repeat;
  }

  &::before {
    content: '';
    transform: translateY(-50%);
    left: 0;
  }

  &::after {
    content: '';
    transform: translateY(-50%) scaleX(-1);
    right: 0;
  }
`

const Excerpt = styled.p`
  max-width: 400px;
  min-height: 50px;
  text-align: center;
  margin: 0 auto;

  em {
    color: #d27e3f;
    text-shadow: 0px 0px 5px #d27e3f;
  }
`

const ProjectInfo = styled.div`
  width: 100%;
  display: none;

  margin-top: 4rem;

  /* @media ${breakpoints.lg} {
    display: block;
  } */
`

type ProjectProps = {
  projects: EntriesOverview
}

const Projects = ({ projects }: ProjectProps) => {
  const [activeIndex, setActiveProject] = useState(0)
  const leftPressed = useKeyPress('ArrowLeft')
  const rightPressed = useKeyPress('ArrowRight')

  useEffect(() => {
    if (leftPressed && activeIndex > 0) {
      setActiveProject(activeIndex - 1)
    } else if (rightPressed && activeIndex < projects.length - 1) {
      setActiveProject(activeIndex + 1)
    }
  }, [rightPressed, leftPressed, projects.length])
  const activeProject = projects[activeIndex]

  // TODO:
  // const [intro] = useWindupString(activeProject?.acf?.project_intro || '', {
  //   pace: () => 7,
  // })
  // const [description] = useWindupString(activeProject?.excerpt || '', {
  //   pace: () => 3,
  // })

  return (
    <>
      <Head>
        <title>Projects | Gabsii</title>
      </Head>
      <Header/>
      <Main>
        <Center>
          <Title>
            <a href={activeProject?.url}>
              {activeProject?.title}
            </a>
            <HR
              initial={{ width: '40px', opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
            />
          </Title>
          <ProjectSlider
            projects={projects}
            activeIndex={activeIndex}
            setActiveProject={setActiveProject}
          />
          <ProjectInfo>
            {/* TODO */}
            {/* <H3>{intro}</H3> */}
            <HR
              initial={{ width: '40px', opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              extended
            />
            {/* TODO */}
            {/* <Excerpt dangerouslySetInnerHTML={{ __html: description }} /> */}
          </ProjectInfo>
        </Center>
      </Main>
    </>
  )
}

export default Projects

export const getStaticProps: GetStaticProps = async () => {
  const projects = getAllEntriesByType(PROJECTS_LOCATION);

  return {
    props: {
      projects
    }
  };
}
