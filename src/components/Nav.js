import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Nav.scss";

const Nav = () => {
  const { username, headshot } = useContext(UserContext);

  const excludedRoutes = ["/"];
  const location = useLocation();

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <nav className="in-game-nav">
        <Link to="/battles">
          <i class="fa-solid fa-landmark-dome"></i>
        </Link>
        <Link to="/wallet">
          <i class="fa-solid fa-wallet"></i>
        </Link>
        <Link to={`/${username}`}>
          <div
            className="avatar-circle"
            style={{ backgroundImage: `url(${headshot})` }}
          ></div>
        </Link>
      </nav>}
    </>
  );
};

export default Nav;
