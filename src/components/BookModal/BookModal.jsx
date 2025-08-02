import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { validateAndAddBook } from "../../redux/books/booksOperations";

import styles from "./BookModal.module.css";
import toast from "react-hot-toast";

const modalRoot = document.body;

export default function BookModal({ book, onClose }) {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAddToLibrary = async () => {
    setIsAdding(true);

    const bookData = {
      title: book.title,
      author: book.author,
      totalPages: book.totalPages,
    };

    try {
      await dispatch(validateAndAddBook(bookData)).unwrap();
      toast.success("Book successfully added to your library!");
      onClose();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <img src={book.imageUrl} alt={book.title} className={styles.image} />
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.pages}>Pages: {book.totalPages}</p>

        <button
          className={styles.addButton}
          onClick={handleAddToLibrary}
          disabled={isAdding}
        >
          Add to library
        </button>
      </div>
    </div>,
    modalRoot
  );
}
