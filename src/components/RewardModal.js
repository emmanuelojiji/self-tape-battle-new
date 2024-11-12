import "./RewardModal.scss";

const RewardModal = ({ coinsEarned }) => {
  return (
    <div className="reward-modal-container">
    <div className="RewardModal">
      <h3>You've earned {coinsEarned} coin!</h3>
      </div>
    </div>
  );
};

export default RewardModal;
