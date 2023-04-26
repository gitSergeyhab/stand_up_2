import { QueryField } from '../types/types';

type CreateNewSearchArgs = {
  search: string;
  fields: QueryField[];
  replace?: boolean;
};
export const createNewSearch = ({
  search,
  fields,
  replace,
}: CreateNewSearchArgs) => {
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

export const getFieldFromSearch = ({
  field,
  search,
  isArray,
}: GetFromUrlArgs) => {
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

// console.log(1,searchParams.toString());
// console.log(2,searchParams.has('topic')); // true
// console.log(3,searchParams.get('topic') === 'api'); // true
// console.log(4,searchParams.getAll('topic')); // ["api"]
// console.log(5,searchParams.get('foo') === null); // true
// console.log(searchParams.append('topic', 'webdev'));
// console.log(6,searchParams.toString()); // "q=URLUtils.searchParams&topic=api&topic=webdev"
// console.log(searchParams.set('topic', 'More webdev'));
// console.log(7, searchParams.toString()); // "q=URLUtils.searchParams&topic=More+webdev"
// console.log(searchParams.delete('topic'));
// console.log(8, searchParams.toString());
