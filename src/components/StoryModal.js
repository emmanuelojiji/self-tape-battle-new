import { Typewriter } from "react-simple-typewriter";
import "./StoryModal.scss";

const StoryModal = ({ prize, closeModal, infoViewed }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Welcome fighter..</h2>
        {!infoViewed && (
          <Typewriter
            words={[
              `You've been chosen to enter this amazing battle. You have a short 1 page script to learn to win ${prize}. Do not let me down, I'm counting on you!`,
            ]}
          />
        )}

        {infoViewed && (
          <p>{`You've been chosen to enter this amazing battle.You have a short 1 page script to learn tos win ${prize}. Do not let me down, I'm counting on you!`}</p>
        )}
        <button onClick={closeModal}>Got it!</button>
      </div>
    </div>
  );
};

export default StoryModal;
