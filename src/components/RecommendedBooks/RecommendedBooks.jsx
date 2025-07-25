import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/books/booksOperations";
import css from "./RecommendedBooks.module.css";
import {
  selectBooks,
  selectBooksLoading,
  selectBooksError,
  selectBooksTotalPages,
} from "../../redux/books/booksSelectors";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
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
      <div className={css.title}>
        <h2 className={css.titleText}>Recommended</h2>
        <div className={css.arrowNavigation}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={css.arrowBtn}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={css.arrowBtn}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {!isLoading && books.length === 0 && (
        <p className={css.empty}>No recommended books found.</p>
      )}

      {isLoading && (
        <div className={css.loader}>
          <Loader width={40} height={40} color="red" secondaryColor="#DCDCDC" />
        </div>
      )}

      {error && <p className={css.error}>Error: {error}</p>}

      <ul className={css.bookList}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default RecommendedBooks;
