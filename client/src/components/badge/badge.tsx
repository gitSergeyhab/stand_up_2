import styled from "styled-components"

const BadgeSpan = styled.span<{color?: string}>`
  color: ${({color}) => color || '#FFF'};
`;

const BadgeSecondSpan = styled(BadgeSpan)`
  color: #FFF;
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
`


export type BadgeProps = {
  first: string|number,
  second?: string|number,
  firstColor?: string,
  secondColor?: string,
  title?: string
}


export function Badge({first, second, firstColor, secondColor, title}: BadgeProps) {
  const secondSpan = second ? <BadgeSecondSpan color={secondColor}>({second})</BadgeSecondSpan> : null;
  return (
    <BadgeDiv title={title}>
        <BadgeSpan color={firstColor}>{first}</BadgeSpan>
        {secondSpan}
    </BadgeDiv>

  )
}

