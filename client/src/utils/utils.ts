import { ContentName } from '../const/const';


export const roundToPoints = (num: number) => Math.round(num * 100) / 100;

export const getTypes = (pathname: string) => {
  const paths = pathname.split('/');
  const mainType = paths[1] as ContentName;
  const listType = paths[3] as ContentName;

  return { mainType, listType };
};

export const round1 = (num: number) => Math.round(num * 10) / 10;

export const trim = (str: string, len = 30) => `${str.slice(0, len)  }${str.length > len ? '...' : ''}`
