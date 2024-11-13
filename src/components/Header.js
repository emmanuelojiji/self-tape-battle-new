import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import logo from "../media/logo.svg";
import "./Header.scss";

const Header = () => {
  const { firstName, userEmail, coins, user, username, loading } =
    useContext(UserContext);

  const navigate = useNavigate();

  return (
    <header>
      <Link to="/">
        <h3>Self Tape Battle</h3>
      </Link>

      {loading ? (
        <div className="user-header-skeleton"></div>
      ) : (
        <>
          {!auth.currentUser ? (
            <nav>
              <a>Home</a>\<a>About</a>
              <a href="/signin">Log In</a>
            </nav>
          ) : (
            <div className="user-header-container">
              <div className="coin-wrap">
                <div className="coins"></div>
                {coins}
              </div>
              <div className="user-wrap">
                <div className="avatar-circle"></div>
                <Link to={`/${username}`}>{firstName}</Link>
              </div>

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
        </>
      )}
    </header>
  );
};

export default Header;
