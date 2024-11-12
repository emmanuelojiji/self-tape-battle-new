import "./Landing.scss";
import "../../components/Header";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Landing = () => {
  return (
    <>
      <Header />
      <section className="billboard">
        <h1>Battle for fame</h1>
        <Link to={auth.currentUser ? "/battles" : "/signup"}>
          <button>Start Battling</button>
        </Link>
      </section>
    </>
  );
};

export default Landing;
