import React, { Component } from "react";
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const UpdatedPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: UpdatedPrice,
    });
    this.purchaseUpdateHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const UpdatedPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: UpdatedPrice,
    });
    this.purchaseUpdateHandler(updatedIngredients);
  };

  purchaseUpdateHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingkey) => {
        return ingredients[ingkey];
      })
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
   
    const queryParams=[];
    for(let items in this.state.ingredients){
      queryParams.push(encodeURIComponent(items)+"="+encodeURIComponent(this.state.ingredients[items]))
    }
    queryParams.push("price="+this.state.totalPrice)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname:'/checkout',
      search: "?"+queryString,
    })
  };

  componentDidMount() {
    axios.get("/ingredients.json").then((response) => {
      this.setState({ ingredients: response.data });
      return response;
    }).catch(error=>{this.setState({error:error})})
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
     let burger = this.state.error?<p>Error in fetching Ingredients</p>:<Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
     orderSummary = (
        <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        />
        );
      }
    if (this.state.loading) orderSummary = <Spinner />;
      return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalCancel={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
