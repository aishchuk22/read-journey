import styles from "./MobileMenu.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

const MobileMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isClosing ? styles.fadeOut : ""}`}
        onClick={handleClose}
      ></div>

      <div className={`${styles.menu} ${isClosing ? styles.slideOut : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <nav className={styles.nav}>
          <NavLink
            to="/recommended"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            onClick={handleClose}
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            onClick={handleClose}
          >
            My library
          </NavLink>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default MobileMenu;
