import ReactLinkify from "react-linkify";
import { Link } from "react-router-dom";
import styled from "styled-components";


const SPLIT_PATTERN = /{&|&}/;
const LINK_PATTERN = /#>/;
const IMAGE_PATTERN = /@>/;


const Div = styled.div`
  overflow-wrap: break-word;  /* не поддерживает IE, Firefox; является копией word-wrap */
  word-wrap: break-word;
`;

const getDivWithLinks = (text: string) =>  (
  <Div>
    <ReactLinkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="_blank" href={decoratedHref} key={key} rel="noreferrer">{decoratedText}</a>
      )} >
      {text}
    </ReactLinkify>
  </Div>
);
/**
 * возвращает текст поделеный на строки (в DIV'ах) с выделенными ссылками
 * @param text
 * @returns
 */
export const getRowLinkedText = (text: string) => text.split('\n').map(getDivWithLinks);



const TextLink = styled(Link).attrs({target: '_blank'})`
  font-weight: 700;
  color: #c59210;
  scale: 1;
    &:visited {
      color: rgb(71, 2, 2);
    }

    &:hover {
      color: #eaa800
    }

    transition: color 0.2s ease-in-out;
`;

const TextImage = styled.img.attrs({with: 400, height: 400})`
  object-fit: contain;
  width: 100%;
  height: auto;
  max-height: 20rem;
  text-align: center;
`

const TextWrapper = styled.div`
  padding: 1rem;
`

const LinkedText = styled.p`
  text-indent: 2rem;
  margin: 0.25rem 0;
`


const getLink = (link: string, key: number) => {

  const split = link.split(LINK_PATTERN);
  if (split.length !== 2) {
    return link ;
  }

  const [text, to] = split;
  return <TextLink key={key} to={to.trim()}>{text.trim()}</TextLink>
}

const getImage = (image: string, key: number) => {

  const split = image.split(IMAGE_PATTERN);
  if (split.length !== 2) {
    return image ;
  }

  const [alt, src] = split;
  return <TextImage src={src.trim()} key={key} alt={alt.trim()}/>
}

export const linkifyParagraph = (text: string) => {
  const split = text.split(SPLIT_PATTERN);
  const adapt = split.map((item, key) => {
    if (LINK_PATTERN.test(item)) {
      return getLink(item, key)
    }
    if (IMAGE_PATTERN.test(item)) {
      return getImage(item, key)
    }

    return item;
  })
  return <LinkedText>{adapt}</LinkedText>
}

export const linkifyText = (text: string) => {
  const paragraphs = text.split(/\n/);

  const pElements = paragraphs.map(linkifyParagraph)
  return <TextWrapper>{pElements}</TextWrapper>
}
