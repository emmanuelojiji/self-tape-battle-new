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
  const [error, setError] = useState(false);

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
      <main className="SignIn">
        <Header />
        <div className="auth-container">
          <div className="auth-left">
            <h1 className="page-title">Welcome Back</h1>

            <div className="form-container">
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
                  if (email && password) {
                    handleSignIn();
                    e.preventDefault();
                  } else {
                    setError(true);
                  }
                }}
              >
                Sign In
              </button>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
          <div className="sign-up-right">Right</div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
