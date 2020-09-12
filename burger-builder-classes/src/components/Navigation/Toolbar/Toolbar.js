import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = () => {
  return (
    <header className={styles.toolbar}>
      <Logo />
      <div>Menu</div>
      <nav>...</nav>
    </header>
  );
};

export default Toolbar;
