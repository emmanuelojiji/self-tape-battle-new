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
  const [error, setError] = useState(false);

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
      <main className="SignUp">
        <Header />
        <div className="auth-container">
          <div className="auth-left">
            <h1 className="page-title">Join the Arena</h1>
            <p>5 other warriors are waiting for you..</p>

            <div className="form-container">
              <TextInput
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                error={error && !username && "Please enter username"}
              ></TextInput>
              <TextInput
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email && "Please enter an email"}
              ></TextInput>
              <TextInput
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                error={error && !password && "Please enter a password"}
              ></TextInput>

              <button
                onClick={(e) => {
                  if (username && email && password) {
                    handleSignUp();
                    e.preventDefault();
                  } else {
                    setError(true);
                  }
                }}
              > 
                Sign Up
              </button>
              <Link to="/signin">Log In</Link>
            </div>
          </div>
          <div className="sign-up-right">Right</div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
