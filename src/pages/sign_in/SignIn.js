import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../firebase";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, loading } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Wait for user context updates
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/battles");
          unsubscribe(); // Clean up listener
        }
      });
    } catch {
      console.log("Couldn't sign in");
    }
  };

  return (
    <>
      <Header />
      <form>
        <h1>Sign In</h1>
        <TextInput
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextInput
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) => {
            handleSignIn();
            e.preventDefault();
          }}
        >
          Sign In
        </button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </>
  );
};

export default SignIn;
