import styles from "./Home.module.css";
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

function Home() {
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

  const values = ["JavaScript"];

  const lvl = useUserStore((state) => state.userLvl);
  const lvlTable = useUserStore((state) => state.lvlTable);
  const pr = useUserStore((state) => state.userLvlPr);
  const name = useUserStore((state) => state.userName);
  const tasks = useCodeStore((state) => state.tasks);
  const allTasks = useCodeStore((state) => state.allTasks);
  const setCurrentTask = useCodeStore((state) => state.setCurrentTask);
  const [dailyTask, setDailyTask] = useState(null);
  const [sort, setSort] = useState(0);
  const [input, setI] = useState(0);

  const getTasks = useCodeStore((state) => state.getTasks);
  const getAllTasks = useCodeStore((state) => state.getAllTasks);

  const get = async () => {
    await getUserFunct();
    await getAllTasks();
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    getTasks(lvlTable[Number(lvl)]);
  }, [lvl]);

  const funct = () => {
    if (sort == 0) {
      return allTasks;
    } else if (sort == 2) {
      return allTasks.sort((a, b) => a.exp - b.exp);
    } else if (sort == 1) {
      return allTasks.sort(
        (a, b) =>
          lvlTable.findIndex((el) => el == b.difficulty) -
          lvlTable.findIndex((el) => el == a.difficulty),
      );
    } else if (sort == 3) {
      return allTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort == 4) {
      return allTasks.sort((a, b) => b.exp - a.exp);
    } else if (sort == 5) {
      return allTasks.sort(
        (a, b) =>
          lvlTable.findIndex((el) => el == a.difficulty) -
          lvlTable.findIndex((el) => el == b.difficulty),
      );
    } else if (sort == 6) {
      return allTasks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort == 7) {
      getAllTasks();
      setSort(0);
      return allTasks;
    } else if (sort == 8) {
      if (input) {
        const fuse = new Fuse(allTasks, {
          keys: ["title"],
        });
        let r= fuse.search(input)
        let n = r.map(el=>el.item)
        console.log(n)
        return n
      }
    }
    return allTasks;
  };

  useEffect(() => {
    if (tasks) setDailyTask(tasks[Number(Math.floor(Math.random() * 10))]);
    else setDailyTask(null);
  }, [tasks]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.game}>
          <span className={styles.header}>Практика</span>
          <span className={styles.text}>
            {dailyTask ? dailyTask.title : ""}
          </span>
          <Choice values={values} names={values} color={"#6AC968"} />
          <Image
            url={"./../../../public/img/Frame 5.png"}
            color={""}
            heigth={112}
            width={330}
            size={100}
            hover={2}
          />
          <div className={styles.centred}>
            <Button
              color={"#6AC968"}
              text={"START"}
              action={() => {
                if (tasks) {
                  setCurrentTask(dailyTask);
                  navigate("/GAME/PRACTICE");
                }
              }}
            />
          </div>
          <div className={styles.pos}>
            <Difficult level={"8kyu"} />
          </div>
        </div>
        <div className={styles.dop}>
          <div className={styles.profile}>
            <User name={name} />
            <Level level={lvl} pr={pr} />
          </div>
          <div className={styles.exercise}>
            {tasks
              ? tasks.map((el) => <Exercise task={el} type={0} />)
              : "loading..."}
          </div>
        </div>
        <div className={styles.allTasks}>
          <Search
            sort2={() => {
              if (sort != 2 || sort == 5) {
                setSort(2);
              } else {
                setSort(4);
              }
            }}
            sort1={() => {
              if (sort != 1) {
                setSort(1);
              } else {
                setSort(5);
              }
            }}
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
            ? funct().map((el) => {
            return (<Exercise task={el} type={1} />)
          })
            : "loading..."}
        </div>
      </div>
    </>
  );
}

export default Home;
