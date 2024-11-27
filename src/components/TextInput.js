import "./TextInput.scss";
const TextInput = ({ placeholder, onChange, type, error }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="textInput"
      ></input>
      {error}
    </>
  );
};

export default TextInput;
