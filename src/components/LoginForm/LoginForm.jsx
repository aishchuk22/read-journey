import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import loginSchema from "../../validation/loginSchema";

import { login } from "../../redux/auth/authOperations";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <button type="submit">Log In</button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
