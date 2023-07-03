import { Link } from "react-router-dom";
import styled from "styled-components";

export const ChatOptionUL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 1.75rem;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 215px;
  overflow-y: scroll;
  padding: 0.5rem;
  gap: 0.2rem;
  border: 0.25rem solid goldenrod;
  background-color:  rgb(13, 1, 1);
`;

export const ChatOptionLink = styled(Link)<{color?:string}>`
  color: ${({color}) => color || '#FFF' } ;
  text-decoration: none;

  &:hover {
    color: goldenrod
  }
`


