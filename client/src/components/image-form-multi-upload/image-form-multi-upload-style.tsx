import styled from "styled-components";

export const ImageUploadForm = styled.form`
  width: 100%;
  background-color: #300606;
  color: gold;
  display: flex;
  flex-direction: column;
  border: solid 2px #000000;
  font-size: 12px;

  @media (min-width: 600px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    width: 18%;
    position: absolute;
    right: 1rem;
    top: 5rem;
  }
`;



export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const FilesBlock = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const ItemList = styled.ol`
  top: 1.3rem;
  position: absolute;
  right: 0;
  background-color: #000;
  color: #FFF;
  z-index: 2;
`;

export const NoFilesTextDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #FFF;
`
