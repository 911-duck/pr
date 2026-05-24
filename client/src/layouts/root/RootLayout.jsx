import styles from "./RootLayout.module.css";
import { Outlet, NavLink } from "react-router";
import Icon from "../../components/Icon/Icon";
import Message from "../../components/Message/Message";

function RootLayout() {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Icon width={100} heigth={43} />
        <div className={styles.links}>
          <NavLink className={styles.link} to="/">
            Главная
          </NavLink>
          <NavLink className={styles.link} to="/SINGIN">
            Войти
          </NavLink>
          <NavLink className={styles.link} to="/SIGNUP">
            Регистрация
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <section className={styles.back}>
        <Icon width={170} heigth={60} />
        <span className={styles.text}>Это игра, которая развивает программирование. Форма игры очень увлекательная и необычная, что поможет легче ориентироваться в программировании. Игра также развивает навыки мышления, быстро придумывая идеи и реализуя их.</span>
        <div className={styles.linksColumn}>
          <NavLink className={styles.link} to="/">
            Главная
          </NavLink>
          <NavLink className={styles.link} to="/SINGIN">
            Войти
          </NavLink>
          <NavLink className={styles.link} to="/SIGNUP">
            Регистрация
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default RootLayout;
