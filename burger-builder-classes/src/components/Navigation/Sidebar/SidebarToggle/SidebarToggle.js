import React from "react";
import styles from "./SidebarToggle.module.css";

const SidebarToggle = ({ clicked }) => {
  return (
    <button className={styles.sidebarToggle} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default SidebarToggle;
