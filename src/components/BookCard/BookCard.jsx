import { useState } from "react";
import styles from "./BookCard.module.css";
import BookModal from "../BookModal/BookModal";

const BookCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { title, author, imageUrl } = book;

  return (
    <>
      <li className={styles.card} onClick={handleOpenModal}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
        </div>
      </li>

      {isModalOpen && <BookModal book={book} onClose={handleCloseModal} />}
    </>
  );
};

export default BookCard;
