import styled from 'styled-components';

// export const Main = styled.main`
//     background-color: #000000;
//     padding: 0;
// `;

export const PageWrapper = styled.div`
  background-color: #0d0101;
  min-height: 100vh;
  padding-bottom: 30px;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 70px;
  background: #0d0101;
  min-width: 320px;
  height: 100%;
`;

export const MainMain = styled.main`
  min-height: 100%;
`;

export const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: #ffffff;
  width: 100%;
  height: 100%;

  @media (min-width: 500px) {
    width: 80%;
  }

  @media (min-width: 900px) {
    width: 60%;
  }
`;
