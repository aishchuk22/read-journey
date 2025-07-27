import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { setFilters } from "../../redux/books/booksSlice";
import { selectBooksFilters } from "../../redux/books/booksSelectors";
import styles from "./RecommendedDashboard.module.css";

const RecommendedDashboard = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectBooksFilters);

  const [formData, setFormData] = useState({
    title: filters.title || "",
    author: filters.author || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters(formData));
  };

  return (
    <div className={styles.sidebar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.label}>Filters:</p>

        <div className={styles.group}>
          <div className={styles.inputWrapper}>
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

          <div className={styles.inputWrapper}>
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
        </div>

        <button type="submit" className={styles.button}>
          To apply
        </button>
      </form>

      <div className={styles.box}>
        <p className={styles.heading}>Start your workout</p>
        <ul className={styles.steps}>
          <li className={styles.eachStep}>
            <span className={styles.number}>1</span>
            <p className={styles.eachStepText}>
              <span className={styles.eachStepTextSpan}>
                Create a personal library
              </span>
              : add the books you intend to read to it.
            </p>
          </li>
          <li className={styles.eachStep}>
            <span className={styles.number}>2</span>
            <p className={styles.eachStepText}>
              <span className={styles.eachStepTextSpan}>
                Create your first workout
              </span>
              : define a goal, choose a period, start training.
            </p>
          </li>
        </ul>
        <Link to="/library" className={styles.link}>
          <span className={styles.linkText}>My library</span>
          <FiArrowRight className={styles.arrow} />
        </Link>
      </div>
    </div>
  );
};

export default RecommendedDashboard;
