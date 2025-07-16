import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: yup
    .string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      localStorage.setItem("token", res.accessToken); // тимчасово
      toast.success("Registration successful!");
      navigate("/recommended");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
