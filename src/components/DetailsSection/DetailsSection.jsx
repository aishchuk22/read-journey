import { useEffect, useState } from "react";

import { HiOutlineChartPie } from "react-icons/hi2";
import { PieChart, Pie, Cell } from "recharts";
import { LuHourglass } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";

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

  const [chartSize, setChartSize] = useState({
    width: 120,
    height: 120,
    radius: 55,
  });

  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth >= 1280) {
        setChartSize({ width: 189, height: 189, radius: 85 });
      } else if (window.innerWidth >= 768) {
        setChartSize({ width: 138, height: 138, radius: 65 });
      } else {
        setChartSize({ width: 120, height: 120, radius: 55 });
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);

    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

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
            <LuHourglass />
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeView === "statistics" ? styles.active : ""
            }`}
            onClick={() => setActiveView("statistics")}
          >
            <HiOutlineChartPie />
          </button>
        </div>
      </div>

      {activeView === "diary" && (
        <div className={styles.diaryContent}>
          {currentBook?.progress && currentBook.progress.length > 0 ? (
            <div className={styles.diaryTimeline}>
              {currentBook.progress
                .filter((progress) => progress.finishPage)
                .reverse()
                .map((progress, index) => {
                  const percentageToCurrentPage = Number(
                    (
                      ((progress.finishPage - progress.startPage) /
                        currentBook.totalPages) *
                      100
                    ).toFixed(1)
                  );

                  const startTime = new Date(progress.startReading);
                  const finishTime = new Date(progress.finishReading);
                  const readingTimeMinutes = Math.round(
                    (finishTime - startTime) / (1000 * 60)
                  );

                  const pagesPerHour = progress.speed || 0;

                  return (
                    <div
                      key={progress._id || index}
                      className={styles.diaryEntry}
                    >
                      <div className={styles.diaryHeader}>
                        <div className={styles.leftSection}>
                          <div className={styles.diaryDate}>
                            {new Date(progress.startReading).toLocaleDateString(
                              "uk-UA"
                            )}
                          </div>
                          <div className={styles.diaryStats}>
                            <div className={styles.percentage}>
                              {percentageToCurrentPage}%
                            </div>
                            <div className={styles.readingTime}>
                              {readingTimeMinutes} minutes
                            </div>
                          </div>
                        </div>

                        <div className={styles.rightSection}>
                          <div className={styles.totalPages}>
                            {progress.finishPage - progress.startPage} pages
                          </div>
                          <div className={styles.progressWithDelete}>
                            <div className={styles.progressContainer}>
                              <svg
                                className={styles.greenBox}
                                viewBox="0 0 44 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M43 2L0 7.96493V19H43V2Z"
                                  fill="#30B94D"
                                  fillOpacity="0.2"
                                />
                                <rect
                                  width="43.5143"
                                  height="2.17572"
                                  rx="1"
                                  transform="matrix(-0.987181 0.159606 0.159606 0.987181 42.9561 0)"
                                  fill="#30B94D"
                                />
                              </svg>
                              <div className={styles.readingRate}>
                                {pagesPerHour} pages per hour
                              </div>
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
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p>No reading records yet</p>
          )}
        </div>
      )}

      {activeView === "statistics" && (
        <div className={styles.statisticsContainer}>
          <p className={styles.statisticsDesktopText}>
            Each page, each chapter is a new round of knowledge, a new step
            towards understanding. By rewriting statistics, we create our own
            reading history.
          </p>
          <div className={styles.statisticsContent}>
            <div className={styles.progressCircle}>
              <PieChart width={chartSize.width} height={chartSize.height}>
                <Pie
                  data={chartData}
                  cx={chartSize.width / 2}
                  cy={chartSize.height / 2}
                  innerRadius={chartSize.radius - 10}
                  outerRadius={chartSize.radius}
                  startAngle={450}
                  endAngle={90}
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
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
