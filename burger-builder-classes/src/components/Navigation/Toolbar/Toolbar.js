import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SidebarToggle from "../Sidebar/SidebarToggle/SidebarToggle";

const Toolbar = ({ openHandler }) => {
  return (
    <header className={styles.toolbar}>
      <SidebarToggle clicked={openHandler} />
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
