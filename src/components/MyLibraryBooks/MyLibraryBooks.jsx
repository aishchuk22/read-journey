import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersBooks,
  removeBookFromLibrary,
} from "../../redux/books/booksOperations";
import {
  selectMyLibraryBooks,
  selectLibraryLoading,
} from "../../redux/books/booksSelectors";
import BookCard from "../BookCard/BookCard";
import styles from "./MyLibraryBooks.module.css";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const myBooks = useSelector(selectMyLibraryBooks);
  const isLoading = useSelector(selectLibraryLoading);

  const [filter, setFilter] = useState("All books");

  useEffect(() => {
    dispatch(fetchUsersBooks());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBooks = myBooks.filter((book) => {
    if (filter === "All books") return true;
    if (filter === "Unread") return book.status === "unread";
    if (filter === "In progress") return book.status === "in-progress";
    if (filter === "Done") return book.status === "done";
    return true;
  });

  const handleRemoveBook = (bookId) => {
    dispatch(removeBookFromLibrary(bookId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My library</h2>
        <select
          className={styles.select}
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All books">All books</option>
          <option value="Unread">Unread</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {!isLoading && myBooks.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <p className={styles.emptyText}>
            To start training, add{" "}
            <span className={styles.highlight}>some of your books</span> or from
            the recommended ones
          </p>
        </div>
      )}

      {!isLoading && filteredBooks.length === 0 && myBooks.length > 0 && (
        <p className={styles.noResults}>
          No books found for the selected filter.
        </p>
      )}

      {!isLoading && filteredBooks.length > 0 && (
        <ul className={styles.booksList}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              showRemoveButton={true}
              onRemove={() => handleRemoveBook(book._id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyLibraryBooks;
