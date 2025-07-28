import styles from "./SmallBookCard.module.css";

const SmallBookCard = ({ book }) => {
  return (
    <li className={styles.bookCard}>
      <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
      <h4 className={styles.bookTitle}>{book.title}</h4>
      <p className={styles.bookAuthor}>{book.author}</p>
    </li>
  );
};

export default SmallBookCard;
