import "./Battle.scss";
import Header from "../../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import UploadModal from "../../components/UploadModal";
import EntryCard from "../../components/EntryCard";
import RewardModal from "../../components/RewardModal";
import { RewardModalContext } from "../../contexts/RewardModalContext";
import { UserContext } from "../../contexts/UserContext";
import StoryModal from "../../components/StoryModal";

const Battle = ({}) => {
  const { battleId } = useParams();

  const { uid } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBattle();
    getEntries();
    getUsers();
  }, [battleId]);

  const { isRewardModalVisible, setIsRewardModalVisible } =
    useContext(RewardModalContext);

  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [entries, setEntries] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [battleStatus, setBattleStatus] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [isStoryModalVisible, setIsStoryModalVisible] = useState(false);

  const [infoViewed, setInfoViewed] = useState(false);

  const battleDoc = doc(db, "battles", battleId);

  const getBattle = async () => {
    try {
      const battleScreenshot = await getDoc(battleDoc);
      setTitle(battleScreenshot.data().name);
      setPrize(battleScreenshot.data().prize);

      if (battleScreenshot.data().deadline > Date.now()) {
        setBattleStatus("open");
      } else {
        setBattleStatus("closed");
      }

      console.log(battleScreenshot.data().deadline > Date.now());
    } catch {
      console.log("Sorry we couldn't get this!");
    }
  };

  const getEntries = async () => {
    try {
      const entriesCollection = collection(db, "battles", battleId, "entries");
      const q = query(entriesCollection, orderBy("votes", "desc"));
      const entriesSnapshot = await getDocs(q);

      const entriesArray = [];
      entriesSnapshot.forEach((doc) => {
        entriesArray.push(doc.data());
      });
      setEntries(entriesArray);
    } catch {
      console.log("can't get this sorry");
    }
  };

  const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersArray = [];
    try {
      const usersSnapshot = await getDocs(usersCollection);

      usersSnapshot.forEach((doc) => {
        usersArray.push(doc.data());
      });

      setAllUsers(usersArray);
    } catch {
      console.log("couldn't get users");
    } finally {
      setAllUsers(usersArray);
    }
  };

  const [chosenVideo, setChosenVideo] = useState();

  return (
    <>
      {isStoryModalVisible && (
        <StoryModal
          prize={prize}
          closeModal={() => setIsStoryModalVisible(false)}
          infoViewed={infoViewed}
        />
      )}
      {isRewardModalVisible && (
        <RewardModal closeModal={() => setIsRewardModalVisible(false)} />
      )}
      <div className="Battle">
        {uploadModalVisible && (
          <UploadModal
            id={battleId}
            setUploadModalVisible={setUploadModalVisible}
          />
        )}
        <Header />
        <div className="page-container">
          <Outlet />
          <div className="page-header">
            <div>
              <h1 className="page-title">{title}</h1>
              <p>
                <b>{prize}</b>
              </p>
            </div>

            <div className="page-header-right">
              <div
                className="page-header-action-button"
                onClick={() => {
                  setIsStoryModalVisible(true);

                  setTimeout(() => {
                    setInfoViewed(true);
                  }, 5000);
                }}
              >
                ?
              </div>
              <div className="page-header-action-button">?</div>

              {battleStatus === "open" && (
                <button
                  onClick={() => setUploadModalVisible(true)}
                  className="button"
                  disabled={entries.find((entry) => entry.uid === uid)}
                >
                  {entries.find((entry) => entry.uid === uid)
                    ? "Joined"
                    : "Join Battle"}
                </button>
              )}
            </div>
          </div>
          <div className="entry-grid">
            {entries.map((entry) => (
              <EntryCard
                battleId={battleId}
                src={entry.url}
                votes={entry.votes}
                uid={entry.uid}
                page="battles"
                firstName={
                  allUsers.find((user) => user.uid === entry.uid)?.firstName
                }
                lastName={
                  allUsers.find((user) => user.uid === entry.uid)?.lastName
                }
                onClick={() => {
                  console.log(chosenVideo);
                }}
                winner={entry.uid === entries[0].uid}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Battle;
