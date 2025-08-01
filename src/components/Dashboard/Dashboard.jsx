import styles from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import RecommendedDashboard from "../RecommendedDashboard/RecommendedDashboard";
import LibraryDashboard from "../LibraryDashboard/LibraryDashboard";
import ReadingDashboard from "../ReadingDashboard/ReadingDashboard";

const Dashboard = ({ children }) => {
  const location = useLocation();
  const isRecommendedPage = location.pathname === "/recommended";
  const isLibraryPage = location.pathname === "/library";
  const isReadingPage = location.pathname.startsWith("/reading");

  return (
    <section className={styles.dashboard}>
      <div className={styles.condRenderRecommendBox}>
        {isRecommendedPage && <RecommendedDashboard />}
        {isLibraryPage && <LibraryDashboard />}
        {isReadingPage && <ReadingDashboard />}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Dashboard;
