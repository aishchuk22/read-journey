import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./RegisterForm.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import { toast } from "react-hot-toast";
import registerSchema from "../../validation/registerSchema";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type="text"
        placeholder="Name"
        {...formRegister("name")}
      />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        {...formRegister("email")}
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        {...formRegister("password")}
      />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <button className={styles.button} type="submit">
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
