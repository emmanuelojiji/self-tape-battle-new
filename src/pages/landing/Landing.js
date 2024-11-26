import "./Landing.scss";
import "../../components/Header";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Landing = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <section className="billboard">
        <h1>FIGHT TO BE SEEN</h1>
        <Link to="/battles">
          <button>Start Battling</button>
        </Link>
      </section>
    </>
  );
};

export default Landing;
