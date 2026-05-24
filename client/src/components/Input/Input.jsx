import styles from "./Input.module.css";
import { useState } from "react";

function Input({ type, action, input, errors }) {
  const [touched, setTouched] = useState(false);

  const getError = () => {
    if (!errors(input)) return true;
    return null;
  };

  const error = touched ? getError() : null;

  return (
    <>
      <input
        type={type}
        value={input}
        onChange={(e) => {
          setTouched(true);
          action(e.target.value);
        }}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
    </>
  );
}

export default Input;
