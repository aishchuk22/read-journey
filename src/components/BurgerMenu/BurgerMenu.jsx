import styles from "./BurgerMenu.module.css";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const BurgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={styles.burgerBtn}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
    </button>
  );
};

export default BurgerMenu;
