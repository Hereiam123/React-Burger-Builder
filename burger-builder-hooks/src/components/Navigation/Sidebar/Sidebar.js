import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidebar.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidebar = ({ open, closedHandler, isAuth }) => {
  let attachClass = [styles.sidebar, styles.close];
  if (open) {
    attachClass = [styles.sidebar, styles.open];
  }
  return (
    <>
      <Backdrop show={open} clicked={closedHandler} />
      <div className={attachClass.join(" ")} onClick={closedHandler}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
