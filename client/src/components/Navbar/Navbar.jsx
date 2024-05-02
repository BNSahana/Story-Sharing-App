import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import hamburger from "../../assets/menu.png";
import cross from "../../assets/cross.png";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderToggleIcon = () => {
    return (
      <img
        onClick={toggleModal}
        className={`${styles.toggleIcon} ${
          showModal ? styles.cross : styles.hamburger
        }`}
        src={showModal ? cross : hamburger}
        alt={showModal ? "cross" : "hamburger"}
      />
    );
  };

  return (
    <div className={styles.navbar__wrapper}>
      <div
        className={`${styles.navbar__container} ${
          showModal ? styles.nobox__shadow : styles.box__shadow
        }`}
      >
        <div onClick={() => navigate("/")} className={styles.logo}>
          SwipTory
        </div>
        <div className={styles.btn__container}>
          {!isMobile ? (
            <DesktopNavbar authValidated={props.authValidated} />
          ) : (
            renderToggleIcon()
          )}
        </div>
      </div>

      {showModal && isMobile && (
        <MobileNavbar
          authValidated={props.authValidated}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default NavBar;
