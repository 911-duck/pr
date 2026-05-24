import styles from "./Codearea.module.css";

function Codearea({setCode, value, color = '#25ff58', height}) {
  return (
    <>
      <textarea
        className={styles.area}
        value={value}
        style={{color: color, height: height+"%"}}
        onChange={(e) => {
          if(setCode)setCode(e.target.value);
        }}
      >
        {value}
      </textarea>
    </>
  );
}

export default Codearea;
