import styles from "./PublicHome.module.css";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import Choice from "../../components/choice/choice";
import Difficult from "../../components/Difficult/Difficult";
import User from "../../components/User/User";
import Level from "../../components/Level/Level";
import Exercise from "../../components/Exercise/Exercise";
import { useUserStore } from "../../store/useUserStore";
import { useCodeStore } from "../../store/useCodeStore";
import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import { useNavigate } from "react-router";
import Fuse from "fuse.js";

function PublicHome() {
  let navigate = useNavigate();

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);

  const getUserFunct = async () => {
    const user = await getUser();
    console.log(user);
    if (user) {
      getAllUserData(user.user);
    } else {
      navigate("/SIGNUP");
    }
  };

  useEffect(() => {
    getUserFunct();
  }, []);

  const lvlTable = useUserStore((state) => state.lvlTable);
  const allPTasks = useCodeStore((state) => state.allPTasks);
  const [sort, setSort] = useState(0);
  const [input, setI] = useState(0);

  const getAllPTasks = useCodeStore((state) => state.getAllPTasks);

  const get = async () => {
    await getAllPTasks();
  };

  useEffect(() => {
    get();
  }, []);

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
      <div className={styles.container}>
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
            ? funct().map((el) => <Exercise task={el} type={2} />)
            : "loading..."}
        </div>
        <div className={styles.publish}>
          <h1>хочешь создать задание?</h1>
          <Button
            color={"#6AC968"}
            text={"СОЗДАЙ ЕЁ"}
            action={() => {
              navigate("/GAME/CREATE");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PublicHome;
