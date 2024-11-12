import BattleCard from "../../components/BattleCard";
import Header from "../../components/Header";
import "./Battles.scss";
import dune from "../../media/dune.jpg";
import hairspray from "../../media/hairspray.webp";
import lion_king from "../../media/lion_king.jpeg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

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
        <h1 className="page-title">Arena</h1>
        <div className="battle-grid">
          {battles.map((battle) => (
            <BattleCard
              title={battle.name}
              prize={battle.prize}
              bg={hairspray}
              id={battle.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Battles;
