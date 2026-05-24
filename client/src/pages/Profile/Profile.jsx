import styles from "./Profile.module.css";
import { useUserStore } from "../../store/useUserStore";
import User from "../../components/User/User";
import Level from "../../components/Level/Level";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { useCodeStore } from "../../store/useCodeStore";
import Fuse from "fuse.js";
import Search from "../../components/Search/Search";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard";
import { useNavigate } from "react-router";
import Exercise from "../../components/Exercise/Exercise";
import { logoutUser } from "../../api/userApi";
import Message from "../../components/Message/Message";

function Profile() {
  let navigate = useNavigate();

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);
  const getAllUser = useUserStore((state) => state.getAllUser);
  let AllUsers = useUserStore((state) => state.allUser);
  const getAllPTasks = useCodeStore((state) => state.getAllPTasks);
  const [message, setM] = useState("");

  const getUserFunct = async () => {
    const user = await getUser();
    console.log(user);
    try {
      if (!Object.hasOwn(user, "message")) {
        console.log(user)
        if (!Object.hasOwn(user, "result")) {
          getAllUserData(user.user);
        } else {
              navigate("/SIGNUP");
        }
      } else {
        if (user.message) {
          setM(user.message);
          setTimeout(() => {
            setM(null);
            navigate("/SIGNUP");
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
              navigate("/SIGNUP");

    }
  };

  useEffect(() => {
    getUserFunct();
    getAllPTasks();
    getAllUser();
  }, []);

  const lvl = useUserStore((state) => state.userLvl);
  const pr = useUserStore((state) => state.userLvlPr);
  const name = useUserStore((state) => state.userName);
  const allPTasks = useCodeStore((state) => state.allPTasks);
  const [sort, setSort] = useState(0);
  const [input, setI] = useState(0);
  const lvlTable = useUserStore((state) => state.lvlTable);

  const funct = () => {
    if (sort == 0) {
      return allPTasks;
    } else if (sort == 2) {
      return allPTasks.sort((a, b) => a.exp - b.exp);
    } else if (sort == 1) {
      return allPTasks.sort(
        (a, b) =>
          lvlTable.findIndex((el) => el == b.difficulty) -
          lvlTable.findIndex((el) => el == a.difficulty),
      );
    } else if (sort == 3) {
      return allPTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort == 4) {
      return allPTasks.sort((a, b) => b.exp - a.exp);
    } else if (sort == 5) {
      return allPTasks.sort(
        (a, b) =>
          lvlTable.findIndex((el) => el == a.difficulty) -
          lvlTable.findIndex((el) => el == b.difficulty),
      );
    } else if (sort == 6) {
      return allPTasks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort == 7) {
      getAllPTasks();
      setSort(0);
      return allPTasks;
    } else if (sort == 8) {
      if (input) {
        const fuse = new Fuse(allPTasks, {
          keys: ["title"],
        });
        let r = fuse.search(input);
        let n = r.map((el) => el.item);
        console.log(n);
        return n;
      }
    }
    return allPTasks;
  };

  return (
    <>
      <Message m={message} color={"#6AC968"} top={message ? "60px" : "-50%"} />

      <div className={styles.cont}>
        <div className={styles.block1}>
          <div className={styles.profile}>
            <User name={name} />
            <Level level={lvl} pr={pr} />
          </div>
          <LeaderBoard obj={AllUsers} />
        </div>
        <div className={styles.block2}>
          <div className={styles.allTasks}>
            <Search
              sort3={() => {
                if (sort != 3) {
                  setSort(3);
                } else {
                  setSort(6);
                }
              }}
              sort4={() => {
                setSort(7);
              }}
              sort5={(e) => {
                setSort(8);
                setI(e);
              }}
            />
            {funct()
              ? funct()
                  .filter((el) => el.createby == name)
                  .map((el) => <Exercise task={el} type={2} />)
              : "loading..."}
          </div>
        </div>
        <div className={styles.publish}>
          <h1>хочешь выйти из аккаунта?</h1>
          <Button
            color={"#c97b68"}
            text={"sing out"}
            action={async () => {
              let user = await logoutUser();
              console.log(user);
              if (!Object.hasOwn(user, "message")) {
                if (Object.hasOwn(user.result, "message")) {
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
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
