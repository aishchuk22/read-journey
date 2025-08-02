import { useEffect, useState } from "react";
import styles from "./CompletionModal.module.css";
import { IoClose } from "react-icons/io5";
import booksIcon from "../../assets/booksIcon.png";

const CompletionModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  return (
    <div
      className={`${styles.overlay} ${!isVisible ? styles.fadeOut : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
        >
          <IoClose size={24} />
        </button>
        <div className={styles.contentWrapper}>
          <img className={styles.image} src={booksIcon} alt="Books" />
          <h3 className={styles.title}>The book is read</h3>
          <p className={styles.text}>
            It was an <span className={styles.textSpan}>exciting journey,</span>{" "}
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
