import React, { useEffect, useState } from "react";
import styles from "./SuccessModal.module.css";
import { IoClose } from "react-icons/io5";
import thumbsUpIcon from "../../assets/thumbsUpIcon.png";

const SuccessModal = ({ onClose }) => {
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
          <img className={styles.image} src={thumbsUpIcon} alt="Thumbs up" />
          <h3 className={styles.title}>Good job</h3>
          <p className={styles.text}>
            Your book is now in{" "}
            <span className={styles.textSpan}>the library!</span> The joy knows
            no bounds and now you can start your training
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
