import React from "react";
import styles from "./NavigationItem.module.css";

const NavigationItem = () => {
  return (
    <div>
      <li className={styles.navigationItem}>
        <a href="#">Navigation Item</a>
      </li>
    </div>
  );
};

export default NavigationItem;
