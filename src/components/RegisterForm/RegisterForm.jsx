import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { MdError } from "react-icons/md";

import registerSchema from "../../validation/registerSchema";
import { register } from "../../redux/auth/authOperations";
import {
  getInputWrapperClass,
  getPasswordIcon,
} from "../../helpers/formHelpers";
import styles from "./RegisterForm.module.css";
import logo from "../../assets/react.svg";
import iPhone from "../../assets/iPhone.png";
import iPhone2x from "../../assets/iPhone@2x.png";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (passwordValue) {
      try {
        registerSchema.validateSyncAt("password", { password: passwordValue });
        setPasswordError("");
        setIsPasswordValid(true);
      } catch (error) {
        setPasswordError(error.message);
        setIsPasswordValid(false);
      }
    } else {
      setPasswordError("");
      setIsPasswordValid(false);
    }
  }, [passwordValue]);

  const onSubmit = async (data) => {
    try {
      await dispatch(register(data)).unwrap();
      toast.success("Registration successful!");
      navigate("/recommended");
    } catch (err) {
      const msg = err || "Registration failed";
      toast.error(msg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerSection}>
        <div className={styles.registerCard}>
          <div className={styles.headerLogoBox}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <p className={styles.headerLogoText}>read journey</p>
          </div>

          <h1 className={styles.title}>
            Expand your mind, reading{" "}
            <span className={styles.titleAccent}>a book</span>
          </h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div
              className={getInputWrapperClass("name", styles, {
                isSubmitted,
                errors,
                passwordValue,
                isPasswordValid,
              })}
            >
              <span className={styles.inputLabel}>Name:</span>
              <input
                className={styles.input}
                type="text"
                placeholder="Ilona Ratushniak"
                {...formRegister("name")}
              />
              {isSubmitted && errors.name && (
                <MdError className={styles.iconError} />
              )}
            </div>
            {isSubmitted && errors.name && (
              <p className={styles.errorText}>{errors.name.message}</p>
            )}

            <div
              className={getInputWrapperClass("email", styles, {
                isSubmitted,
                errors,
                passwordValue,
                isPasswordValid,
              })}
            >
              <span className={styles.inputLabel}>Mail:</span>
              <input
                className={styles.input}
                type="email"
                placeholder="Your@email.com"
                {...formRegister("email")}
              />
              {isSubmitted && errors.email && (
                <MdError className={styles.iconError} />
              )}
            </div>
            {isSubmitted && errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}

            <div
              className={getInputWrapperClass("password", styles, {
                isSubmitted,
                errors,
                passwordValue,
                isPasswordValid,
              })}
            >
              <span className={styles.inputLabel}>Password:</span>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Yourpasswordhere"
                {...formRegister("password", {
                  onChange: handlePasswordChange,
                })}
                value={passwordValue}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                {getPasswordIcon(
                  passwordValue,
                  isPasswordValid,
                  showPassword,
                  styles
                )}
              </button>
            </div>

            {passwordValue && !isPasswordValid && passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            {passwordValue && isPasswordValid && (
              <p className={styles.successText}>Password is secure</p>
            )}

            <div className={styles.bottomRow}>
              <button className={styles.button} type="submit">
                Registration
              </button>

              <Link to="/login" className={styles.loginLink}>
                Already have an account?
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

export default RegisterForm;
