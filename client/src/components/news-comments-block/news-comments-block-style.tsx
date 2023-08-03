import styled from "styled-components";

export const CommentUL = styled.ul`
  list-style: none;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
`;

export const CommentSection = styled.section`
  width: 100%;
  padding: 1rem;
`;

export const CommentHeader = styled.h2`
text-align: center;
`;

export const MoreCommentButton = styled.button.attrs({type: 'button'})`
    display: flex;
    justify-content: center;
    border: none;
    width: 100%;
    background-color: inherit;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 5px #0000003e;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
      box-shadow: 2px 2px 10px #0000003e;
    }
    transition: box-shadow .2s ease-in-out;
`
