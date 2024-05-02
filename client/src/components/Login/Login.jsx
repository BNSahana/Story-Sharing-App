import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";
import styles from "./Login.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUser } from "../../api/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await loginUser(formData);

      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("userId", response._id);
      window.localStorage.setItem("username", response.username);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal>
      {success ? (
        <>
          <h1 className={styles.form__header}>
            You have logged in successfully
          </h1>
          <p className={styles.form__success}>Explore SwipTory!!</p>
        </>
      ) : (
        <>
          <h1 className={styles.form__header}>Login to SwipTory</h1>
          <LoginForm
            formData={formData}
            error={error}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </>
      )}
    </CustomModal>
  );
};

const LoginForm = ({
  formData,
  error,
  isLoading,
  handleChange,
  handleSubmit,
  togglePasswordVisibility,
}) => {
  return (
    <>
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className={styles.password__container}>
          <label>Password</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={styles.passwordInput}
            />
            <div
              onClick={togglePasswordVisibility}
              className={styles.password__icon}
            >
              {formData.showPassword ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </div>
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div>
          <button type="submit">Login</button>
        </div>
        {isLoading && <div className={styles.form__header}>Loading...</div>}
      </form>
      <div>
        <Link to="/?register=true">
          <p className={styles.click__here}>Not yet Registered? Click here</p>
        </Link>
      </div>
    </>
  );
};

export default Login;
