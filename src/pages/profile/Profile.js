import userEvent from "@testing-library/user-event";
import {
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";
import { db, auth } from "../../firebase";
import "./Profile.scss";
import EntryCard from "../../components/EntryCard";
import Nav from "../../components/Nav";
import RankPill from "../../components/RankPill";

const Profile = () => {
  const { username } = useParams();

  const usersCollection = collection(db, "users");

  const [uid, setUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [webLink, setWebLink] = useState("");
  const [entries, setEntries] = useState([]);
  const [rank, setRank] = useState("");
  const [headshot, setHeadshot] = useState("");
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    getUser();
    getEntries();
    getBattles();
  }, [uid, username]);

  const getUser = async () => {
    try {
      const q = query(usersCollection, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      const userArray = [];

      userSnapshot.forEach((doc) => {
        userArray.push(doc);
      });

      const user = userArray[0].data();

      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBio(user.bio);
      setWebLink(user.webLink);
      setUid(user.uid);
      setRank(user.rank);
      setHeadshot(user.headshot);
    } catch (error) {
      console.log(error);
    }
  };

  const getBattles = async () => {
    try {
      const battlesRef = collection(db, "battles");
      const battlesSnapshot = await getDocs(battlesRef);

      const battlesArray = [];

      battlesSnapshot.forEach((battle) => battlesArray.push(battle.data()));
      setBattles(battlesArray);
      console.log(battles);
    } catch {
      console.log("Couldn't get battle sorry ");
    }
  };

  const getEntries = async () => {
    try {
      const entriesRef = collectionGroup(db, "entries");
      const q = query(entriesRef, where("uid", "==", uid));
      const entriesRefSnapshot = await getDocs(q);

      const entries = [];

      entriesRefSnapshot.forEach((doc) => {
        entries.push(doc.data());
      });

      setEntries(entries);
    } catch (error) {
      console.log(error);
    }
  };

  const linkColours = [
    {
      veteran: "rgba(247, 46, 15, 0.841)",
    },
  ];

  useEffect(() => {
    console.log(linkColours.includes(rank));
  }, [rank]);

  return (
    <>
      <Outlet />
      <Header />

      <div className="Profile">
        <div className="page-container">
          <div className="profile-header">
            <div className="headshot">
              <img src={headshot} />
            </div>
            <div className="user-info">
              <div className="name-rank-wrap">
                <h1>
                  {firstName} {lastName}
                </h1>
                <RankPill rank={rank} />
              </div>
              <p className="username">
                <i class="fa-solid fa-user-tag"></i>
                {username}
              </p>
              <p className="bio">{bio}</p>
              <a className={`web-link ${rank}`} href={webLink} target="_blank">
                {webLink}
              </a>
              <p onClick={() => auth.signOut()}>Log out</p>
            </div>
          </div>

          <h2>Entries</h2>
          <div className="entry-grid">
            {entries.map((entry) => {
              const battle = battles.find(
                (battle) => battle.id === entry.battleId
              );
              return (
                <EntryCard
                  src={entry.url}
                  uid={entry.uid}
                  battleId={entry.battleId}
                  page={username}
                  battleName={battle?.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
