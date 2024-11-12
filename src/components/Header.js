import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import logo from "../media/logo.svg";
import "./Header.scss";

const Header = () => {
  const { firstName, userEmail, coins, user, username } =
    useContext(UserContext);

  const navigate = useNavigate();

  return (
    <header>
      <Link to="/">
        <img src={logo} className="logo" />
      </Link>
      {!auth.currentUser ? (
        <nav>
          <a>Home</a>\<a>About</a>
          <a href="/signin">Log In</a>
        </nav>
      ) : (
        <div className="user-header-container">
          <div className="avatar-circle"></div>
          <Link to={`/${username}`}>{firstName}</Link>

          <p>Coins: {coins}</p>
          <p
            onClick={async () => {
              await auth.signOut();
              navigate("/");
            }}
          >
            Log out
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
