import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import logo from "../../assets/react.svg";

const Header = () => {
  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.right}>
        <div className={styles.avatar}>{firstLetter}</div>
        <Menu className={styles.burger} size={28} />
      </div>
    </header>
  );
};

export default Header;
