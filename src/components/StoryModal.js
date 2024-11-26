import { useCallback, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { UserContext } from "../contexts/UserContext";
import "./StoryModal.scss";

const StoryModal = ({ prize, closeModal, infoViewed }) => {
  const { firstName } = useContext(UserContext);
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Welcome fighter..</h2>
        {!infoViewed && (
          <Typewriter
            words={[
              `${firstName}, You've been chosen to enter this amazing battle. You have a short 1 page script to learn to win ${prize}. Do not let me down, I'm counting on you!`,
            ]}
          />
        )}

        {infoViewed && (
          <p>{`${firstName}, You've been chosen to enter this amazing battle.You have a short 1 page script to learn tos win ${prize}. Do not let me down, I'm counting on you!`}</p>
        )}
        <button onClick={closeModal}>Got it!</button>
      </div>
    </div>
  );
};

export default StoryModal;
