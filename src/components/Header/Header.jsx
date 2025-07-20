import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import { Menu, X } from "lucide-react";
import logo from "../../assets/react.svg";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user?.name || "");
  const firstLetter = name.charAt(0).toUpperCase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className={styles.right}>
        <div className={styles.avatar}>{firstLetter}</div>

        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>

        <button
          onClick={toggleMenu}
          className={styles.burgerBtn}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* компонент MobileMenu */}
      {/* {isMenuOpen && <MobileMenu onClose={toggleMenu} />} */}
    </header>
  );
};

export default Header;
