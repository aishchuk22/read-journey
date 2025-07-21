import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import logo from "../../assets/react.svg";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className={styles.right}>
        <div className={styles.avatar}>{firstLetter}</div>

        {!isMenuOpen && (
          <button
            onClick={toggleMenu}
            className={styles.burgerBtn}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        )}
      </div>

      {isMenuOpen && <MobileMenu onClose={toggleMenu} />}
    </header>
  );
};

export default Header;
