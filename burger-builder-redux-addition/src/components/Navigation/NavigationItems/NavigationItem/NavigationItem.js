import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationItem.module.css";

const NavigationItem = ({ link, exact, children }) => {
  return (
    <div>
      <li className={styles.navigationItem}>
        <NavLink to={link} exact={exact} activeClassName={styles.active}>
          {children}
        </NavLink>
      </li>
    </div>
  );
};

export default NavigationItem;
