import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <ClipLoader color="#f9f9f9" size={60} />
    </div>
  );
};

export default Loader;
