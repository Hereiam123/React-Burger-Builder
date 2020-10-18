import React from "react";
import logoImage from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = ({ logoHeight }) => {
  return (
    <div className={styles.logo} style={{ height: logoHeight }}>
      <img src={logoImage} alt="Burger Logo" />
    </div>
  );
};

export default Logo;
