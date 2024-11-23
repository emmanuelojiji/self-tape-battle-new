import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../firebase";
import "./Onboarding.scss";

const Onboarding = () => {
  const { uid, username, isOnboardingComplete, loading, user } =
    useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [webLink, setWebLink] = useState("");

  const updateField = (e, setter) => {
    setter(e.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        webLink: webLink,
        isOnboardingComplete: true,
      });

      navigate("/battles");
    } catch {
      console.log("Couldn't update sorreh");
    }
  };

  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return !user ? (
    <Navigate to="/signup" />
  ) : user && isOnboardingComplete ? (
    <Navigate to="/battles" />
  ) : (
    <div className="Onboarding">
      <Header />
      <div className="page-container">
        <h1>Hey {username}, create your battle profile</h1>

        <form>
          <TextInput
            placeholder="First Name"
            onChange={(e) => updateField(e, setFirstName)}
          />
          <TextInput
            placeholder="Last Name"
            onChange={(e) => updateField(e, setLastName)}
          />
          <TextInput
            placeholder="Bio"
            onChange={(e) => updateField(e, setBio)}
          />
          <TextInput
            placeholder="Web Link"
            onChange={(e) => updateField(e, setWebLink)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
