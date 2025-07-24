import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  return (
    <section className={styles.dashboardWrapper}>
      <div className={styles.filters}>
        <label>
          Book title
          <input type="text" name="title" placeholder="Enter text" />
        </label>
        <label>
          Author
          <input type="text" name="author" placeholder="Enter text" />
        </label>
        <button type="button">To apply</button>
      </div>

      <div className={styles.description}>
        <p>
          Here you will find books that we recommend for you based on the
          preferences you specified during registration. Go to{" "}
          <Link to="/library" className={styles.link}>
            My library
          </Link>{" "}
          to manage your book collection.
        </p>
      </div>

      <div className={styles.quote}>
        <p>“Books are a uniquely portable magic”</p>
        <span>— Stephen King</span>
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Dashboard;
