import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/auth/authOperations";
import Navigation from "../Navigation/Navigation";

import logo from "../../assets/react.svg";
import styles from "./Header.module.css";

const Header = ({ toggleMenu }) => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.logoWrapper}
        onClick={() => navigate("/recommended")}
      >
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.logoText}>read journey</p>
      </div>

      <nav className={styles.navWrapper}>
        <Navigation />
      </nav>

      <div className={styles.right}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>{firstLetter}</div>
          <p className={styles.fullName}>{name}</p>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>

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
