import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import logo from "../media/logo.svg";
import headshot from "../media/headshot.jpg";
import "./Header.scss";
import RankPill from "./RankPill";

const Header = () => {
  const { coins, loading, rank, username, headshot } = useContext(UserContext);

  return (
    <header>
      <Link to="/">
        <img src={logo} className="logo"/>
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
            <>
              <div className="header-right">
                <div>
                  <Link to="/battles">Arena</Link>
                  <Link to="/wallet">Wallet</Link>
                </div>
                <div className="user-header-container">
                  <RankPill rank={rank}/>
                  <Link to="/wallet">
                    <div className="coin-wrap">
                      <i class="fa-solid fa-coins"></i>
                      {coins}
                    </div>
                  </Link>

                  <Link to={`/${username}`}>
                    <div
                      className="avatar-circle"
                      style={{ backgroundImage: `url(${headshot})` }}
                    ></div>
                  </Link>

                  {/*<p
                onClick={async () => {
                  await auth.signOut();
                  navigate("/");
                }}
              >
                Log out
              </p>*/}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
