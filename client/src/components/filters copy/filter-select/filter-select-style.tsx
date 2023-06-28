import styled from "styled-components";

export const FilterSelectUl = styled.ul`
  width: 96%;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 10rem;
  position: absolute;
  top: 0.8rem;
  background-color: #000;
  list-style: none;
  padding: 0.5rem;
  z-index: 3;
`;

export const FilterSelectLI = styled.li`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0.25rem;
  transition: 0.15s background-color ease-in-out;

  &:hover {
    background-color: rgb(48, 6, 6);
  }
`;
