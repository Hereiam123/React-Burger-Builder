import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";

const Layout = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideBarOpen(false);
  };

  const sideDrawerOpenHandler = () => {
    setSideBarOpen(true);
  };

  return (
    <>
      <Sidebar
        closedHandler={sideDrawerCloseHandler}
        open={sideBarOpen}
        isAuth={props.isAuthenticated}
      />
      <Toolbar
        openHandler={sideDrawerOpenHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={styles.content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
