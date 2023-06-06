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




// type SmallSpinnerProps = {
//   isFetching?: boolean
// }
// export function SmallSpinner({isFetching}: SmallSpinnerProps) {
//   if (isFetching === false) {
//     return <SpinnerSection />
//   }
//   return (
//     <SpinnerSection >
//       <span>Loading ...</span>
//       <ScaleLoader
//         color="gold"
//         loading
//         height={10}
//         width={10}
//         radius={3}
//         margin={7}
//       />
//     </SpinnerSection>
//   );
// }



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
