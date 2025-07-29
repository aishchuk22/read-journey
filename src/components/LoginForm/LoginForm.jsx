import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import loginSchema from "../../validation/loginSchema";

import { login } from "../../redux/auth/authOperations";
import styles from "./LoginForm.module.css";
import logo from "../../assets/react.svg";
import iPhone from "../../assets/iPhone.png";
import iPhone2x from "../../assets/iPhone@2x.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/recommended");
    } catch (err) {
      const msg = err || "Login failed";
      toast.error(msg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputWrapperClass = (fieldName) => {
    // Показуємо помилки тільки після спроби відправки форми
    if (isSubmitted && errors[fieldName]) {
      return `${styles.inputWrapper} ${styles.error}`;
    }
    return styles.inputWrapper;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginSection}>
        <div className={styles.loginCard}>
          <img src={logo} alt="Logo" className={styles.logo} />

          <h1 className={styles.title}>
            Expand your mind, reading{" "}
            <span className={styles.titleAccent}>a book</span>
          </h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={getInputWrapperClass("email")}>
              <span className={styles.inputLabel}>Mail:</span>
              <input
                className={styles.input}
                type="email"
                placeholder="Your@email.com"
                {...register("email")}
              />
              {isSubmitted && errors.email && (
                <MdError className={styles.iconError} />
              )}
            </div>
            {isSubmitted && errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}

            <div className={getInputWrapperClass("password")}>
              <span className={styles.inputLabel}>Password:</span>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Yourpasswordhere"
                {...register("password")}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                {isSubmitted && errors.password ? (
                  <MdError className={styles.iconError} />
                ) : showPassword ? (
                  <AiOutlineEyeInvisible className={styles.iconDefault} />
                ) : (
                  <AiOutlineEye className={styles.iconDefault} />
                )}
              </button>
            </div>
            {isSubmitted && errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}

            <div className={styles.bottomRow}>
              <button className={styles.button} type="submit">
                Log in
              </button>

              <Link to="/register" className={styles.registerLink}>
                Don't have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.phoneSection}>
        <div className={styles.phoneCard}>
          <img
            src={iPhone}
            srcSet={`${iPhone} 1x, ${iPhone2x} 2x`}
            alt="Phone mockup"
            className={styles.phoneImage}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
