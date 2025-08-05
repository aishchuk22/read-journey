import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { addReadingSchema } from "../../validation/readingFormSchema";
import ProgressSection from "../ProgressSection/ProgressSection";
import DetailsSection from "../DetailsSection/DetailsSection";

import {
  startReading,
  stopReading,
  deleteReadingSessionThunk,
} from "../../redux/books/booksOperations";
import {
  selectCurrentBook,
  selectReadingLoading,
} from "../../redux/books/booksSelectors";
import CompletionModal from "../CompletionModal/CompletionModal";
import styles from "./ReadingDashboard.module.css";

const ReadingDashboard = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const currentBook = useSelector(selectCurrentBook);
  const isLoading = useSelector(selectReadingLoading);

  const [formData, setFormData] = useState({
    page: "",
  });
  const [errors, setErrors] = useState({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [activeView, setActiveView] = useState("diary");
  const [isReading, setIsReading] = useState(false);

  const determineReadingState = (book) => {
    if (!book || !book.progress || book.progress.length === 0) {
      return false;
    }

    const lastProgress = book.progress[book.progress.length - 1];

    return !lastProgress.finishPage;
  };

  useEffect(() => {
    if (currentBook) {
      const actualReadingState = determineReadingState(currentBook);
      setIsReading(actualReadingState);
    }
  }, [currentBook]);

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

    const pageNumber = formData.page ? Number(formData.page) : "";

    const dataToValidate = {
      page: pageNumber,
    };

    try {
      await addReadingSchema.validate(
        {
          ...dataToValidate,
          totalPages: currentBook.totalPages,
        },
        { abortEarly: false }
      );

      setErrors({});

      if (isReading) {
        await dispatch(
          stopReading({
            bookId,
            page: pageNumber,
          })
        ).unwrap();

        if (pageNumber >= currentBook.totalPages) {
          setShowCompletionModal(true);
        }
      } else {
        await dispatch(
          startReading({
            bookId,
            page: pageNumber,
          })
        ).unwrap();
      }

      setFormData({ page: "" });
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const errorMessage =
          error || "Failed to update reading progress. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  const handleDeleteReadingSession = async (progress, index) => {
    try {
      const readingSessionId = progress._id || progress.id || index;

      await dispatch(
        deleteReadingSessionThunk({
          bookId: currentBook._id,
          readingId: readingSessionId,
        })
      ).unwrap();

      toast.success("Reading session deleted successfully");
    } catch (error) {
      const errorMessage =
        error || "Failed to delete reading session. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (!currentBook) {
    return <div className={styles.loading}>Loading book details...</div>;
  }

  return (
    <div className={styles.sidebar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <p className={styles.filterText}>
            {isReading ? "Stop page:" : "Start page:"}
          </p>
          <div className={styles.inputContainer}>
            <div
              className={`${styles.inputWrapper} ${
                errors.page ? styles.inputWrapperError : ""
              }`}
            >
              <span className={styles.inputLabel}>Page number:</span>
              <input
                className={styles.input}
                type="number"
                name="page"
                value={formData.page}
                onChange={handleInputChange}
                placeholder="0"
                min="1"
                max={currentBook.totalPages}
              />
            </div>
            {errors.page && (
              <span className={styles.errorText}>{errors.page}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.button}>
          {isReading ? "To stop" : "To start"}
        </button>
      </form>

      {!(
        currentBook?.progress &&
        currentBook.progress.some((progress) => progress.finishPage)
      ) && <ProgressSection />}

      {currentBook?.progress &&
        currentBook.progress.some((progress) => progress.finishPage) && (
          <DetailsSection
            activeView={activeView}
            setActiveView={setActiveView}
            currentBook={currentBook}
            isLoading={isLoading}
            handleDeleteReadingSession={handleDeleteReadingSession}
          />
        )}

      {showCompletionModal && (
        <CompletionModal onClose={() => setShowCompletionModal(false)} />
      )}
    </div>
  );
};

export default ReadingDashboard;
