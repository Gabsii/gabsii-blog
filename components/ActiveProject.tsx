import styled from "styled-components"
import { useWindupString } from "windups"

import { HR } from "../pages/projects"
import { ProjectOverview } from "../types/entries"
import { breakpoints } from "../utils/constants"

const ProjectInfo = styled.div`
  width: 100%;
  display: none;

  margin-top: 4rem;

  @media ${breakpoints.lg} {
    display: block;
  }
`
const H3 = styled.h3`
  text-align: center;
  font-size: 2rem;
  color: #9efafe;
  line-height: 2.5rem;
  height: 40px;
  text-shadow: 0px 0px 4px #9efafe;
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

const ActiveProject = ({project}: {project: ProjectOverview}) => {
  const [intro] = useWindupString(project?.intro || '', {
    pace: () => 7,
  })
  const [description] = useWindupString(project?.excerpt || '', {
    pace: () => 3,
  })

  return (
    <ProjectInfo>
      <H3>{intro}</H3>
      <HR
        initial={{ width: '40px', opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        extended
      />
      <Excerpt dangerouslySetInnerHTML={{ __html: description }} />
    </ProjectInfo>
  )
}

export default ActiveProject;
