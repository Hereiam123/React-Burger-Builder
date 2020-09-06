import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = ({ show }) => {
  return show ? <div className={styles.backdrop}></div> : null;
};

export default Backdrop;
