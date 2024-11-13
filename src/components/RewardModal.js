import ConfettiExplosion from "react-confetti-explosion";
import "./RewardModal.scss";

const RewardModal = ({ coinsEarned, closeModal }) => {
  return (
    <>
      <div className="reward-modal-container">
        <div className="RewardModal">
          <h3>You've earned {coinsEarned} coin!</h3>
          <ConfettiExplosion zIndex={2} />
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  );
};

export default RewardModal;
