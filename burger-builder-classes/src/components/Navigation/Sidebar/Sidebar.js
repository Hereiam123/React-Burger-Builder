import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo logoHeight="10%" />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Sidebar;
