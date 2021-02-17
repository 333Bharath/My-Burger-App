import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {

    let attachedClasses=[classes.SideDrawer,classes.Close];

    if(props.show){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }

    if(props)

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.click} />
      <div className={attachedClasses.join(' ')} onClick={props.click}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
