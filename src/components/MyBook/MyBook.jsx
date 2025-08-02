import { useSelector } from "react-redux";
import {
  selectCurrentBook,
  selectBooksLoading,
} from "../../redux/books/booksSelectors";
import Loader from "../Loader/Loader";
import styles from "./MyBook.module.css";

const MyBook = () => {
  const currentBook = useSelector(selectCurrentBook);
  const isLoading = useSelector(selectBooksLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentBook) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>Book not found</p>
      </div>
    );
  }

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "";

    const { hours = 0, minutes = 0 } = timeLeft;

    const parts = [];
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
    if (minutes > 0)
      parts.push(
        `${minutes} ${minutes === 1 ? "minute left" : "minutes left"}`
      );

    return parts.join(" and ");
  };

  const determineReadingState = (book) => {
    if (!book || !book.progress || book.progress.length === 0) {
      return false;
    }

    const lastProgress = book.progress[book.progress.length - 1];
    return !lastProgress.finishPage;
  };

  const isCurrentlyReading = determineReadingState(currentBook);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>My reading</h2>
        {!isCurrentlyReading && currentBook.timeLeftToRead && (
          <p className={styles.timeLeft}>
            {formatTimeLeft(currentBook.timeLeftToRead)}
          </p>
        )}
      </div>

      <div className={styles.bookSection}>
        <div className={styles.bookCard}>
          <div className={styles.bookImageWrapper}>
            <img
              src={currentBook.imageUrl}
              alt={currentBook.title}
              className={styles.bookImage}
            />
          </div>
          <div className={styles.bookInfo}>
            <h3 className={styles.bookTitle}>{currentBook.title}</h3>
            <p className={styles.bookAuthor}>{currentBook.author}</p>
          </div>
        </div>
        <div className={styles.statusIndicator}>
          {isCurrentlyReading ? (
            <svg
              className={styles.icon}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16"
                cy="16"
                r="15.2"
                fill="none"
                stroke="var(--color1, #f9f9f9)"
                strokeWidth="1.6"
              />

              <rect
                x="9.6"
                y="9.6"
                width="12.8"
                height="12.8"
                rx="2.4"
                ry="2.4"
                fill="var(--color2, #e90516)"
              />
            </svg>
          ) : (
            <svg className={styles.icon} viewBox="0 0 32 32">
              <path
                fill="#e90516"
                style={{ fill: "var(--color2, #e90516)" }}
                d="M28 16c0 6.627-5.373 12-12 12s-12-5.373-12-12c0-6.627 5.373-12 12-12s12 5.373 12 12z"
              />
              <path
                fill="none"
                stroke="#f9f9f9"
                style={{ stroke: "var(--color1, #f9f9f9)" }}
                strokeLinejoin="miter"
                strokeLinecap="butt"
                strokeMiterlimit="4"
                strokeWidth="1.6"
                d="M31.2 16c0 8.395-6.805 15.2-15.2 15.2s-15.2-6.805-15.2-15.2c0-8.395 6.805-15.2 15.2-15.2s15.2 6.805 15.2 15.2z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBook;
