import styled from "styled-components"
import { SmallSup } from "../common/common-style";

const BadgeSpan = styled.span<{color?: string}>`
  color: ${({color}) => color || '#FFF'};
`;

const BadgeSecondSpan = styled(BadgeSpan)`
  font-size: 0.7rem;
`

const BadgeDiv = styled.div`
  border: 0.2rem orange solid;
  border-radius: 1.2rem;
  padding: 0.4rem;
  background-color: #000;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: end;
  min-width: 2.3rem;
  box-shadow: 2px -2px 2px #00000081;
`


export type BadgeProps = {
  first: string|number,
  second?: string|number,
  firstColor?: string,
  secondColor?: string,
  title?: string,
  type?: 'rate'|'view'
}


export function Badge({first, second, firstColor, secondColor, title, type='view'}: BadgeProps) {
  const secondSpan = second ? <BadgeSecondSpan color={secondColor}>({second})</BadgeSecondSpan> : null;

  const star = type === 'rate' ? '★' : ''
  const eye = type === 'view' ?  '👁' : ''
  return (
    <BadgeDiv title={title}>
        <BadgeSpan color={firstColor}>{first}<SmallSup>{star}{eye}</SmallSup> </BadgeSpan>
        {secondSpan}
    </BadgeDiv>

  )
}

export const BadgeSquireDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  color: rgb(255, 155, 5);
  font-weight: 700;
  border: 2px solid rgb(225, 135, 1);
  border-radius: 2px;
  font-size: 1.3rem;
  box-shadow: 2px -1px 2px 2px rgba(34, 60, 80, 0.4);
  background-color: #000;
`
