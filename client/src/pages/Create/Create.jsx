import Codearea from "../../components/Codearea/Codearea";
import styles from "./Create.module.css";
import { runCode } from "../../utils/runCode";
import Button from "../../components/Button/Button";
import { useCodeStore } from "../../store/useCodeStore";
import { useEffect, useState } from "react";
import ResultWindow from "../../components/ResultWindow/ResultWindow";
import Choice from "../../components/choice/choice";
import { useUserStore } from "../../store/useUserStore";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router";

function Create() {
    let [name, setN] = useState(null)
  let navigate = useNavigate();

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);
  let createPTasks = useCodeStore((state) => state.createPTasks);

  const getUserFunct = async () => {
    const user = await getUser()
    console.log(user)
    if(user){
      getAllUserData(user.user);
      setN(user.user.name)
    }else{
      navigate("/SIGNUP");
    }
  }

  useEffect(()=>{
    getUserFunct()
  },[])

  const [testCode, setTestCode] = useState("// console.log(yourFunct())")
  const [initialCode, setInitialCode] = useState("// function yourFunction(parametrs) {}")
  const [code, setCode] = useState("// function yourFunction(parametrs) {}")
  const [result, setResult] = useState(null)
  const [title, setTitle] = useState("назвние твоего задания")
  const [task, setTask] = useState("задание...")
  const [obj, setObj] = useState(null)

  useEffect(()=>{
    setResult("")
  },[])

  const titleHandler = (input) =>{
    if(input.length == 0) return false
    else return true
  }

  
  const names = ["8kyu", "7kyu"]

  const [val, setVal] = useState(names[0])

  return (
    <>
      <div className={styles.container}>

        <div className={styles.codeC}>
          <div className={styles.up}><span className={styles.header}>{"задание"}</span>
                <Input type = {"text"} action={setTitle} input={title} errors={titleHandler}/>
                      <Choice values={names} names={names} set={setVal} color={"#6AC968"}/>
          </div>
          <div className={styles.main}>
            <Codearea color={"#D6D6D6"} value={task} setCode={setTask} />
          </div>
          <div className={styles.up}>код для тестеровки</div>
          <div className={styles.main}>
            <Codearea setCode={setTestCode} value={testCode} />
          </div>
          <div className={styles.up}>код для старта
          </div>
          <div className={styles.main}>
            <Codearea setCode={setInitialCode} value={initialCode} />
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
                  (obj ?
                  `

> cpu time  ${obj.executionTime} msec
> memory  ${obj.memoryUsed/1000} Bytes`: "")
                }
              />
            </span>
             
            <div className={styles.comp}>
              <Button
                color={"#6AC968"}
                text={"RUN"}
                action={async () => {
                  let obj2 = {
                    title: title,
                    task: task,
                    result: null,
                    testCode: testCode,
                    difficulty: val,
                    initialCode: initialCode
                  }
                    setObj(await runCode(code+`

                    `+testCode))
                    if(obj) obj2.result = obj.output
                  setResult(obj2.result);
                }}
              />{" "}
            </div>

          </div>
        </div>
        <div className={styles.comp2}>
              <Button
                color={"#6AC968"}
                text={"PUBLISH"}
                action={async () => {
                  let obj2 = {
                    title: title,
                    task: task,
                    result: null,
                    testCode: testCode,
                    difficulty: val,
                    initialCode: initialCode,
                    createby: name
                  }
                  setObj(await runCode(code+`
                    `+testCode))
                    if(obj) obj2.result = obj.stdout
                    setResult(obj.stdout);
                    if(obj.stderr){
                      setResult(obj.stderr);
                    }else{
                      await createPTasks(obj2)
                      navigate("/PUBLIC");
                    }
                }}
              />{" "}
            </div>
      </div>
    </>
  );
}

export default Create;
