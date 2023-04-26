import styled from 'styled-components';

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;
type ImageLiProps = { info?: boolean };

export const ImageList = styled.ul<ImageLiProps>`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: ${({ info }) => (info ? 'nowrap' : 'wrap')};
  padding: ${({ info }) => (info ? '' : '1%')};
`;

export const ItemLi = styled.li<ImageLiProps>`
  outline: solid 1px #000000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;

  width: ${({ info }) => (info ? '34%' : '25%')};
`;
