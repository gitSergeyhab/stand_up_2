import { ReactNode } from "react";
import styled from "styled-components";

const DropUpDiv = styled.div`
  position: absolute;
  right: -.5rem;
  bottom: 1.3rem;
`

export function DropUp({children}: {children: ReactNode}) {
  return (
    <DropUpDiv>
      {children}
    </DropUpDiv>
  )
}
