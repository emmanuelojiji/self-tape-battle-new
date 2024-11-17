import { useContext } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { RewardModalContext } from "../contexts/RewardModalContext";
import "./RewardModal.scss";

const RewardModal = ({ closeModal }) => {
  const { title, coinsEarned } = useContext(RewardModalContext);
  return (
    <>
      <div className="reward-modal-container">
        <div className="RewardModal">
          <h3>{title}</h3>
          <p>You've earned {coinsEarned} coin!</p>

          <ConfettiExplosion zIndex={2} />
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  );
};

export default RewardModal;
