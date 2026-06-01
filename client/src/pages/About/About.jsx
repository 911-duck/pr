import styles from "./About.module.css";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import { useUserStore } from "../../store/useUserStore";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message/Message";

function About() {

  const [message, setM] = useState(null)

  let navigate = useNavigate();

  let getUser = useUserStore((state) => state.getUser);
  let getAllUserData = useUserStore((state) => state.getAllUserData);

  const getUserFunct = async () => {
    const user = await getUser()
    console.log(user)
    if(user){
      getAllUserData(user.user);
      navigate("/GAME/");
    }else{
      setM("авторизуйтесь")
      setTimeout(()=>{setM(null)},4000)
    }
  }

  useEffect(()=>{
    getUserFunct()
  },[])

  return (
    <>
      <Message m={message} color={"#6AC968"} top={message != null?"60px":"-50%"}/>
      <div className={styles.container}>
        <section className={styles.sectionOne}>
          <span className={styles.header}>
            Готов
            <br />
            к кодингу?
          </span>
          <NavLink to="/SIGNUP" style={{textDecoration: "none"}}>
          <Button color={"#6AC968"} text={"START"} />
          </NavLink>
          <div className={styles.bgPicture}></div>
        </section>
        <section className={styles.sectionSec}>
          <span className={styles.header}>Станьте ещё лучше в программировании</span>
          <span className={styles.text}>
            Эта игра приносит вам больше, чем просто значки. <br /> Чем больше вы играете, тем больше улучшаются ваши навыки кодирования.
          </span>
          <div className={styles.list}>
            <Image
              url={"./../../public/img/js.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={100}
              hover={1}
            />
            <Image
              url={"./../../../../public/img/java.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={100}
              hover={1}
            />
            <Image
              url={"./../../../../public/img/python.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={80}
              hover={1}
            />
            <Image
              url={"./../../../../public/img/cpp.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={80}
              hover={1}
            />
            <Image
              url={"./../../../../public/img/c.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={70}
              hover={1}
            />
            <Image
              url={"./../../../../public/img/cs.png"}
              color={"#6a6a6a00"}
              heigth={93}
              size={80}
              hover={1}
            />
          </div>
        </section>
        <section className={styles.sectionThr}>
            <span className={styles.header}>
                зарабатывайте баллы за задания
            </span>
            <Image 
                url={"./../../../../public/img/Frame 4.png"}
              color={""}
              heigth={186}
              width={722}
              size={100}
              hover={2}
            />
        </section>
      </div>
    </>
  );
}

export default About;
