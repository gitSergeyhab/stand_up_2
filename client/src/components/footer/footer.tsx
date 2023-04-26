import styled from 'styled-components';

const FooterX = styled.footer`
  width: 100%;
  position: fixed;
  margin-right: auto;
  bottom: 0;
  background: #300606;
  padding: 3px;
  text-align: center;
  color: #ff9b05;
`;

export default function Footer() {
  return <FooterX>Copyright ©2022. [] // redmoloch@yandex.ru Limited</FooterX>;
}
