import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidebar.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidebar = ({ open, closedHandler }) => {
  return (
    <>
      <Backdrop show={open} clicked={closedHandler} />
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
