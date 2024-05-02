import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import avatar from "../../assets/profile.png";
import hamburger from "../../assets/menu.png";
import cross from "../../assets/cross.png";

const DesktopNavbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const isBookmarksActive = searchParams.get("viewbookmarks");

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const renderAuthenticatedItems = () => {
    return (
      <>
        <Link to="/?viewbookmarks=true">
          <button
            style={{
              border: isBookmarksActive
                ? "3px solid #085cff"
                : "3px solid transparent",
            }}
            className={styles.bookmark__btn}
          >
            Bookmarks
          </button>
        </Link>
        <Link to="/?addstory=true">
          <button className={styles.add__storybtn}>Add Story</button>
        </Link>
        <img className={styles.profile} src={avatar} alt="avatar" />
        <img
          className={`${styles.toggleIcon} ${
            showMenu ? styles.cross : styles.hamburger
          }`}
          onClick={handleToggleMenu}
          src={showMenu ? cross : hamburger}
          alt={showMenu ? "cross" : "hamburger"}
        />
        {showMenu && (
          <div className={styles.menu__section}>
            <p>{localStorage.getItem("username")}</p>
            <button onClick={handleLogout} className={styles.logout__btn}>
              Logout
            </button>
          </div>
        )}
      </>
    );
  };

  const renderUnauthenticatedItems = () => {
    return (
      <>
        <Link to="/?register=true">
          <button className={styles.register__btn}>Register Now</button>
        </Link>
        <Link to="/?signin=true">
          <button className={styles.signin__btn}>Sign In</button>
        </Link>
      </>
    );
  };

  return (
    <>
      {props.authValidated
        ? renderAuthenticatedItems()
        : renderUnauthenticatedItems()}
    </>
  );
};

export default DesktopNavbar;
