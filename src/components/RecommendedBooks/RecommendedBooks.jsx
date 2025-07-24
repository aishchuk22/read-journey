import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/books/booksOperations";
import css from "./RecommendedBooks.module.css";
import {
  selectBooks,
  selectBooksLoading,
  selectBooksError,
  selectBooksPage,
  selectBooksTotalPages,
} from "../../redux/books/booksSelectors";
import Loader from "../Loader/Loader";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const page = useSelector(selectBooksPage);
  const totalPages = useSelector(selectBooksTotalPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecommendedBooks(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Recommended Books</h2>

      {isLoading && (
        <div className={css.loader}>
          <Loader
            width={40}
            height={40}
            color="#4F2EE8"
            secondaryColor="#DCDCDC"
          />
        </div>
      )}

      {error && <p className={css.error}>Error: {error}</p>}

      <ul className={css.bookList}>
        {books.map((book) => (
          <li key={book._id} className={css.bookCard}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className={css.bookImage}
            />
            <div className={css.bookInfo}>
              <h3 className={css.bookTitle}>{book.title}</h3>
              <p className={css.bookAuthor}>{book.author}</p>
              <p className={css.bookPages}>{book.totalPages} pages</p>
            </div>
            <button className={css.addButton}>Add to library</button>
          </li>
        ))}
      </ul>

      <div className={css.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={css.pageBtn}
        >
          Prev
        </button>
        <span className={css.pageIndicator}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={css.pageBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecommendedBooks;
