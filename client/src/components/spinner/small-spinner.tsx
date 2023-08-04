import ScaleLoader from 'react-spinners/ScaleLoader';
import styled from 'styled-components';

const SpinnerSection = styled.section`
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  padding: 1rem;
  background-color: #0d0101;
  color: gold;
  width: 100%;
`;

const SpinnerSection2 = styled.section`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  background-color: inherit;
`;




export function SmallSpinner() {

  return (
    <SpinnerSection >
      <span>Loading ...</span>
      <ScaleLoader
        color="gold"
        loading
        height={10}
        width={10}
        radius={3}
        margin={7}
      />
    </SpinnerSection>
  );
}

export function SmallSpinner2() {

  return (
    <SpinnerSection2 >
      <ScaleLoader
        color="rgba(13, 1, 1, 0.857)"
        loading
        // height={10}
        width={5}
        radius={3}
        margin={5}
      />
    </SpinnerSection2>
  );
}
