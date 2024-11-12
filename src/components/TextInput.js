import "./TextInput.scss";
const TextInput = ({ placeholder, onChange, type }) => {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange}></input>
  );
};

export default TextInput;

