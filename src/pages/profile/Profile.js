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
import { db } from "../../firebase";
import "./Profile.scss";
import EntryCard from "../../components/EntryCard";

const Profile = () => {
  const { username } = useParams();

  const usersCollection = collection(db, "users");

  const [uid, setUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [webLink, setWebLink] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getUser();
    getEntries();
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
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <Outlet />
      <Header />
      <div className="Profile">
        <div className="page-container">
          <div className="profile-header">
            <div className="headshot"></div>
            <div className="user-info">
              <h1>
                {firstName} {lastName} {uid}
              </h1>
              <p>{username}</p>
              <p>{bio}</p>
              <a href={webLink} target="_blank">
                {webLink}
              </a>
            </div>
          </div>
          <div className="entry-grid">
            {entries.map((entry) => (
              <EntryCard
                votes={entry.votes}
                src={entry.url}
                uid={entry.uid}
                battleId={entry.battleId}
                page={username}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
