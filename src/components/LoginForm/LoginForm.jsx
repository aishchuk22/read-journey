import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./LoginForm.module.css";
import { loginUser } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: yup
    .string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.accessToken); // тимчасово
      toast.success("Login successful!");
      navigate("/recommended");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
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
