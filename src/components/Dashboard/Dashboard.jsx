import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi"; // або { IoArrowForward } from "react-icons/io5"

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <form className={styles.form}>
        <p className={styles.label}>Filters:</p>

        <div className={styles.group}>
          <label className={styles.floatingLabel}>
            <span className={styles.span}>Book title:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter text"
            />
          </label>

          <label className={styles.floatingLabel}>
            <span className={styles.span}>The author:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter text"
            />
          </label>
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
    </section>
  );
};

export default Dashboard;
