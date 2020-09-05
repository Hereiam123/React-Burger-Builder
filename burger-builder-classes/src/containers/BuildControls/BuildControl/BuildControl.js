import React from "react";
import styles from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={styles.buildControl}>
      <div className={styles.label}>{props.label}</div>
      <button className={styles.less}>Minus</button>
      <button className={styles.more} onClick={props.add}>
        Plus
      </button>
    </div>
  );
};

export default BuildControl;
