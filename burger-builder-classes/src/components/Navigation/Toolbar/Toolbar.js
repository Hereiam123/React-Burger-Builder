import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = () => {
  return (
    <header className={styles.toolbar}>
      <div>Menu</div>
      <Logo logoHeight="80%" />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
