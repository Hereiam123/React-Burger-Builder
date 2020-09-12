import React from "react";
import logoImage from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logoImage} />
    </div>
  );
};

export default Logo;
