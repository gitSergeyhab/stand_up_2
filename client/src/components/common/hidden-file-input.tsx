import styled from "styled-components";

export const InvisibleImageInput = styled.input.attrs({ type: 'file', accept: "image/png, image/jpeg, image/jpg"  })`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
`
