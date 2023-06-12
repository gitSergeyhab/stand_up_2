import {BsArrowUpCircleFill} from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";



const ArrowWrapper = styled.div<{inView: boolean}>`
  width: min-content;
  height: min-content;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  display: flex;
  border-radius: 60%;
  cursor: pointer;
  background-color: #daa5207d;
  scale: 1;
  transition:
    opacity 0.7s ease-in-out,
    scale 0.7s ease-in-out,
    background-color 0.3s ease-in-out;

  &:hover {
    background-color: #000;
  }

  ${({inView}) => inView ? `
    opacity: 0;
    overflow: hidden;
    scale: 0.01
  ` : ''
  };
`;

const HiddenTopDiv = styled.div`
  width: 1px;
  height: 1px;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`;


export function ArrowScrollUp () {

  const {ref, inView} = useInView({
    threshold: 0.5,
  })

  const handleClick = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  }

  return (
    <>
      <HiddenTopDiv ref={ref}/>
      <ArrowWrapper inView={inView} onClick={handleClick}>
        <BsArrowUpCircleFill
        size={50}
        color="goldenrod"
        />
      </ArrowWrapper>
    </>
  )
}
