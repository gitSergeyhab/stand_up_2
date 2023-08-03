import styled from "styled-components";

export const SortWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const SortDiv = styled.div`
  width: 12rem;
  height: 2rem;
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SortList = styled.ul`
  width: 12rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 2rem;
  box-shadow: 2px 2px 5px #0000003e;
  z-index: 2;
  background-color: #FFF;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SortLi = styled.li<{isActive?: boolean}>`
  padding: 0.5rem 1rem;
  background-color: ${({isActive}) => isActive ? '#00000011' : '#FFF'} ;
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: #00000015;
  }
  transition: background-color .2s ease-in-out ;
`;

export const ClickButton = styled.button.attrs({type: 'button'})`
  display: flex;
  justify-content: space-between;
  border: none;
  width: 100%;
  background-color: inherit;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px #0000003e;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 5px #0000003e;
  }
`;
