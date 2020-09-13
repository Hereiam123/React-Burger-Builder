import React from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";

const Layout = (props) => (
  <>
    <Sidebar />
    <Toolbar />
    <div> Sidedrawer, Backdrop</div>
    <main className={styles.content}>{props.children}</main>
  </>
);

export default Layout;
