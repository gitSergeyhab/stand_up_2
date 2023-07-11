import styled from 'styled-components';

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 80%;
  width: 100%;
  align-items: center;
  overflow: hidden;
`;

export const Image = styled.img`
  /* height: 100%; */
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
`;

export const ImageList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  height: 120px;
  width: 100%;
`;

export const SlideItemImg = styled.img`
  height: 100%;
`;

export const CloseBtn = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: 1%;
  top: 1%;
  border: none;
  background-color: transparent;
  color: gold;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover,
  &:focus {
    color: goldenrod;
    outline: 2px solid;
  }
`;

type ImageLiProps = { current: boolean };

export const ItemSlideLi = styled.li<ImageLiProps>`
  outline: solid 1px ${({ current }) => (current ? '#ff9b05' : '#000000')};
  opacity: ${({ current }) => (current ? 1 : 0.5)};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  width: 20%;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(7, 0, 1, 0.98);
  height: 100vh;
  width: 100vw;
  min-width: 320px;
`;

export const Modal = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 99;
  min-width: 320px;
`;
