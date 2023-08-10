import styled from "styled-components"

export const ButtonsWrapper = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  display: flex;
  align-items: center;
  column-gap: 0.4rem;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 3px 3px 10px #00000040;
  }
    @media(max-width: 500px) {
      width: 100%;
      justify-content: space-around;
      right: auto;
    }

`;

export const CommentButton = styled.button.attrs({type: 'button'})<{disabled?:boolean, chosen?:boolean}>`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: opacity 0.2s ease-in-out;
  position: relative;
  color: #FFF;
  ${({disabled}) => disabled ? 'opacity: 0.4': ''};

  & svg {
    color: inherit;
    ${({chosen}) => chosen  ? 'color: #ff6200;': ''};
  }
  &:hover {
    ${({disabled}) => !disabled ? 'color: goldenrod': ''};
    ${({disabled}) => !disabled ? 'cursor: pointer': ''};
  }
`;

export const LikeRating = styled.div<{color?: string}>`
  font-size: 0.9rem;
  padding: 0 .25rem .1rem 0;
  font-weight: 700;
  text-shadow: 1px 0 ;
  color: ${({color}) => color || '#FFF'};
`;
