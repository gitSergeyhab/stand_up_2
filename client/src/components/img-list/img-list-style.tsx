import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';



export const Gallery = styled.ul<{isInfo?: boolean}>`
  list-style: none;
  margin: 0;
  padding: 1rem;

  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: 12rem;
  grid-auto-flow: dense;
  gap: 1rem;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }

  @media (min-width: 2000px) {
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  }

  ${({isInfo}) => isInfo ? 'display: flex' : ''};

  & > * {}
`;


export const GalleryLi = styled.li<{marker: boolean}>`
  position: relative;
  cursor: pointer;
  background: center / cover;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 1rem #000, 0 0 0.2rem #000;
  transform: scale(1);
  transition:  all 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 0 0 0.2rem #000, 0 0 1rem #000;
    transform: scale(1.01);
    ${({marker}) => marker ? 'box-shadow: 0 0 3rem rgb(141, 30, 30)' : ''};
  }

  ${({marker}) => marker ? 'box-shadow: 0 0 2rem rgb(141, 30, 30)' : ''};

  &:nth-child(2n) {
    grid-row: span 2;
  }

  &:nth-child(5n) {
    grid-column: span 2;
    grid-row: span 2;
  }

  &:nth-child(10n) {
    grid-column: span 1;
  }

  &:nth-child(15n) {
    grid-row: span 1;
  }
  &:nth-child(19n) {
    grid-column: span 0;
    grid-row: span 0;
  }
`;

const imgAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const GalleryImg = styled.img.attrs({alt: 'photo', loading: 'lazy'})`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  animation: ${imgAnimation} 0.3s;
`;

export const GalleryLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: rgb(13, 1, 1);
`;


const loadingAnimation = keyframes`
  0% { background-color: rgb(13, 1, 1); }
  100% { background-color: rgb(58, 16, 16); }
`;

export const GalleryNotLoaded = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  animation: ${loadingAnimation} 1s infinite alternate;
`;

// export const MarkerButton = styled.input.attrs({type: 'button'})<{marker?: boolean}>`
//   position: absolute;
//   right: 1rem;
//   top: 1rem;
//   width: 1rem;
//   height: 1rem;
//   border-radius: 50%;
//   border: 1px solid #000;

//   background-color: ${({marker}) => marker ? 'red' : '#FFF'};
// `

export const MarkerButton = styled.input.attrs({type: 'button'})<{marker?: boolean}>`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({marker}) => marker ? 'red' : '#FFF'};
`

export const MarkerButtonLabel = styled.label<{hidden: boolean}>`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({hidden}) => hidden ? 'display: none': ''};
  `

