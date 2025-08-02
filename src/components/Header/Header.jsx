import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navigation from "../Navigation/Navigation";

import logo from "../../assets/react.svg";
import styles from "./Header.module.css";

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
          <HiOutlineMenuAlt3 size={28} color="white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
