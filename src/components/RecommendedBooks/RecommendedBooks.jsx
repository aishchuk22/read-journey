import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";

import {
  selectBooks,
  selectBooksLoading,
  selectBooksTotalPages,
  selectBooksFilters,
} from "../../redux/books/booksSelectors";

import { fetchRecommendedBooks } from "../../redux/books/booksOperations";
import BookCard from "../BookCard/BookCard";
import css from "./RecommendedBooks.module.css";

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
  const [screenSize, setScreenSize] = useState(() => {
    return window.innerWidth >= 768 ? "tablet" : "mobile";
  });

  useEffect(() => {
    const handleResize = () => {
      const newScreenSize = window.innerWidth >= 768 ? "tablet" : "mobile";
      setScreenSize(newScreenSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLimit = useCallback(() => {
    return screenSize === "mobile" ? 2 : 8;
  }, [screenSize]);

  useEffect(() => {
    const limit = getLimit();
    dispatch(
      fetchRecommendedBooks({
        page: currentPage,
        title: filters?.title || "",
        author: filters?.author || "",
        limit: limit,
      })
    );
  }, [dispatch, currentPage, filters, getLimit]);

  useEffect(() => {
    setCurrentPage(1);
    const limit = getLimit();
    dispatch(
      fetchRecommendedBooks({
        page: 1,
        title: filters?.title || "",
        author: filters?.author || "",
        limit: limit,
      })
    );
  }, [screenSize, dispatch, filters, getLimit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isAnimating) {
      setIsAnimating(true);
      const limit = getLimit();

      const newBooksResponse = await dispatch(
        fetchRecommendedBooks({
          page: newPage,
          title: filters?.title || "",
          author: filters?.author || "",
          limit: limit,
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
