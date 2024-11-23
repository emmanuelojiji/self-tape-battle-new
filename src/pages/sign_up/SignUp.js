import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { auth, db } from "../../firebase";
import "./SignUp.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", auth.currentUser.uid);

      await setDoc(userRef, {
        uid: auth.currentUser.uid,
        onboarding_complete: false,
        firstName: "",
        lastName: "",
        username: username,
        bio: "",
        webLink: "",
        email: auth.currentUser.email,
        rank: "newbie",
        coins: 1,
      });

      navigate("/onboarding");
    } catch {
      console.log("Sorry, couldn't create account");
    }
  };

  return (
    <>
      <Header />
      <main className="SignUp">
        <form className="sign-up-form">
          <h1>Sign Up</h1>
          <TextInput
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></TextInput>
          <TextInput
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></TextInput>
          <TextInput
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></TextInput>

          <button
            onClick={(e) => {
              handleSignUp();
              e.preventDefault();
            }}
          >
            Sign Up
          </button>
          <Link to="/signin">Log In</Link>
        </form>
      </main>
    </>
  );
};

export default SignUp;
