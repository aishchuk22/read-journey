import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

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
          <li>
            <span className={styles.number}>1</span>
            <p>
              <b>Create a personal library</b>: add the books you intend to read
              to it.
            </p>
          </li>
          <li>
            <span className={styles.number}>2</span>
            <p>
              <b>Create your first workout</b>: define a goal, choose a period,
              start training.
            </p>
          </li>
        </ul>
        <Link to="/library" className={styles.link}>
          My library
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
