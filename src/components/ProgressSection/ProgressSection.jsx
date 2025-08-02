import styles from "./ProgressSection.module.css";
import starIcon from "../../assets/starIcon.png";

const ProgressSection = () => {
  return (
    <div className={styles.progressSection}>
      <h3 className={styles.sectionTitle}>Progress</h3>
      <p className={styles.progressDescription}>
        Here you will see when and how much you read to record, click on the red
        button below.
      </p>
      <div className={styles.progressIcon}>
        <div className={styles.starIcon}>
          <img className={styles.image} src={starIcon} alt="Star Icon" />
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
