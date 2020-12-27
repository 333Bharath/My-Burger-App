import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientsOrder = Object.keys(props.ingredients).map((ingkey) => {
    return (
      <li key={ingkey}>
        <span style={{ textTransform: "capitalize" }}>{ingkey}:</span>
        {props.ingredients[ingkey]}{" "}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>

      <p>A Delicious Burger with following Ingredients:</p>
      <ul>{ingredientsOrder}</ul>
      <p>Continue to checkout?</p>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" click={props.cancel}>
        Cancel
      </Button>
      <Button btnType="Success" click={props.continue}>
        Continue
      </Button>
    </Aux>
  );
};
export default orderSummary;
