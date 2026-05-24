import Codearea from "../../components/Codearea/Codearea";
import styles from "./Sandbox.module.css";
import { runCode } from "../../utils/runCode";
import Button from "../../components/Button/Button";
import { useCodeStore } from "../../store/useCodeStore";
import Choice from "../../components/choice/choice";
import { useEffect,useState } from "react";
import ResultWindow from "../../components/ResultWindow/ResultWindow";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router";

function Sandbox() {
  let navigate = useNavigate();

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);

  const getUserFunct = async () => {
    const user = await getUser()
    console.log(user)
    if(user){
      getAllUserData(user.user);
    }else{
      navigate("/SIGNUP");
    }
  }

  
    useEffect(()=>{
      getUserFunct()
    },[])

  const names = ["JavaScript", "Python", "c++","c","c#","Java","Lua","Pascal"]
  const values = ["nodejs", "python", "cpp","c","csharp","java","lua","pascal"]
  const lang = ["js", "py", "cpp","c","cs","java","lua","pas"]

  const [language, setLanguage] = useState(values[0])
  const [obj, setObj] = useState(null)

  let code = useCodeStore((state) => state.code);
  let result = useCodeStore((state) => state.result);
  let setCode = useCodeStore((state) => state.setCode);
  let setResult = useCodeStore((state) => state.setResult);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.codeC}>
          <div className={styles.up}>main.{lang[values.findIndex(el=>el==language)]}
                      <Choice values={values} names={names} set={setLanguage} color={"#6AC968"}/>
            
          </div>
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
                value={
                  result + 
                  (obj? Object.hasOwn(obj, "executionTime") ?
                  `

> cpu time  ${obj.executionTime} msec
> memory  ${obj.memoryUsed/1000} Bytes`: "":"")
                }
              />
            </span>
            <div className={styles.comp}>
              <Button
                color={"#6AC968"}
                text={"RUN"}
                action={async () => {
                  let obj = await runCode(code, language, `main.${lang[values.findIndex(el=>el==language)]}`)
                  setObj(obj)
                  setResult(obj.stdout);
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
}

export default Sandbox;
