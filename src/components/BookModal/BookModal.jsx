import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./BookModal.module.css";

const modalRoot = document.body;

export default function BookModal({ book, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <img src={book.imageUrl} alt={book.title} className={styles.image} />
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.author}>by {book.author}</p>
        <p className={styles.pages}>Pages: {book.totalPages}</p>

        <button className={styles.addButton}>Add to library</button>
      </div>
    </div>,
    modalRoot
  );
}
