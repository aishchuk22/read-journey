import styles from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import RecommendedDashboard from "../RecommendedDashboard/RecommendedDashboard";

const Dashboard = ({ children }) => {
  const location = useLocation();
  const isRecommendedPage = location.pathname === "/recommended";

  return (
    <section className={styles.dashboard}>
      <div className={styles.condRenderRecommendBox}>
        {isRecommendedPage && <RecommendedDashboard />}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Dashboard;
