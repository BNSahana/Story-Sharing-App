import React from "react";
import styles from "./MobileNavbar.module.css";
import avatar from "../../assets/profile.png";
import { Link } from "react-router-dom";

const MobileNavbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const handleToggleModal = () => {
    if (props.toggleModal) {
      props.toggleModal();
    }
  };

  const renderAuthenticatedMenu = () => {
    return (
      <div className={styles.registered__mobilemenu}>
        <div>
          <img className={styles.profile} src={avatar} alt="avatar" />
          <p>{localStorage.getItem("username")}</p>
        </div>
        <Link onClick={handleToggleModal} to="/?yourstories=true">
          <button>Your Story</button>
        </Link>
        <Link onClick={handleToggleModal} to="/?addstory=true">
          <button>Add Story</button>
        </Link>
        <Link onClick={handleToggleModal} to="/?viewbookmarks=true">
          <button>Bookmarks</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  const renderUnauthenticatedMenu = () => {
    return (
      <div className={styles.unregistered__mobilemenu}>
        <Link onClick={handleToggleModal} to="/?register=true">
          <button className={styles.register__btn}>Register</button>
        </Link>
        <Link onClick={handleToggleModal} to="/?signin=true">
          <button className={styles.signin__btn}>Sign in</button>
        </Link>
      </div>
    );
  };

  return (
    <>
      {props.authValidated
        ? renderAuthenticatedMenu()
        : renderUnauthenticatedMenu()}
    </>
  );
};

export default MobileNavbar;
