import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./BookCard.module.css";
import BookModal from "../BookModal/BookModal";

const BookCard = ({ book, showRemoveButton = false, onRemove, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!showRemoveButton) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const { title, author, imageUrl } = book;

  return (
    <>
      <li className={styles.card} onClick={handleClick}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoText}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.author}>{author}</p>
          </div>

          {showRemoveButton && (
            <button
              className={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
            >
              <FaRegTrashAlt className={styles.icon} />
            </button>
          )}
        </div>
      </li>

      {isModalOpen && <BookModal book={book} onClose={handleCloseModal} />}
    </>
  );
};

export default BookCard;
