import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import TextInput from "../../components/TextInput";
import { UserContext } from "../../contexts/UserContext";
import { db, storage } from "../../firebase";
import "./Onboarding.scss";

const Onboarding = () => {
  const { uid, username, isOnboardingComplete, loading, user } =
    useContext(UserContext);

  const fileInputRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [webLink, setWebLink] = useState("");
  const [file, setFile] = useState([]);
  const [filePreview, setFilePreview] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (e, setter) => {
    setter(e.target.value);
  };

  const handleUpdateUser = async () => {
    if (!firstName || !lastName || file.length === 0) {
      setError(true);
    } else {
      try {
        const userRef = doc(db, "users", uid);

        const imageRef = ref(storage, `/headshots/${uid}`);
        await uploadBytes(imageRef, file);

        const downloadUrl = await getDownloadURL(imageRef);

        setError("Please fill out all fields");

        await updateDoc(userRef, {
          firstName: firstName,
          lastName: lastName,
          bio: bio,
          webLink: webLink,
          isOnboardingComplete: true,
          headshot: downloadUrl,
        });

        navigate("/battles");
      } catch {
        console.log("Couldn't update sorreh");
      }
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          setFile(e.target.files[0]);
          const previewUrl = window.URL.createObjectURL(e.target.files[0]);
          setFilePreview(previewUrl);
        }}
      />
      <AppHeader />
      <div className="page-container">
        <h1>Hey {username}, create your battle profile</h1>

        <div
          className="avatar-upload"
          onClick={() => fileInputRef.current.click()}
          style={{ backgroundImage: filePreview && `url(${filePreview})` }}
        ></div>

        {error && file.length === 0 && "Please upload a headshot"}

        <TextInput
          placeholder="First Name"
          onChange={(e) => updateField(e, setFirstName)}
          error={error && !firstName && "Please enter first name"}
        />
        <TextInput
          placeholder="Last Name"
          onChange={(e) => updateField(e, setLastName)}
          error={error && !lastName && "Please enter Last name"}
        />
        <TextInput placeholder="Bio" onChange={(e) => updateField(e, setBio)} />
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
      </div>
    </div>
  );
};

export default Onboarding;
