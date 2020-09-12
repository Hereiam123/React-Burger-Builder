import React from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) => (
  <>
    <Toolbar />
    <div> Sidedrawer, Backdrop</div>
    <main className={styles.content}>{props.children}</main>
  </>
);

export default Layout;
