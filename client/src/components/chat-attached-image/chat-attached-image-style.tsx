import styled from "styled-components"


export const AttachedImg = styled.img.attrs({loading: 'lazy'})`
  object-fit: contain;
  max-height: 10rem;
  max-width: 50%;
`;

export const AttachedImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ImageBtn = styled.button.attrs({type: 'button'})`
  position: absolute;
  top: 0;
  right: 0;
  width: min-content;
  height: 18px;
  padding: 0;
  border: 2px transparent solid;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    opacity: 0.75;
  }
  transition: opacity 0.25s ease-in-out;
`;
