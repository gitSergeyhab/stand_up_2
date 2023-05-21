import styled from "styled-components";

export const TabList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Tab = styled.li`
  width: 100%;
  display: flex;
`;

export const TabButton = styled.button.attrs({type: 'button'})<{isCurrent?: boolean}>`
  width: 100%;
  background-color: ${({isCurrent}) => isCurrent ? '#FFF' : '#000'};
  color: ${({isCurrent}) => isCurrent ? '#000' : '#FFF'};
  cursor: pointer;

  &:hover {
    color: goldenrod
  }
`
