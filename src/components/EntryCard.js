import { Link, useParams } from "react-router-dom";
import "./EntryCard.scss";

const EntryCard = ({
  src,
  votes,
  uid,
  firstName,
  lastName,
  page,
  battleId,
}) => {
  return (
    <>
      <Link to={`/${page}/${battleId}/${uid}`}>
        <div className="EntryCard">
          <div className="video-container">
            <video src={src} onContextMenu={(e) => e.preventDefault()} />
            <div className="play-button">play</div>
          </div>

          <h3>
            {firstName} {lastName}
          </h3>
          <p>{votes.length} Votes</p>
        </div>
      </Link>
    </>
  );
};

export default EntryCard;
