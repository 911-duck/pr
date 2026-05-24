import styles from "./Singin.module.css";
import Icon from "./../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Message from "../../components/Message/Message";

function Singin() {
  let navigate = useNavigate();
  const [message, setM] = useState("");

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);

  const getUserFunct = async () => {
    const user = await getUser();
    console.log(user);
    try {
      if (!Object.hasOwn(user, "message")) {
                if (!Object.hasOwn(user, "result")) {

          getAllUserData(user.user);
          navigate("/GAME/");
        } else {
          if (user.result.message) {
            setM(user.result.message);
            setTimeout(() => {
              setM(null);
            }, 4000);
          }
        }
      } else {
        if (user.message) {
          setM(user.message);
          setTimeout(() => {
            setM(null);
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFunct();
  }, []);

  let setEmail = useUserStore((state) => state.setEmail);
  let loginUser = useUserStore((state) => state.loginUser);

  let email = useUserStore((state) => state.userEmail);

  const [password, setPassword] = useState(null);

  const emailErrors = (input) => {
    if (input.length < 3) return false;
    if (!input.includes("@")) return false;
    return true;
  };

  const passwordErrors = (input) => {
    if (input.length < 9) return false;
    if (input.length > 24) return false;
    return true;
  };

  return (
    <>
      <Message m={message} color={"#6AC968"} top={message ? "60px" : "-50%"} />

      <div className={styles.container}>
        <div className={styles.console}>
          <div className={styles.up}></div>
          <Icon width={315} heigth={138} />
          <span className={styles.text}>
            <span style={{ color: "#00580C" }}>Home@DESKTOP</span>{" "}
            <span style={{ color: "#D40AAF" }}>MINGW64</span>{" "}
            <span style={{ color: "#C4B109" }}>~/User/Authorisation</span>
            <br />
            SIGN IN <br />
            email?
            <Input
              action={setEmail}
              type={"email"}
              errors={emailErrors}
              input={email}
            />
            <br />
            password?
            <Input
              action={setPassword}
              type={"password"}
              errors={passwordErrors}
              input={password}
            />
            <br />
          </span>
          <div className={styles.centred}>
            <Button
              color={"#6AC968"}
              action={async () => {
                let user = await loginUser(password, email);
                console.log(user);
                if (!Object.hasOwn(user, "message")) {
                                  if (Object.hasOwn(user, "result")) {

                    getAllUserData(user.result);
                    navigate("/GAME/");
                  } else {
                    if (user.result.message) {
                      setM(user.result.message);
                      setTimeout(() => {
                        setM(null);
                      }, 4000);
                    }
                  }
                } else {
                  if (user.message) {
                    setM(user.message);
                    setTimeout(() => {
                      setM(null);
                    }, 4000);
                  }
                }
              }}
              text={"SING IN"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Singin;
