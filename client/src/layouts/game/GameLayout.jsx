import styles from "./GameLayout.module.css";
import { Outlet, NavLink } from "react-router";
import Icon from "../../components/Icon/Icon";
import User from "../../components/User/User";
import { useUserStore } from "../../store/useUserStore";

function GameLayout() {
    let name = useUserStore(state=>state.userName)
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <NavLink to="/GAME/PROFILE" style={{textDecoration: "none"}}>
        <User name={name}/>
        </NavLink>
        <div className={styles.links}>
          <NavLink className={styles.link} to="/GAME">
            Главная
          </NavLink>
          <NavLink className={styles.link} to="/GAME/SANDBOX">
            Песочница
          </NavLink>
          <NavLink className={styles.link} to="/GAME/PUBLIC">
            Публичные
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <section className={styles.back}>
        <Icon width={170} heigth={60} />
        <span className={styles.text}>Это игра, которая развивает программирование. Форма игры очень увлекательная и необычная, что поможет легче ориентироваться в программировании. Игра также развивает навыки мышления, быстро придумывая идеи и реализуя их.</span>
        <div className={styles.linksColumn}>
          <NavLink className={styles.link} to="/GAME">
            Главная
          </NavLink>
          <NavLink className={styles.link} to="/GAME/SANDBOX">
            Песочница
          </NavLink>
          <NavLink className={styles.link} to="/GAME/PUBLIC">
            Публичное
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default GameLayout;