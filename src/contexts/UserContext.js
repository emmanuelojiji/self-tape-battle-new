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

  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUID(user.uid);
      const userRef = doc(db, "users", user.uid);

      onSnapshot(userRef, (doc) => {
        setCoins(doc.data().coins);
      });
      try {
        const userSnapshot = await getDoc(userRef);

        setFirstName(userSnapshot.data().firstName);
        setLastName(userSnapshot.data().lastName);
        setUsername(userSnapshot.data().username);
        setUser(user);
        setUserEmail(user.email);
      } catch {
        console.log("Couldn't get document!");
      } finally{
        setLoading(false)
      }
    } else {
      setLoading(false);
    }
  });

  return (
    <UserContext.Provider
      value={{
        user,
        firstName,
        lastName,
        userEmail,
        coins,
        uid,
        username,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
