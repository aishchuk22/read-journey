import { FiCalendar, FiBarChart2, FiTrash2 } from "react-icons/fi";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./DetailsSection.module.css";

const DetailsSection = ({
  activeView,
  setActiveView,
  currentBook,
  isLoading,
  handleDeleteReadingSession,
}) => {
  const calculateProgress = () => {
    if (!currentBook?.progress || currentBook.progress.length === 0) {
      return { percentage: 0, pagesRead: 0 };
    }

    const completedSessions = currentBook.progress.filter((p) => p.finishPage);

    if (completedSessions.length === 0) {
      return { percentage: 0, pagesRead: 0 };
    }

    const maxFinishPage = Math.max(
      ...completedSessions.map((p) => p.finishPage)
    );
    const percentage = Number(
      ((maxFinishPage / currentBook.totalPages) * 100).toFixed(2)
    );

    return { percentage, pagesRead: maxFinishPage };
  };

  const { percentage, pagesRead } = calculateProgress();

  const chartData = [
    { name: "read", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const COLORS = ["#30b94d", "#1f1f1f"];

  return (
    <div className={styles.detailsSection}>
      <div className={styles.detailsHeader}>
        <h3 className={styles.sectionTitle}>
          {activeView === "diary" ? "Diary" : "Statistics"}
        </h3>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${
              activeView === "diary" ? styles.active : ""
            }`}
            onClick={() => setActiveView("diary")}
          >
            <FiCalendar />
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeView === "statistics" ? styles.active : ""
            }`}
            onClick={() => setActiveView("statistics")}
          >
            <FiBarChart2 />
          </button>
        </div>
      </div>

      {activeView === "diary" && (
        <div className={styles.diaryContent}>
          {currentBook?.progress && currentBook.progress.length > 0 ? (
            currentBook.progress
              .filter((progress) => progress.finishPage)
              .map((progress, index) => (
                <div key={index} className={styles.diaryEntry}>
                  <div className={styles.diaryHeader}>
                    <div className={styles.diaryDate}>
                      {new Date(progress.startReading).toLocaleDateString(
                        "uk-UA"
                      )}
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() =>
                        handleDeleteReadingSession(progress, index)
                      }
                      title="Delete reading session"
                      disabled={isLoading}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className={styles.diaryStats}>
                    <span className={styles.percentage}>
                      {Math.round(
                        (progress.finishPage / currentBook.totalPages) * 100
                      )}
                      %
                    </span>
                    <span className={styles.pagesRead}>
                      {progress.finishPage - progress.startPage + 1} pages
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p>No reading records yet</p>
          )}
        </div>
      )}

      {activeView === "statistics" && (
        <div className={styles.statisticsContent}>
          <div className={styles.progressCircle}>
            <PieChart width={120} height={120}>
              <Pie
                data={chartData}
                cx={55}
                cy={55}
                innerRadius={45}
                outerRadius={55}
                startAngle={450}
                endAngle={90} //
                dataKey="value"
                stroke="none"
                labelLine={false}
                cornerRadius={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <span className={styles.progressPercent}>100%</span>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor}></div>
              <div className={styles.legendText}>
                <span className={styles.legendPercentage}>{percentage}%</span>
                <span className={styles.legendDescription}>
                  {pagesRead} pages read
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
