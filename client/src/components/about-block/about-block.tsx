import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AboutTable, TR, TDR, TDL } from './about-block-style';
import { DefaultPath, SERVER_URL } from '../../const/const';

export type AboutRowType = {
  point: string;
  value?: string;
  src?: string;
  href?: string;
};

const AboutTableImg = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`


const AboutTableLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: end;
  /* text-decoration: none; */
  color: #1d0303;
  gap: 1rem;

  &:hover {
    color: #c66103;
  }
`
const FlexDiv = styled.div`
display: flex;
align-items: center;
justify-content: end;
text-decoration: none;
color: #000;
gap: 1rem;`;

function AboutRow({ about }: { about: AboutRowType}) {
  const {point, href, src, value} = about;
  const imageSrc = src ? SERVER_URL + src : DefaultPath.Any

  const AboutImage =  <AboutTableImg src={imageSrc} alt={value}/>

  const TDRContent = href ?
    <AboutTableLink to={href}>{value}{AboutImage}</AboutTableLink> :
    <FlexDiv>{value}{AboutImage}</FlexDiv>;

  const content = value ?
    <TR key={point}><TDL>{point}</TDL><TDR>{TDRContent}</TDR></TR> :
    null

  return content

}

export function AboutBlock({ about }: { about: AboutRowType[] }) {
  const aboutElements = about.map((item) => <AboutRow key={item.point}  about={item}/>)

  return (
    <AboutTable>
      <tbody>
        {aboutElements}
      </tbody>
    </AboutTable>
  );
}
