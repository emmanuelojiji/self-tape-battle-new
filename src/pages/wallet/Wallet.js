import { useContext } from "react";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";

const Wallet = () => {
  const { coins } = useContext(UserContext);
  return (
    <div className="Wallet">
      <Header />
      <div className="page-container">
        <h1>Wallet</h1>
        <h2>{coins} coins</h2>
      </div>
    </div>
  );
};

export default Wallet;
