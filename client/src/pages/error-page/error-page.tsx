import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotExistSection, RedirectLink } from './error-page-style';

export const Header = {
  NotFound: {
    ru: 'Страница не существует',
    en: 'Page doesn`t exist',
  },
  Error: {
    ru: 'Что-то сломалось...',
    en: 'Something is Wrong...',
  },
};

type AltTitles = {
  ru: string;
  en: string;
};

type ErrorType = {
  error?: FetchBaseQueryError | SerializedError;
  altTitles?: AltTitles;
};

export function ErrorPage({ error, altTitles }: ErrorType) {
  const navigate = useNavigate();

  const status = (error as FetchBaseQueryError)?.status;

  const nfp = (status && status === 404) || !error;

  const handleClickBack = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(-1);
  };

  const headers = nfp ? Header.NotFound : Header.Error;
  const { en, ru } = altTitles || headers;

  return (
    <NotExistSection>
      <h1>{ru}</h1>
      <h2>{en}</h2>
      <br />
      <RedirectLink onClick={handleClickBack}>Назад</RedirectLink>
      <RedirectLink>На главную</RedirectLink>
    </NotExistSection>
  );
}
