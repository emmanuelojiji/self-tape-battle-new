import { Link } from "react-router-dom";



const Header = () => {
  return (
    <header>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Log in</Link>
    </header>
  );
};

export default Header;
