import "./Battle.scss";
import Header from "../../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import UploadModal from "../../components/UploadModal";
import EntryCard from "../../components/EntryCard";
import RewardModal from "../../components/RewardModal";
import { RewardModalContext } from "../../contexts/RewardModalContext";
import { UserContext } from "../../contexts/UserContext";

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
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const battleDoc = doc(db, "battles", battleId);

  const getBattle = async () => {
    try {
      const battleScreenshot = await getDoc(battleDoc);
      setTitle(battleScreenshot.data().name);
      setPrize(battleScreenshot.data().prize);
    } catch {
      console.log("Sorry we couldn't get this!");
    }
  };

  const getEntries = async () => {
    try {
      const entriesCollection = collection(db, "battles", battleId, "entries");
      const entriesSnapshot = await getDocs(entriesCollection);

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
          <div className="page-header">
            <div>
              <Outlet />
              <h1 className="page-title">{title}</h1>
              <p>
                <b>{prize}</b>
              </p>
            </div>

            <button
              onClick={() => setUploadModalVisible(true)}
              className="button"
            >
              {entries.find((entry) => entry.uid === uid)
                ? "Joined"
                : "Join Battle"}
            </button>
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
                onClick={() => {
                  console.log(chosenVideo);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Battle;
