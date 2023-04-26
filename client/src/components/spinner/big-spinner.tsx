import ScaleLoader from 'react-spinners/ScaleLoader';
import styled from 'styled-components';

const SpinnerSection = styled.section`
  text-align: center;
  font-size: 1.8em;
  font-weight: 700;
  padding-top: 11%;
  padding-bottom: 11%;
  background-color: #0d0101;
  color: gold;
  width: 100%;
`;

const LoadingHeader = styled.h2`
  padding-bottom: 3rem;
`;

export function BigSpinner() {
  return (
    <SpinnerSection>
      <LoadingHeader>Loading ...</LoadingHeader>
      <ScaleLoader
        color="gold"
        loading
        height={150}
        width={10}
        radius={10}
        margin={10}
      />
    </SpinnerSection>
  );
}
