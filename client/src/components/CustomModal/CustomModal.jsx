import React from "react";
import { Link } from "react-router-dom";
import styles from "./CustomModal.module.css";
import modalCloseIcon from "../../assets/modalCloseIcon.jpg";

const CustomModal = ({ children }) => {
  return (
    <div className={styles.coverage}>
      <div className={styles.modal__container}>
        <div className={styles.modal__content}>{children}</div>
        <Link to="/">
          <img
            className={styles.modal__close__icon}
            src={modalCloseIcon}
            alt="modal-close-icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default CustomModal;
