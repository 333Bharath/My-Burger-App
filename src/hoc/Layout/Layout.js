import React, { Component } from "react";
import classes from "./Layout.module.css";

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Auxiliary/Auxiliary'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        showSideDrawer:false
    }
    
    sideDrawerClosedHandler=()=>{
        this.setState({
            showSideDrawer:false
          })
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState,props)=>{
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer show={this.state.showSideDrawer} click={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
