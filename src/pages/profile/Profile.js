import userEvent from "@testing-library/user-event";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../firebase";
import "./Profile.scss";

const Profile = () => {
  const { username } = useParams();

  const usersCollection = collection(db, "users");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [webLink, setWebLink] = useState("");

  useEffect(() => {
    getUser();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="Profile">
        <div className="page-container">
          <div className="profile-header">
            <div className="headshot"></div>
            <div className="user-info">
              <h1>
                {firstName} {lastName}
              </h1>
              <p>{username}</p>
              <p>{bio}</p>
              <a href={webLink} target="_blank">{webLink}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
