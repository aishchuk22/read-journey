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
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./MyLibraryBooks.module.css";
import booksIcon from "../../assets/booksIcon.png";
import Loader from "../Loader/Loader";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const myBooks = useSelector(selectMyLibraryBooks);
  const isLoading = useSelector(selectLibraryLoading);

  const [filter, setFilter] = useState("All books");

  const filterOptions = [
    { value: "All books", label: "All books" },
    { value: "Unread", label: "Unread" },
    { value: "In progress", label: "In progress" },
    { value: "Done", label: "Done" },
  ];

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
        <CustomSelect
          value={filter}
          onChange={handleFilterChange}
          options={filterOptions}
        />
      </div>

      {isLoading && <Loader />}

      {!isLoading && myBooks.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <img
              className={styles.bookImg}
              src={booksIcon}
              alt="Empty library"
              width={50}
              height={50}
            />
          </div>
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
