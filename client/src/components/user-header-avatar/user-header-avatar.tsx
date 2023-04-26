import { useEffect, useState } from 'react';

import { DefaultPath } from '../../const/const';
import { AuthUserTypeCC } from '../../types/user-types';
import { DropUserMenu } from '../drop-user-menu/drop-user-menu';
import { UserAvatarBtn, UserAvatarImg } from './user-header-avatar-style';

type UserHeaderAvatarProps = {
  user: AuthUserTypeCC | null;
};

export function UserHeaderAvatar({ user }: UserHeaderAvatarProps) {
  const [shownUserMenu, setShownUserMenu] = useState(false);

  const handleClickUserMenu = () => setShownUserMenu((val) => !val);

  const closeMenu = () => setShownUserMenu(false);

  const closeMenuOnPageClick = (evt: MouseEvent) => {
    if (
      evt.target instanceof Element
      && !evt.target.closest('#header-avatar')
    ) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenuOnPageClick);
    return () => document.removeEventListener('click', closeMenuOnPageClick);
  });

  const avatar = user && user.avatar ? user.avatar : DefaultPath.UserAvatar;

  const userMenu = shownUserMenu ? <DropUserMenu user={user} /> : null;

  return (
    <>
      <UserAvatarBtn
        id="header-avatar"
        radius={40}
        onClick={handleClickUserMenu}
      >
        <UserAvatarImg src={avatar} />
      </UserAvatarBtn>
      {userMenu}
    </>
  );
}

// my-rate
