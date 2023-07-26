import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { LogoSvg } from '../logo-svg/logo-svg';
import {
  Nav,
  Icon,
  IconSpan,
  MenuMobile,
  MenuLi,
  MenuLink,
  MenuDesktop,
  HeaderLink,
  UserContainer,
  LoginLink,
} from './header-style';
import { ContentName } from '../../const/const';
import { getUser } from '../../store/user-reducer/user-selectors';
import { UserHeaderAvatar } from '../user-header-avatar/user-header-avatar';

const MENU_DATA = [
  'main',
  // 'users',
  ContentName.News,
  ContentName.Shows,
  ContentName.Comedians,
  ContentName.Events,
  ContentName.Places,

];

export const enum MediaType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobil = 'mobil',
}

export function Header() {
  //

  const [shownMenu, setShownMenu] = useState(false);

  const user = useSelector(getUser);

  const handleClickMenu = () => {
    setShownMenu((val) => !val);
  };

  const closeBurgerMenu = () => setShownMenu(false);

  const closeMenuOnPageClick = (evt: MouseEvent) => {
    if (
      evt.target instanceof Element
      && !evt.target.closest('#header-burger')
    ) {
      closeBurgerMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenuOnPageClick);
    return () => document.removeEventListener('click', closeMenuOnPageClick);
  });

  const navItems = MENU_DATA.map((item) => (
    <MenuLi key={item}>
      <MenuLink to={item}>{item}</MenuLink>
    </MenuLi>
  ));

  const logo = (
    <HeaderLink to="/" width={120}>
      Stand
      <LogoSvg width={20} />
      Up
    </HeaderLink>
  );

  const login = (
    <LoginLink to="/login" width={120}>
      Войти
    </LoginLink>
  );

  const avatar = <UserHeaderAvatar user={user} />;

  return (
    <Nav>
      <MenuDesktop>
        {logo}

        {navItems}

        <UserContainer>{user ? avatar : login}</UserContainer>
      </MenuDesktop>
      <Icon shown={shownMenu} onClick={handleClickMenu} id="header-burger">
        <IconSpan shown={shownMenu} />
      </Icon>

      <UserContainer small>{user ? avatar : login}</UserContainer>
      {/* <p style={{ color: 'white', textAlign: 'center' }}>
        {user ? user.nik : 'No User'}
      </p> */}

      <MenuMobile shown={shownMenu}>{navItems}</MenuMobile>
    </Nav>
  );
}

// my-rate
