import React from "react";
import styles from "./SidebarToggle.module.css";

const SidebarToggle = ({ clicked }) => {
  return (
    <button className={styles.sidebarToggle} onClick={clicked}>
      Menu
    </button>
  );
};

export default SidebarToggle;
