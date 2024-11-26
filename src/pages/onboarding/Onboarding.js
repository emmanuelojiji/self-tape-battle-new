import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
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

  const updateField = (e, setter) => {
    setter(e.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const userRef = doc(db, "users", uid);

      const imageRef = ref(storage, `/headshots/${uid}`);
      await uploadBytes(imageRef, file);

      const downloadUrl = await getDownloadURL(imageRef);

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
      <Header />
      <div className="page-container">
        <h1>Hey {username}, create your battle profile</h1>

        <div
          className="avatar-upload"
          onClick={() => fileInputRef.current.click()}
          style={{ backgroundImage: filePreview && `url(${filePreview})` }}
        ></div>

      
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
      
      </div>
    </div>
  );
};

export default Onboarding;
