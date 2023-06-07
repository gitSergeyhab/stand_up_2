import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const GalleryInfo = styled.ul`
  list-style: none;
  margin: 0;
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  /* overflow: hidden; */
  /* max-height: 15rem; */



  @media (max-width: 600px) {
    & > li:nth-child(3) {
      display: none;
    }
  }

`;


export const GalleryInfoLi = styled.li`
  position: relative;
  cursor: pointer;
  background: center / cover;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 1rem #000, 0 0 0.2rem #000;
  transform: scale(1);
  transition:  all 0.3s ease-in-out;

  width: 32%;

  &:hover {
    box-shadow: inset 0 0 0.2rem #000, 0 0 1rem #000;
    transform: scale(1.01);
  }
`;



export const GalleryInfoImg = styled.img.attrs({alt: 'photo', loading: 'lazy'})`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
`;

export const GalleryInfoLink = styled(Link)`
  display: block;
  height: 100%;
  border-radius: 0.5rem;
  background-color: rgb(13, 1, 1);
`;

