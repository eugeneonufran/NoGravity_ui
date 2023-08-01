import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar'>
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
        <li>
          <Link to='/superAdmin'>SuperAdmin Page</Link>
        </li>
      </ul>
    </nav>
  );
};
