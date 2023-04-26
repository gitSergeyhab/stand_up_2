import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions';
import { useLogoutUserMutation } from '../../store/user-api';
import { AuthUserTypeCC } from '../../types/user-types';
import { storageUtils } from '../../utils/storage-utils';
import { UserMenuLi, UserMenuLink, UserMenuUl } from './drop-user-menu-style';

type DropUserMenuProps = {
  user: AuthUserTypeCC | null;
};
export function DropUserMenu({ user }: DropUserMenuProps) {
  const [logout] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const onLogoutAnyCase = () => {
    storageUtils.removeData();
    dispatch(setUser(null));
  };

  const handleClickExit = () => {
    logout(null).unwrap().finally(onLogoutAnyCase);
  };

  const exit = (
    <UserMenuLi key="exit">
      <UserMenuLink onClick={handleClickExit} to="/">
        Выйти
      </UserMenuLink>{' '}
    </UserMenuLi>
  );

  const userMenuElement = user ? (
    <UserMenuLi key="user">
      <UserMenuLink to={`/users/${user.id}`}>{user.nik}</UserMenuLink>
    </UserMenuLi>
  ) : null;

  const settings = (
    <UserMenuLi key="settings">
      <UserMenuLink to="/settings">Настройки</UserMenuLink>
    </UserMenuLi>
  );

  return (
    <UserMenuUl>{user ? [userMenuElement, settings, exit] : null}</UserMenuUl>
  );
}
