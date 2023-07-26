import ReactLinkify from "react-linkify";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../const/const";


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
  if (split.length !== 2) return link;
  const [text, to] = split;
  return <TextLink key={key} to={to.trim()}>{text.trim()}</TextLink>
}

const SIDE_CONTENT_PATTERN = /^http/;

const getImage = (image: string, key: number) => {

  const split = image.split(IMAGE_PATTERN);
  if (split.length !== 2) {
    return image ;
  }
  const start = SIDE_CONTENT_PATTERN.test(split[1].trim()) ? '' : SERVER_URL; // если ссылка на внешний источник, то "SERVER_URL" не нужен

  const [alt, src] = split;
  return <TextImage src={ start + src.trim() } key={key} alt={alt.trim()}/>
}

export const linkifyParagraph = (text: string, i: number) => {
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
  return <LinkedText key={i}>{adapt}</LinkedText>;
}

export const linkifyText = (text: string) => {
  const paragraphs = text.split(/\n/);
  const pElements = paragraphs.map(linkifyParagraph);
  return <TextWrapper>{pElements}</TextWrapper>;
}


export const linkifyShort = (text: string) => {
  const split = text.split(SPLIT_PATTERN);
  const adapt = split.map((item, key) => {
    if (LINK_PATTERN.test(item)) {
      return getLink(item, key)
    }

    if (IMAGE_PATTERN.test(item)) {
      return ''
    }

    return item;
  });
  return adapt;
}

const checkPattern = /({&)|(&})/g;

export const checkLinkedText = (text: string) => {
  const matchList = text.match(checkPattern);
  if (!matchList) {
    return true;
  }

  if (matchList.length % 2) {
    return false;
  }

  let start = 0;

  for(let i = 0; i<matchList.length; i++) {

    if (matchList[i] === '{&' ) {
      start++;
    } else {
      start--
    }

    if (start < 0 || start > 1) {
      return false
    }
  }

  return !start;
}
