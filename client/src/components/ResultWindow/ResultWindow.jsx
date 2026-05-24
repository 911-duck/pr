import Button from "../Button/Button";
import styles from "./ResultWindow.module.css";
import { useCodeStore } from "../../store/useCodeStore";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function ResultWindow({ len = 50, rigth = 4, funct, funct2, obj }) {
  let navigate = useNavigate();

  const code = useCodeStore((st) => st.code);
  let email = useUserStore((state) => state.userEmail);
  let setLvlAndPr = useUserStore((state) => state.setLvlAndPr);
  let pr = useUserStore((state) => state.userLvlPr);
  let lvl = useUserStore((state) => state.userLvl);

  useEffect(() => {
    let doneR = obj.criteria.required.reduce(
      (acc, el) => code.includes(el) ? acc + 1 : acc,
      0
    );
    let lenR = obj.criteria.required.length;

    let doneB = obj.criteria.bonus.reduce(
      (acc, el) => code.includes(el) ? acc + 1 : acc,
      0
    );
    let lenB = obj.criteria.bonus.length;

    let finalExp =(doneR / lenR) * (obj.exp * 0.75) + (doneB / lenB) * (obj.exp * 0.25);
    setLvlAndPr(
      lvl + Math.floor((pr + finalExp) / (lvl*20)),
      (pr + finalExp) % (lvl*20),
      email,
    );
    console.log(lvl, pr, finalExp,doneR,(doneB / lenB));
  }, []);

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.up}></div>
        <div className={styles.how}>потрясающе</div>
        <div className={styles.header}>задание пройдено</div>
        <span className={styles.text}>
          {obj.criteria.required.map((el, i) => {
            console.log(el);
            let text =
              (code.includes(el)
                ? obj.requiredMessage[i] +
              " +" +
              1 * obj.exp * 0.75+" exp."
                : ("Не" + obj.requiredMessage[i].toLowerCase()) +" 0 exp.")
            return (
              <>
                {">"} {text} <br />
              </>
            );
          })}
          {obj.criteria.bonus.map((el, i) => {
            let text =
              (code.includes(el)
                ? obj.bonusMessage[i]+ " +"+
              1 * obj.exp * 0.25+" exp."
                : ("Не" + obj.bonusMessage[i].toLowerCase()) +" 0 exp.")
            return (
              <>
                {">"} {text} <br />
              </>
            );
          })}
        </span>
        <div className={styles.l}>
          <Button
            type={1}
            action={() => {
              funct();
            }}
            text={"продолжить"}
          />
          <Button
            type={1}
            text={"главное меню"}
            action={() => {
              console.log("hi");
              navigate("/GAME");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ResultWindow;
