import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Nav.scss";

const Nav = () => {

  const { username, headshot } = useContext(UserContext);

  return (
    <nav className="in-game-nav">
      <Link to="/battles">Home</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to={`/${username}`}>
        <div
          className="avatar-circle"
          style={{ backgroundImage: `url(${headshot})` }}
        ></div>
      </Link>
    </nav>
  );
};

export default Nav;
