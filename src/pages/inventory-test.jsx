import React from 'react'
import styled from 'styled-components';

import '../css/reset.css';
import { Link as GatsbyLink } from 'gatsby';

const Header = styled.header`
  width: 100vw; 
  height: 100px;
  padding: 35px 25px 15px;
  display: flex;
  position: absolute; 
  top: 0;

  font-family: 'Calamity Sans';
  font-weight: bold;
  color: white;

  box-sizing: border-box;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
`;

const UL = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LI = styled.li`
  padding: 5px 15px;
  position: relative;
  height: 100%;

  ${({ isCenter }) => isCenter && `
    margin: 0 25px;
  `}
`;

const Link = styled(GatsbyLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;

  &:visited {
    color: #ffffff;
  }

  ${({ isCurrent }) => isCurrent && `
    font-size: 2rem;
  `}
`;

const ButtonHint = styled.div`
  background-color: #EFEFEF;
  padding: 5px 10px;
  text-align: center;
  width: 15px;
  
  color: #000000;
`;

const TriangleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 5px;
`

const Triangle = styled.div`
  border-color: transparent transparent #EFEFEF transparent;
  border-width: ${({left}) => left ? '0 0 25px 5px' : '0 5px 25px 0' };
  border-style: solid;
`

const InventoryTest = () => {
  return ( 
    <Header>
      <Nav>
        <UL>
          <LI>
            <Link to='/projects'>
              <TriangleButton>
                <Triangle left/>
                <ButtonHint isFirst>Q</ButtonHint>
              </TriangleButton>
                Projects
            </Link>
          </LI>
          <LI isCenter>
            <Link to='/' isCurrent>
              Gabsii
            </Link>
          </LI>
          <LI>
            <Link to='/blog'>
            <TriangleButton>
              <ButtonHint isFirst>E</ButtonHint>
              <Triangle/>
            </TriangleButton>
              Blog
            </Link>
          </LI>
        </UL>
      </Nav>
    </Header>
  )
}

export default InventoryTest;