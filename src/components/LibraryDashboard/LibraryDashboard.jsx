import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  fetchRecommendedBooks,
  validateAndAddBook,
} from "../../redux/books/booksOperations";
import {
  selectBooks,
  selectBooksLoading,
} from "../../redux/books/booksSelectors";
import { addBookSchema } from "../../validation/libraryDashboardFormSchema";
import SmallBookCard from "../SmallBookCard/SmallBookCard";
import styles from "./LibraryDashboard.module.css";

const LibraryDashboard = () => {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    totalPages: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({ page: 1, title: "", author: "", limit: 3 })
    );
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      title: formData.title,
      author: formData.author,
      totalPages: formData.totalPages ? Number(formData.totalPages) : "",
    };

    try {
      await addBookSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      await dispatch(validateAndAddBook(dataToValidate)).unwrap();

      toast.success("Book successfully added to your library!");

      setFormData({
        title: "",
        author: "",
        totalPages: "",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const errorMessage =
          error === "Book not found in our database. Please try again."
            ? "Book not found in our database. Please try again."
            : error || "Failed to add book. Please try again.";

        toast.error(errorMessage);
      }
    }
  };

  const displayBooks = recommendedBooks;

  return (
    <div className={styles.sidebar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <p className={styles.filterText}>Filters</p>
          <div className={styles.inputContainer}>
            <div
              className={`${styles.inputWrapper} ${
                errors.title ? styles.inputWrapperError : ""
              }`}
            >
              <span className={styles.inputLabel}>Book title:</span>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter text"
              />
            </div>
            {errors.title && (
              <span className={styles.errorText}>{errors.title}</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div
              className={`${styles.inputWrapper} ${
                errors.author ? styles.inputWrapperError : ""
              }`}
            >
              <span className={styles.inputLabel}>The author:</span>
              <input
                className={styles.input}
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter text"
              />
            </div>
            {errors.author && (
              <span className={styles.errorText}>{errors.author}</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div
              className={`${styles.inputWrapper} ${
                errors.totalPages ? styles.inputWrapperError : ""
              }`}
            >
              <span className={styles.inputLabel}>Number of pages:</span>
              <input
                className={styles.input}
                type="number"
                name="totalPages"
                value={formData.totalPages}
                onChange={handleInputChange}
                placeholder="0"
                min="1"
              />
            </div>
            {errors.totalPages && (
              <span className={styles.errorText}>{errors.totalPages}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add book"}
        </button>
      </form>

      <div className={styles.recommendedSection}>
        <h3 className={styles.recommendedTitle}>Recommended books</h3>

        {!isLoading && displayBooks.length > 0 && (
          <ul className={styles.booksList}>
            {displayBooks.map((book) => (
              <SmallBookCard key={book._id} book={book} />
            ))}
          </ul>
        )}

        {isLoading && <p className={styles.loading}>Loading...</p>}

        <div className={styles.homeLinkWrapper}>
          <Link to="/recommended" className={styles.homeLink}>
            <span className={styles.homeLinkText}>Home</span>
          </Link>
          <Link to="/recommended" className={styles.arrowLink}>
            <FiArrowRight className={styles.arrow} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
