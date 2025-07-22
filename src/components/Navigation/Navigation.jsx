import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = ({ onLinkClick }) => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/recommended"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        onClick={onLinkClick}
      >
        Home
      </NavLink>

      <NavLink
        to="/library"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        onClick={onLinkClick}
      >
        My library
      </NavLink>
    </nav>
  );
};

export default Navigation;
