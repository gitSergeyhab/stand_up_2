import Linkify from 'react-linkify'
import styled from 'styled-components';
import { ContentName, statusOptions } from '../const/const';


export const roundToPoints = (num: number) => Math.round(num * 100) / 100;

export const getTypes = (pathname: string) => {
  const paths = pathname.split('/');
  const mainType = paths[1] as ContentName;
  const listType = paths[3] as ContentName;

  return { mainType, listType };
};

export const round1 = (num: number) => Math.round(num * 10) / 10;

export const cutText = (str: string, len = 30) => `${str.slice(0, len)  }${str.length > len ? '...' : ''}`

/**
 * для переноса пропса "state" в useState в Form => возвращает {id, name} или null
 * @param id
 * @param name
 * @returns
 */
export const getOption = (id?: string|number, name?: string) => id && name ? {id, name} : null;


/**
 * для even-form select - устанавливает опцию по id (canceled|ended|planned)
 * @param id
 * @returns
 */
export const getStatusOption = (id?: string) => id ? statusOptions.find((item) => item.id === id) || null : null;



const Div = styled.div`
  overflow-wrap: break-word;  /* не поддерживает IE, Firefox; является копией word-wrap */
  word-wrap: break-word;
`;

const getDivWithLinks = (text: string) =>  (
  <Div>
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="_blank" href={decoratedHref} key={key} rel="noreferrer">{decoratedText}</a>
      )} >
      {text}
    </Linkify>
  </Div>
);
/**
 * возвращает текст поделеный на строки (в DIV'ах) с выделенными ссылками
 * @param text
 * @returns
 */
export const getRowLinkedText = (text: string) => text.split('\n').map(getDivWithLinks);


