import { ErrorBlockUl } from './user-errors-block-style';

export const UserErrorsBlock = ({ errors }: { errors: string[] }) => {
  const errorElements = errors.length ? (
    <ErrorBlockUl>
      {errors.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ErrorBlockUl>
  ) : null;

  return errorElements;
};
