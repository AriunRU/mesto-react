import React from "react";
import logo from "../images/logo.svg"

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo link-opacity"
        src={logo}
        alt="логотип Место"
      />
    </header>
  )
}

export default Header
