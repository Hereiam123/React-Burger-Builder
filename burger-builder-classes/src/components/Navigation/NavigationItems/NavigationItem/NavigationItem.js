import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  return (
    <div>
      <li className={styles.navigationItem}>
        <NavLink to={props.link} activeClassName={styles.active}>
          {props.children}
        </NavLink>
      </li>
    </div>
  );
};

export default NavigationItem;
