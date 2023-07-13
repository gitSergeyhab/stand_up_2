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


