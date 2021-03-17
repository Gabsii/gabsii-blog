import NextLink from 'next/link'
import styled from 'styled-components'

import useNav from '../utils/hooks/useNav'

const CustomHeader = styled.header`
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

const LI = styled.li<{isCenter?: boolean}>`
  padding: 5px 15px;
  position: relative;
  height: 100%;

  ${({ isCenter }) =>
    isCenter &&
    `
    margin: 0 25px;
  `}
`

const Link = styled.a<{isCurrent: boolean}>`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;

  &:visited {
    color: #ffffff;
  }

  ${({ isCurrent }) =>
    isCurrent &&
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

const Triangle = styled.div<{flipped?: boolean}>`
  border-color: transparent transparent #efefef transparent;
  border-width: ${({ flipped }) => (flipped ? '0 0 25px 5px' : '0 5px 25px 0')};
  border-style: solid;
`

const Header = () => {
  const {currentPageIndex, pages} = useNav();

  return (
    <CustomHeader>
      <Nav>
        <UL>
          {pages.map((page, index) =>
            page.visible ? (
              <LI key={page.name}>
                <NextLink
                  href={page.url}
                  passHref
                >
                  <Link
                    isCurrent={page.centered}
                    >
                      {!page.centered && (
                        <TriangleButton>
                          {index === currentPageIndex - 1 && <Triangle flipped />}
                          <ButtonHint>{index === currentPageIndex - 1 ? 'Q' : 'E'}</ButtonHint>
                          {index === currentPageIndex + 1 && <Triangle />}
                        </TriangleButton>
                      )}
                      {page.centered ? <h1>{page.name}</h1> : <h2>{page.name}</h2>}
                  </Link>
                </NextLink>
              </LI>
            ) : null
          )}
        </UL>
      </Nav>
    </CustomHeader>
  )
}

export default Header
