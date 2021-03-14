import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import useKeyPress from '../utils/hooks/useKeyPress'

const Header = styled.header`
  width: 100%;
  height: 100px;
  padding: 35px 25px 15px;
  display: flex;

  font-family: 'Calamity Sans';
  font-weight: bold;
  color: white;

  box-sizing: border-box;
`

const Nav = styled.nav`
  width: 100%;
  height: 100%;
`

const UL = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const LI = styled.li`
  padding: 5px 15px;
  position: relative;
  height: 100%;

  ${({ isCenter }) =>
    isCenter &&
    `
    margin: 0 25px;
  `}
`

const Link = styled(NextLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;

  &:visited {
    color: #ffffff;
  }

  ${({ iscurrent }) =>
    iscurrent &&
    `
    font-size: 1.75rem;
  `}
`

const ButtonHint = styled.div`
  background-color: #efefef;
  padding: 5px 10px;
  text-align: center;
  width: 15px;
  box-sizing: content-box;
  color: #000000;
`

const TriangleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 5px;
`

const Triangle = styled.div`
  border-color: transparent transparent #efefef transparent;
  border-width: ${({ left }) => (left ? '0 0 25px 5px' : '0 5px 25px 0')};
  border-style: solid;
`

const NewHeader = ({ pages }) => {
  const QPressed = useKeyPress('q')
  const EPressed = useKeyPress('e')
  const router = useRouter();

  useEffect(() => {
    if (QPressed && pages[0] !== null) {
      router.push(pages[0].url)
    } else if (EPressed && pages[2] !== null) {
      router.push(pages[2].url)
    }
  }, [EPressed, QPressed, pages])

  return (
    <Header>
      <Nav>
        <UL>
          {pages.map((page, index) =>
            page !== null && index >= 0 && index <= 2 ? (
              <LI key={page.name}>
                <Link
                  href={page.url}
                  iscurrent={index === 1 ? 'true' : undefined}
                >
                  <div>
                    {index !== 1 && (
                      <TriangleButton>
                        {index === 0 && <Triangle left={true} />}
                        <ButtonHint>{index === 0 ? 'Q' : 'E'}</ButtonHint>
                        {index === 2 && <Triangle />}
                      </TriangleButton>
                    )}
                    {index === 1 ? <h1>{page.name}</h1> : <h2>{page.name}</h2>}
                  </div>
                </Link>
              </LI>
            ) : null
          )}
        </UL>
      </Nav>
    </Header>
  )
}

export default NewHeader
