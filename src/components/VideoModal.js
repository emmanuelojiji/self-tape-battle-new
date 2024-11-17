import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useHistory, useParams, Link } from "react-router-dom";
import { RewardModalContext } from "../contexts/RewardModalContext";
import { UserContext } from "../contexts/UserContext";
import { db } from "../firebase";
import "./VideoModal.scss";

const VideoModal = () => {
  const { battleId, uploadUid } = useParams();
  const { uid } = useContext(UserContext);

  const entryRef = doc(db, "battles", battleId, "entries", uploadUid);

  const [url, setUrl] = useState("");
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  // Calculate userHasVoted based on votes array and uid
  const userHasVoted = useMemo(() => votes.includes(uid), [votes, uid]);

  useEffect(() => {
    getEntry();
  }, [uploadUid]);

  useEffect(() => {
    // Set up the snapshot listener for votes field only
    onSnapshot(entryRef, (doc) => {
      const entryData = doc.data();
      if (entryData && entryData.votes) {
        setVotes(entryData.votes);
      }
    });

    // Clean up the listener when the component is unmounted or if uploadUid changes
  }, []);

  const getEntry = async () => {
    setLoading(true);

    onSnapshot(entryRef, async () => {
      {
        try {
          const entrySnapshot = await getDoc(entryRef);

          const entryData = entrySnapshot.data();
          setUrl(entryData.url);

          const userRef = doc(db, "users", uploadUid);
          const userSnapshot = await getDoc(userRef);
          setFirstName(userSnapshot.data().firstName);
          setLastName(userSnapshot.data().lastName);
          setUsername(userSnapshot.data().username);
        } catch (error) {
          console.error("Cannot get entry", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleVoting = async () => {
    if (!userHasVoted) {
      try {
        await updateDoc(entryRef, {
          votes: arrayUnion(uid),
        });

        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);
        await updateDoc(userRef, {
          coins: userSnapshot.data().coins + 1,
        });

        setTitle("Your vote is in!");
        setCoinsEarned(1);
        setIsRewardModalVisible(true);
      } catch (error) {
        console.error("Error handling vote", error);
      }
    }
  };

  const navigate = useNavigate();

  const {
    setIsRewardModalVisible,
    title,
    setTitle,
    coinsEarned,
    setCoinsEarned,
  } = useContext(RewardModalContext);

  return (
    <div className="VideoModal">
      <div className="video-container">
        <div className="video-modal-header">
          <div className="video-modal-header-right">
            <h3>
              <Link to={`:/${username}`}>
                {firstName} {lastName}
              </Link>
            </h3>
            <p>{votes.length} Votes</p>
          </div>

          <div>
            <button onClick={() => handleVoting()} disabled={userHasVoted}>
              {userHasVoted ? "Voted!" : "Vote"}
            </button>

            <button onClick={() => navigate(-1)}>Close</button>
          </div>
        </div>
        <video src={url} controls />
      </div>
    </div>
  );
};

export default VideoModal;
