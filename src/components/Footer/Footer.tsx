import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
export const Footer = () => {
  return (
    <nav className={styles.footer}>
      <ul>
        {/* <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li> */}
        <li>
          <Link to='/superAdmin'>SuperAdmin Page</Link>
        </li>
      </ul>
    </nav>
  );
};
