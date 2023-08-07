import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
const image = require("../../assets/logo_2_512.png");

export const Navbar = () => {
  const navigate = useNavigate();

  const handleOnClickLogo = () => {
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logo}
          src={image}
          alt='logo'
          onClick={handleOnClickLogo}
        />
      </div>
      <nav className={styles.nav__links}>
        <ul>
          <li>
            <Link to='/'>HOME</Link>
          </li>
          <li>
            <Link to='/about'>ABOUT</Link>
          </li>
          <li>
            <Link to='/contact'>CONTACT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
