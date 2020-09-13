import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";

class Layout extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <Toolbar />
        <div> Sidedrawer, Backdrop</div>
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
