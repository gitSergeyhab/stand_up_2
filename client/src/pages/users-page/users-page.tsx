import { useGetTestUsersQuery } from '../../store/user-api';
import { TestUserCC } from '../../types/user-types';

export function User({ user }: { user: TestUserCC }) {
  const { nik, email, roles, activated } = user;

  const roleElements = roles && roles.length
    ? roles.map((item) => <li key={item}>{item}</li>)
    : null;
  return (
    <li>
      <h2>{nik}</h2>
      <p>{email}</p>
      <ul>{roleElements}</ul>
      <p>{activated}</p>
    </li>
  );
}

export function UsersPage() {
  const { isError, isLoading, data } = useGetTestUsersQuery(null);

  if (isError || isLoading) {
    return <h1>Error !!! || Loading ... </h1>;
  }

  if (!data) {
    return <h1>No Data</h1>;
  }

  const usersElements = data.map((item) => <User key={item.id} user={item} />);

  return <ul>{usersElements}</ul>;
}
