import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/books/booksOperations";
import css from "./RecommendedBooks.module.css";
import {
  selectBooks,
  selectBooksLoading,
  selectBooksTotalPages,
  selectBooksFilters,
} from "../../redux/books/booksSelectors";
import BookCard from "../BookCard/BookCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);
  const totalPages = useSelector(selectBooksTotalPages);
  const filters = useSelector(selectBooksFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [nextBooks, setNextBooks] = useState([]);
  const [showNextBooks, setShowNextBooks] = useState(false);

  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({
        page: currentPage,
        title: filters?.title || "",
        author: filters?.author || "",
      })
    );
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isAnimating) {
      setIsAnimating(true);

      const newBooksResponse = await dispatch(
        fetchRecommendedBooks({
          page: newPage,
          title: filters?.title || "",
          author: filters?.author || "",
        })
      );
      setNextBooks(newBooksResponse.payload.results || []);

      if (newPage > currentPage) {
        setSlideDirection("slide-left");
      } else {
        setSlideDirection("slide-right");
      }

      setTimeout(() => {
        setShowNextBooks(true);
        setCurrentPage(newPage);

        setTimeout(() => {
          setIsAnimating(false);
          setSlideDirection("");
          setShowNextBooks(false);
          setNextBooks([]);
        }, 400);
      }, 50);
    }
  };

  const hasActiveFilters = filters?.title || filters?.author;
  const hasBooks = books.length > 0;

  return (
    <div className={css.wrapper}>
      <div className={css.title}>
        <h2 className={css.titleText}>Recommended</h2>
        <div className={css.arrowNavigation}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating || !hasBooks}
            className={css.arrowBtn}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating || !hasBooks}
            className={css.arrowBtn}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {!isLoading && books.length === 0 && hasActiveFilters && (
        <p className={css.empty}>
          Unfortunately, no books were found for your request. Please try again
          with different search parameters.
        </p>
      )}

      {!isLoading && books.length === 0 && !hasActiveFilters && (
        <p className={css.empty}>No recommended books found.</p>
      )}

      <div className={css.sliderContainer}>
        <ul
          className={`${css.bookList} ${
            slideDirection ? css[slideDirection] : ""
          }`}
        >
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </ul>

        {showNextBooks && (
          <ul
            className={`${css.bookList} ${css.nextBookList} ${
              slideDirection === "slide-left"
                ? css.slideInFromRight
                : css.slideInFromLeft
            }`}
          >
            {nextBooks.map((book) => (
              <BookCard key={`next-${book._id}`} book={book} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecommendedBooks;
