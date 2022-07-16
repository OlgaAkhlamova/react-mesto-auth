import React from 'react';
import headerLogo from '../images/headerlogo.svg';

function Header({children}) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="логотип проекта место россии"
        className="header__logo"
      />
      {children}
    </header>
  );
}

export default Header;