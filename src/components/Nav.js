import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav>
      <Link to="/battles">Home</Link>
    </nav>
  );
};

export default Nav;
