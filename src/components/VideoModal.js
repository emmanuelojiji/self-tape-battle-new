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

  const battleRef = doc(db, "battles", battleId);

  const [url, setUrl] = useState("");
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [voters, setVoters] = useState([]);
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

          const battleRef = doc(db, "battles", battleId);
          const votersSnapshot = await getDoc(battleRef);

          setVoters(votersSnapshot.data().voters);
          console.log(voters);
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

        await updateDoc(battleRef, {
          voters: arrayUnion(uid),
        });

        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);

        await updateDoc(userRef, {
          coins: !voters.includes(uid)
            ? userSnapshot.data().coins + 1
            : userSnapshot.data().coins + 0,
        });

        setTitle("Your vote is in!");

        setIsRewardModalVisible(true);

        if (!voters.includes(uid)) {
          setCoinsEarned(1);
        } else {
          setCoinsEarned(0);
        }
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
              <Link to={`/${username}`}>
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
