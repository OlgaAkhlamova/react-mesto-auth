import React from 'react';
import headerLogo from '../images/headerlogo.svg';
function Header() {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="логотип проекта место россии"
        className="header__logo"
      />
    </header>
  );
}

export default Header;