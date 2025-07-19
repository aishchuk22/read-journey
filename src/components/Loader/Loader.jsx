import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <ClipLoader color="#4fa94d" size={60} />
    </div>
  );
};

export default Loader;
