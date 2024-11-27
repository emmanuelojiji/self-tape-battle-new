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
  winner,
  headshot,
}) => {
  return (
    <>
      <Link to={`/${page}/${battleId}/${uid}`}>
        <div className="EntryCard">
          <div className="video-container">
            <video
              src={src}
              onContextMenu={(e) => e.preventDefault()}
              className={winner ? "winner" : null}
            />
            <div className="play-button">
              <i class="fa-solid fa-play"></i>
            </div>
            {winner && <div className="winner-pill">Winner</div>}
          </div>
          <div className="user-container">
            <div className="avatar-name-wrap">
              <div className="avatar-circle">
                <img src={headshot} />
              </div>
              <h3>
                {firstName} {lastName}
              </h3>
            </div>

            <p>{votes} Votes</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EntryCard;
