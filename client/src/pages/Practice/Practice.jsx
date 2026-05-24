import Codearea from "../../components/Codearea/Codearea";
import styles from "./Practice.module.css";
import { runCode } from "../../utils/runCode";
import Button from "../../components/Button/Button";
import { useCodeStore } from "../../store/useCodeStore";
import { useEffect, useState } from "react";
import ResultWindow from "../../components/ResultWindow/ResultWindow";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router";

function Practice() {
  let navigate = useNavigate();
  let code = useCodeStore((state) => state.code);
  let result = useCodeStore((state) => state.result);
  let setCode = useCodeStore((state) => state.setCode);
  let setResult = useCodeStore((state) => state.setResult);
  let currentTask = useCodeStore((state) => state.currentTask);
  let setCurrentTask = useCodeStore((state) => state.setCurrentTask);
  const getAllTasks = useCodeStore((state) => state.getAllTasks);

  const tasks = useCodeStore((state) => state.allTasks);
  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);
  const [NTask, setNTask] = useState();

  const getUserFunct = async () => {
    const user = await getUser();
    console.log(user);
    if (user) {
      getAllUserData(user.user);
      if (!currentTask) navigate("/GAME");
    }else{
      navigate("/SIGNUP");
    }
  };

  useEffect(() => {
    getUserFunct();
    getAllTasks();
  }, []);
  
  useEffect(() => {
    if (currentTask) setCode(currentTask.initialCode);
    else navigate("/GAME");
    setResult("");
  }, [currentTask]);

  useEffect(() => {
    if (tasks) {
      setNTask(tasks[Number(Math.floor(Math.random() * 10))]);
    } else setNTask(null);
  }, [tasks]);

  const [obj, setObj] = useState({stdout:null});

  if (currentTask) {
    return (
      <>
        {result ==
        currentTask.result +
          `
` ? (
          <ResultWindow
          obj={currentTask}
            funct2={() => {}}
            funct={() => {
              setCurrentTask(NTask);
              navigate("/GAME/PRACTICE");
            }}
          />
        ) : (
          ""
        )}
        {result ==
        currentTask.result +
          `
` ? (
          <div className={styles.block}></div>
        ) : (
          ""
        )}
        <div className={styles.container}>
          <div className={styles.codeC}>
            <div className={styles.up}>{currentTask.title}</div>
            <div className={styles.main}>
              <Codearea color={"#D6D6D6"} value={currentTask.task} />
            </div>
            <div className={styles.up}>main.js</div>
            <div className={styles.main}>
              <Codearea setCode={setCode} value={code} />
            </div>
            <div className={styles.up}>OUTPUT</div>
            <div className={styles.main}>
              <span className={styles.text}>
                <span style={{ color: "#00580C" }}>Home@DESKTOP</span>{" "}
                <span style={{ color: "#D40AAF" }}>MINGW64</span>{" "}
                <span style={{ color: "#C4B109" }}>~/User/task</span>
                <Codearea
                  color={"#D6D6D6"}
                  height={82}
                  value={
                    result +
                    (obj
                      ? `
${
  result ==
  currentTask.result +
    `
`
    ? "success"
    : ""
}

> cpu time  ${obj.executionTime} msec
> memory  ${obj.memoryUsed / 1000} Bytes`
                      : "")
                  }
                />
              </span>

              <div className={styles.comp}>
                <Button
                  color={"#6AC968"}
                  text={"RUN"}
                  action={async () => {
                    let obj = await runCode(
                      code +
                        `
                    ${currentTask.testCode}`,
                    );
                    setObj(obj);
                    setResult(obj.stdout);
                    console.log(obj.stdout)
                      if(obj.stderr){
                    setResult(obj.stderr);
                  }
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/GAME");
  }
}

export default Practice;
