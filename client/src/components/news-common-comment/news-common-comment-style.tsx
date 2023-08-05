import styled from "styled-components";

export const CommentLi = styled.li`
  width: 100%;
  box-shadow: 1px 1px 1px #0000002a;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const TextDiv = styled.div`
  width: 100%;
  padding: 0.25rem;
  margin: 0;
  text-indent: 1rem;
`;

export const CommentImage = styled.img`
  max-height: 20rem;
  display: flex;
  object-fit: cover;
  text-align: center;
  margin: auto;
  max-width: 100%;
  margin-bottom: .5rem;
  box-shadow: 4px 4px 2px #0000007b;
`;

export const CommonCommentDiv = styled.div`
  width: 100%;
  box-shadow: -1px 1px 10px #00000080;
  padding: 1rem 0 0 1rem;
  position: relative;
`;


export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: end;
`;

export const CloseBtnWrapper = styled.div`
  padding: 1.3rem 0.5rem;
`;
