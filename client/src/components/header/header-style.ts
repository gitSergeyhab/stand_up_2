import { Link } from 'react-router-dom';
import styled from 'styled-components';

type NavProps = { shown: boolean };

export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  min-width: 320px;
  @media (min-width: 900px) {
    background: #300606;
  }
`;

export const MenuDesktop = styled.ul`
  display: none;

  @media (min-width: 900px) {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    height: 60px;
  }
`;

export const MenuMobile = styled.ul<NavProps>`
  margin: 0;

  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background: #300606;
  z-index: 10;
  transition: all 0.4s ease-in-out;
  transform: translateY(-200%);
  border-bottom: #0d0101 2px solid;

  ${({ shown }) => (shown ? 'transform: translateY(0);' : '')};

  @media (min-width: 900px) {
    display: none;
  }
`;

export const MenuLi = styled.li`
  flex-grow: 1;
  text-align: center;
  vertical-align: middle;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgb(255, 155, 5);
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  height: 100%;
  transition: 0.3s ease-in-out;
  &:hover,
  &:focus {
    color: gold;
  }
`;

export const Icon = styled.a<NavProps>`
  height: 32px;
  width: 43px;
  margin: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  vertical-align: middle;
  z-index: 20;
  border: none;
  background-color: inherit;
  cursor: pointer;

  @media (min-width: 900px) {
    display: none;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    background: goldenrod;
    width: 100%;
    height: 4px;
    position: absolute;
    left: 0;
    transform-origin: center center;
    transform: rotate(0deg);
    transition: all 0.3s ease;
  }
  &::before {
    top: 2px;
    margin-top: -2px;
    ${({ shown }) => (shown
    ? 'top: 50%;transform: rotate(45deg); background: rgb(255, 238, 0);'
    : '')}
  }

  &::after {
    bottom: 2px;
    margin-bottom: -2px;
    ${({ shown }) => (shown
    ? 'bottom: 50%; transform: rotate(-45deg); background: rgb(255, 238, 0);'
    : '')}
  }
`;

export const IconSpan = styled.span<NavProps>`
  display: block;
  background: goldenrod;
  width: 100%;
  height: 4px;
  margin-top: -2px;
  position: absolute;
  left: 0;
  top: 50%;

  background: ${({ shown }) => (shown ? 'transparent;' : '')};
`;

type LogoContainerProp = {
  width: number;
  small?: boolean;
};

export const HeaderLink = styled(Link)<LogoContainerProp>`
  color: gold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px`};
  color: rgb(255, 155, 5);
  transition: 0.3s ease-in-out color;
  &:hover,
  &:focus {
    color: gold;
  }
`;

export const LoginLink = styled(HeaderLink)`
  height: 40px;
`;

export const UserContainer = styled.div<{ small?: boolean }>`
  color: gold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position: absolute;
  top: 6px;
  right: 0;
  z-index: 20;
  display: inline-block;
  vertical-align: middle;

  @media (min-width: 900px) {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    display: ${({ small }) => (small ? 'none' : '')};
  }
`;

// my-rate
