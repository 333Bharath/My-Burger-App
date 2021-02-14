import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:<strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            label={ctrl.label}
            key={ctrl.type}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
          />
        );
      })}
      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
