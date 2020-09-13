import React from "react";
import styles from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  return (
    <div>
      <li className={styles.navigationItem}>
        <a href={props.link} className={props.active ? styles.active : null}>
          {props.children}
        </a>
      </li>
    </div>
  );
};

export default NavigationItem;
