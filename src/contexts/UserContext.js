import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, navigate, redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [coins, setCoins] = useState(null);
  const [rank, setRank] = useState("");
  const [headshot, setHeadshot] = useState("");
  const [uid, setUID] = useState(null);
  const [user, setUser] = useState(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUID(user.uid);
        const userRef = doc(db, "users", user.uid);

        const unsubSnapshot = onSnapshot(userRef, (doc) => {
          setCoins(doc.data().coins);
        });

        try {
          const userSnapshot = await getDoc(userRef);
          setFirstName(userSnapshot.data().firstName);
          setLastName(userSnapshot.data().lastName);
          setUsername(userSnapshot.data().username);
          setRank(userSnapshot.data().rank);
          setUser(user);
          setUserEmail(user.email);
          setHeadshot(userSnapshot.data().headshot);
          setIsOnboardingComplete(userSnapshot.data().isOnboardingComplete);
        } catch (error) {
          console.log("Couldn't get document!", error);
        }
      } else {
        setUser(null);
        setIsOnboardingComplete(false);
      }
      setLoading(false); // Ensure loading is false after updates
    });

    return () => {
      unsubscribe(); // Clean up listener
    };
  }, []);

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
        rank,
        headshot,
        loading,
        setLoading,
        isOnboardingComplete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
