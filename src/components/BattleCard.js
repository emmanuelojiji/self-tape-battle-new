import { Link } from "react-router-dom";
import "./BattleCard.scss";

const BattleCard = ({ title, prize, bg, id, amountOfEntrees }) => {
  return (
    <Link to={`/battles/${id}`}>
      <div className="battle-card">
        <div className="img-container">
          <div className="entries-pill">{`${amountOfEntrees} ${
            amountOfEntrees > 1 ? "Fighters" : "Fighter"
          }`}</div>
          <img src={bg} />
        </div>
        <h3>{title}</h3>
        <p>{prize}</p>
      </div>
    </Link>
  );
};

export default BattleCard;
