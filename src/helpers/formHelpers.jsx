import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";

export const getInputWrapperClass = (
  fieldName,
  styles,
  { isSubmitted, errors, passwordValue, isPasswordValid }
) => {
  if (fieldName === "password") {
    if (passwordValue && isPasswordValid) {
      return `${styles.inputWrapper} ${styles.success}`;
    }
    if (passwordValue && !isPasswordValid) {
      return `${styles.inputWrapper} ${styles.error}`;
    }
    return styles.inputWrapper;
  }

  if (isSubmitted && errors[fieldName]) {
    return `${styles.inputWrapper} ${styles.error}`;
  }
  return styles.inputWrapper;
};

export const getPasswordIcon = (
  passwordValue,
  isPasswordValid,
  showPassword,
  styles
) => {
  if (passwordValue && isPasswordValid) {
    return <FaRegCircleCheck className={styles.iconSuccess} />;
  }
  if (passwordValue && !isPasswordValid) {
    return <MdError className={styles.iconError} />;
  }
  return showPassword ? (
    <AiOutlineEyeInvisible className={styles.iconDefault} />
  ) : (
    <AiOutlineEye className={styles.iconDefault} />
  );
};
