import { useContext, useRef, useState } from "react";
import "./UploadModal.scss";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { RewardModalContext } from "../contexts/RewardModalContext";

const UploadModal = ({ setUploadModalVisible, setCoinsEarned }) => {
  const { battleId } = useParams();

  const { uid } = useContext(UserContext);

  const inputRef = useRef();

  const handleInputClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async () => {
    const videoRef = ref(storage, `/${battleId}/${uid}`);

    setIsUploading(true);

    try {
      await uploadBytes(videoRef, file);

      const downloadUrl = await getDownloadURL(videoRef);

      const entryRef = doc(db, "battles", battleId, "entries", uid);

      await setDoc(entryRef, {
        votes: 0,
        name: "",
        username: "",
        url: downloadUrl,
        uid: uid,
      });

      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);

      await updateDoc(userRef, {
        coins: userSnapshot.data().coins + 1,
      });

      const battleRef = doc(db, "battles", battleId);
      const battleSnapshot = await getDoc(battleRef);
      await updateDoc(battleRef, {
        entries: battleSnapshot.data().entries + 1,
      });

      setIsUploading(false);
      setFile(null);
      setUploadModalVisible(false);
      setCoinsEarned(1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRewardModalVisible(true);
    }
  };

  const { setIsRewardModalVisible } = useContext(RewardModalContext);

  return (
    <div className="upload-modal-container">
      <input
        type="file"
        className="hidden-input"
        ref={inputRef}
        accept=".mov, .mp4"
        onChange={(e) => setFile(e.target.files[0])}
      ></input>
      <div className="UploadModal">
        <h3>Upload your tape</h3>
        <div className="upload-box" onClick={() => handleInputClick()}>
          <h5>
            {file && !isUploading
              ? file.name
              : isUploading
              ? "Joining Battle.."
              : "Choose Tape"}
          </h5>
        </div>
        {file && <button onClick={() => handleVideoUpload()}>Upload</button>}
      </div>
    </div>
  );
};

export default UploadModal;
