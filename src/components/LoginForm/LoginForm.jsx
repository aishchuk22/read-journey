import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdError, MdCheckCircle } from "react-icons/md";
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
  const [touchedFields, setTouchedFields] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Login successful!");
      navigate("/recommended");
    } catch (err) {
      const msg = err || "Login failed";
      toast.error(msg);
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const getInputState = (fieldName, value, error) => {
    if (!touchedFields[fieldName] && !value) return "default";
    if (error) return "error";
    if (value && !error) return "success";
    return "default";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordIcon = () => {
    const passwordState = getInputState(
      "password",
      watchedPassword,
      errors.password
    );

    if (passwordState === "error") {
      return <MdError className={styles.iconError} />;
    }
    if (passwordState === "success") {
      return <MdCheckCircle className={styles.iconSuccess} />;
    }
    return showPassword ? (
      <AiOutlineEyeInvisible className={styles.iconDefault} />
    ) : (
      <AiOutlineEye className={styles.iconDefault} />
    );
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

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`${styles.inputWrapper} ${
                styles[getInputState("email", watchedEmail, errors.email)]
              }`}
            >
              <span className={styles.inputLabel}>Mail:</span>
              <input
                className={styles.input}
                type="email"
                placeholder="Your@email.com"
                {...register("email")}
                onBlur={() => handleFieldBlur("email")}
              />
              {getInputState("email", watchedEmail, errors.email) ===
                "error" && <MdError className={styles.iconError} />}
              {getInputState("email", watchedEmail, errors.email) ===
                "success" && <MdCheckCircle className={styles.iconSuccess} />}
            </div>
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}

            <div
              className={`${styles.inputWrapper} ${
                styles[
                  getInputState("password", watchedPassword, errors.password)
                ]
              }`}
            >
              <span className={styles.inputLabel}>Password:</span>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Yourpasswordhere"
                {...register("password")}
                onBlur={() => handleFieldBlur("password")}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                {renderPasswordIcon()}
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
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
