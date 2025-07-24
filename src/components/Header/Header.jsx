import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/react.svg";
import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

const Header = ({ toggleMenu }) => {
  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        onClick={() => navigate("/recommended")}
      />

      <nav className={styles.navWrapper}>
        <Navigation />
      </nav>

      <div className={styles.right}>
        <div className={styles.avatar}>{firstLetter}</div>

        <button
          onClick={toggleMenu}
          className={styles.burgerBtn}
          aria-label="Toggle menu"
        >
          <Menu size={28} color="white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
