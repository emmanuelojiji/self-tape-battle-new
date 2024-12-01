import BattleCard from "../../components/BattleCard";
import Header from "../../components/Header";
import "./Battles.scss";
import dune from "../../media/dune.jpg";
import hairspray from "../../media/hairspray.webp";
import lion_king from "../../media/lion_king.jpeg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";

const Battles = () => {
  useEffect(() => {
    getBattles();
  }, []);

  const [battles, setBattles] = useState([]);

  const battlesCollection = collection(db, "battles");

  const getBattles = async () => {
    try {
      const battlesSnapshot = await getDocs(battlesCollection);
      const battlesArray = [];
      battlesSnapshot.forEach((doc) => {
        battlesArray.push(doc.data());
        setBattles(battlesArray);
      });
    } catch {
      console.log("Couldn't retrieve battles, sorry!");
    }
  };

  return (
    <>
      <Header />
    
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Join a battle</h1>
        </div>
        <div className="battle-grid">
          {battles.map((battle) => (
            <BattleCard
              title={battle.name}
              prize={battle.prize}
              id={battle.id}
              amountOfEntrees={battle.entries}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Battles;
