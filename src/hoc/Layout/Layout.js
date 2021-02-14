import React, { Component } from "react";
import classes from "./Layout.module.css";

import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Aux from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          click={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
