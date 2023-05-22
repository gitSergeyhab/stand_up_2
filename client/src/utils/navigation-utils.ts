import { QueryField } from '../types/types';

type CreateNewSearchArgs = {
  search: string;
  fields: QueryField[];
  replace?: boolean;
};
export const createNewSearch = ({ search, fields, replace }: CreateNewSearchArgs) => {
  const searchParams = new URLSearchParams(search);

  fields.forEach(({ name, value }) => {
    if (replace) {
      searchParams.delete(name);
    }
    searchParams.append(name, `${value}`);
  });

  return searchParams.toString();
};

type GetFromUrlArgs = { field: string; search: string; isArray?: boolean };

export const getFieldFromSearch = ({ field, search, isArray }: GetFromUrlArgs) => {
  const searchParams = new URLSearchParams(search);
  if (isArray) {
    return searchParams.getAll(field);
  }
  return searchParams.get(field);
};

type DeleteFromUrlArgs = { fields: string[]; search: string };
export const deleteFieldFromSearch = ({ fields, search }: DeleteFromUrlArgs) => {
  const searchParams = new URLSearchParams(search);
  fields.forEach((field) => searchParams.delete(field));
  return searchParams.toString();
};

