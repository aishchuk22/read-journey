import { X } from "lucide-react";
import styles from "./MobileMenu.module.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";

const MobileMenu = ({ onClose, isClosing }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isClosing ? styles.fadeOut : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.menu} ${isClosing ? styles.slideOut : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <Navigation onLinkClick={onClose} />

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default MobileMenu;
