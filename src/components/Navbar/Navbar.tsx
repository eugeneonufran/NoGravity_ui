import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
const image = require("../../assets/logo_2_512.png");

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={image} alt='logo' />
      </div>
      <nav className={styles.nav__links}>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
