import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";
import styles from "./Register.module.css";
import { registerUser } from "../../api/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
    showError: false,
    errorMessage: "",
    showLogin: false,
    isProcessing: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      showError: false,
      isProcessing: true,
    }));
    try {
      await registerUser({
        username: formData.username,
        password: formData.password,
      });
      setFormData((prevData) => ({ ...prevData, showLogin: true }));
    } catch (error) {
      setFormData((prevData) => ({
        ...prevData,
        showError: true,
        errorMessage: error.message,
      }));
      console.error(error);
    } finally {
      setFormData((prevData) => ({ ...prevData, isProcessing: false }));
    }
  };

  const {
    username,
    password,
    showPassword,
    showError,
    errorMessage,
    showLogin,
    isProcessing,
  } = formData;

  return (
    <CustomModal>
      {showLogin ? (
        <>
          <h1 className={styles.form__header}>Welcome to SwipTory!</h1>
          <p className={styles.form__success}>
            You have registered successfully, Please login to continue
          </p>
          <Link to="/?signin=true">
            <button className={styles.signIn__btn}>Login</button>
          </Link>
        </>
      ) : (
        <>
          <h1 className={styles.form__header}>Register to SwipTory</h1>
          <form className={styles.form__container} onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
            <div className={styles.password__container}>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter password"
                className={styles.passwordInput}
              />
              <div
                onClick={togglePasswordVisibility}
                className={styles.password__icon}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            {showError && <div className={styles.error}>{errorMessage}</div>}
            <div>
              <button
                type="submit"
                disabled={isProcessing}
                style={{ color: "73ABFF" }}
              >
                {isProcessing ? "Processing..." : "Register"}
              </button>
            </div>
          </form>
          <div>
            <Link to="/?signin=true">
              <p className={styles.click__here}>
                Registered already? Click here
              </p>
            </Link>
          </div>
        </>
      )}
    </CustomModal>
  );
};

export default Register;
