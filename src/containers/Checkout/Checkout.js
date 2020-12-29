import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const queryString = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let ing of queryString.entries()) {
      if (ing[0] === "price") {
        this.setState({ totalPrice: +ing[1] });
      } else {
        ingredients[ing[0]] = +ing[1];
      }
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
