import Button from "../Button/Button";
import Difficult from "../Difficult/Difficult";
import styles from "./Exercise.module.css";
import { useCodeStore } from "../../store/useCodeStore";
import { useNavigate } from "react-router";

function Exercise({ task, type }) {
  let navigate = useNavigate();
  const setCurrentTask = useCodeStore((state) => state.setCurrentTask);
  if (type == 0) {
    return (
      <>
        <div className={styles.exercise}>
          <div className={styles.name}>{task.title}</div>
          <div className={styles.centred}>
            <Button
              color={"#6AC968"}
              text={"START"}
              action={() => {
                if (task) {
                  setCurrentTask(task);
                  navigate("/GAME/PRACTICE");
                }
              }}
            />
          </div>
          <div className={styles.l}>
            {" "}
            <Difficult level={task.difficulty} />
          </div>
        </div>
      </>
    );
  }else if(type == 1){
    return (
      <>
        <div className={styles.exercisee}>
          <div className={styles.name2}><span className={styles.sp}>{task.title.length > 31?task.title.slice(0,27)+"..." :task.title}</span> <span>{task.difficulty}</span> <span>{task.exp}exp.</span></div>
            <Button
              color={"#6AC968"}
              text={"START"}
              action={() => {
                if (task) {
                  setCurrentTask(task);
                  navigate("/GAME/PRACTICE");
                }
              }}
            />
        </div>
      </>
    );
  }else if(type == 2){
    return (
      <>
        <div className={styles.exercisee}>
          <div className={styles.name2}><span className={styles.sp}>{task.title.length > 31?task.title.slice(0,27)+"..." :task.title}</span> <span>сделано {task.createby}</span></div>
            <Button
              color={"#6AC968"}
              text={"START"}
              action={() => {
                if (task) {
                  setCurrentTask(task);
                  navigate("/GAME/PRACTICE");
                }
              }}
            />
        </div>
      </>
    );
  }
}

export default Exercise;
