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

export const deleteFieldFromSearch = ({ field, search }: GetFromUrlArgs) => {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(field);
  return searchParams.toString();
};

