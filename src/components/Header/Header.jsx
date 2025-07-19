import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "lucide-react";
import logo from "../../assets/react.svg";
import { logout } from "../../redux/auth/authOperations";

const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.right}>
        <div className={styles.avatar}>{firstLetter}</div>
        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>
        <Menu className={styles.burger} size={28} />
      </div>
    </header>
  );
};

export default Header;
