import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { Navigate, navigate, redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [coins, setCoins] = useState(null);
  const [uid, setUID] = useState(null);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, async (user) => {
    const userRef = doc(db, "users", user.uid);

    onSnapshot(userRef, (doc) => {
      setCoins(doc.data().coins);
    });

    if (user) {
      setUID(user.uid);
      try {
        const userSnapshot = await getDoc(userRef);

        setFirstName(userSnapshot.data().firstName);
        setLastName(userSnapshot.data().lastName);
        setUsername(userSnapshot.data().username);
        setUser(user);
      } catch {
        console.log("Couldn't get document!");
      }
      setUserEmail(user.email);
    } else {
      //
    }
  });

  return (
    <UserContext.Provider
      value={{ firstName, lastName, userEmail, coins, uid, username }}
    >
      {children}
    </UserContext.Provider>
  );
};
