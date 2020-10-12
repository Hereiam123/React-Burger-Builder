import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    sideBarOpen: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ sideBarOpen: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ sideBarOpen: true });
  };

  render() {
    return (
      <>
        <Sidebar
          closedHandler={this.sideDrawerCloseHandler}
          open={this.state.sideBarOpen}
          isAuth={this.props.isAuthenticated}
        />
        <Toolbar
          openHandler={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuthenticated}
        />
        <div> Sidedrawer, Backdrop</div>
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
