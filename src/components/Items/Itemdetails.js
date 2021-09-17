import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import M from "materialize-css";
// import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { Increment } from "../../store/actions/itemAction";
import { Decrement } from "../../store/actions/itemAction";
import { addToCart, getDelivery } from "../../store/actions/itemAction";
import { dishMenuById } from "../../store/actions/itemAction";
import { backToMenu } from "../../store/actions/itemAction";
import { Menu } from "../../store/actions/itemAction";
import { ingredientSum } from "../../store/actions/itemAction";
import { ingredientDeduct } from "../../store/actions/itemAction";
import Loader from "react-loader-spinner";

class ItemDetails extends Component {
  state = {
    selectedOption: "",
    checked: 0,
    selectedChecked: [],
    specs: "",
  };

  onToppingsChange = (i, e) => {
    this.setState({
      checked: i,
      selectedOption: e.target.value,
    });
  };

  handleText = (e) => {
    this.setState({
      specs: e.target.value,
    });
  };

  handleChange = (event, i, id, cost) => {
    const target = event.target;
    if (target.checked) {
      this.props.ingredientSum(id);
      const newTodo = [
        ...this.state.selectedChecked,
        { id: i, value: event.target.name, price: cost },
      ];
      this.setState({
        selectedChecked: newTodo,
      });
    } else {
      this.props.ingredientDeduct(id);
      const newSelect = this.state.selectedChecked.filter(
        (item) => item.id !== i
      );
      this.setState({
        selectedChecked: newSelect,
      });
    }
  };

  componentDidMount() {
    const { item } = this.props;
    this.props.dishMenuById(item.dishTypeId, this.props.match.params.id);
  }
  componentDidUpdate() {
    let Materialbox = document.querySelector(".materialboxed");
    M.Materialbox.init(Materialbox, {});
  }
  incrementClick = () => {
    this.props.Increment();
  };
  decrementClick = () => {
    this.props.Decrement();
  };
  addCartClick = (id, name) => {
    M.toast({ html: `${name} added to cart`, classes: "green" });
    this.props.addToCart(
      id,
      this.state.selectedOption,
      this.state.selectedChecked,
      this.state.specs
    );
    this.props.getDelivery();
    this.props.Menu();
    this.props.history.push("/home");
  };
  handleRoute = () => {
    const { item } = this.props;
    this.props.backToMenu(item.dishTypeId);
    this.props.history.push(`/home#${item.dishTypeId}`);
  };
  render() {
    const { count, item, price, dishmenu, attribute, ingredients, loading } =
      this.props;

    if (loading)
      return (
        <Loader
          type="Oval"
          color="#1565C0"
          height={50}
          width={50}
          className="center load"
        />
      );

    // if(!loading) return dishMenu

    const dishMenu = dishmenu.length ? (
      dishmenu.map((dish) => {
        return (
          <div className="col s12 l6 m6" key={dish.id}>
            <div className="card small">
              <div className="card-image">
                <img
                  src={dish.imgUrl}
                  className="responsive-img materialboxed"
                  alt="third"
                />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col l6 s6">
                    <span className="card-title" style={{ fontWeight: 500 }}>
                      {dish.name}
                    </span>
                  </div>
                  <div className="col l6 s6 right-align">
                    <span
                      className="card-title"
                      style={{ fontWeight: 500 }}
                    >{`$${dish.price / 100}`}</span>
                    <p>Base Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p></p>
    );

    const attrTitle = attribute.length ? (
      <span className="card-title" style={{ fontWeight: 500 }}>
        Extra options
      </span>
    ) : (
      <p></p>
    );

    const dishAttr = attribute.length ? (
      attribute.map((attr, i) => {
        return (
          <div className="row" key={attr.id}>
            <div className="col l6 s6">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="toppings"
                    type="radio"
                    value={attr.name}
                    // checked={this.state.checked === i ? true : false}
                    checked={this.state.selectedOption === attr.name}
                    onChange={this.onToppingsChange.bind(this, i)}
                  />
                  <span>{attr.name}</span>
                </label>
              </p>
            </div>
            <div className="col l6 s6 right-align">
              {`+${attr.reprice.toFixed(2)}`}
            </div>
          </div>
        );
      })
    ) : (
      <p></p>
    );

    let ingredientTitle;
    if (!ingredients || ingredients.length === 0) {
      ingredientTitle = <p></p>;
    } else {
      ingredientTitle = (
        <span className="card-title" style={{ fontWeight: 500 }}>
          Add ons
        </span>
      );
    }

    let Ingredients;
    if (!ingredients || ingredients.length === 0) {
      Ingredients = <p></p>;
    } else {
      Ingredients = ingredients.length ? (
        ingredients.map((ingredient, i) => {
          let cost = ingredient.marketPrice / 100;
          return (
            <div className="row" key={ingredient.id}>
              <div className="col s6 l6">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name={ingredient.name}
                      onChange={(e) => {
                        this.handleChange(e, i, ingredient.id, cost);
                      }}
                    />
                    <span>{ingredient.name}</span>
                  </label>
                </p>
              </div>
              <div className="col s6 l6 right-align">
                {`+${cost.toFixed(2)}`}
              </div>
            </div>
          );
        })
      ) : (
        <p></p>
      );
    }

    return (
      <React.Fragment>
        <Navbar />
        <div className="container section">
          <div className="row" style={{ marginTop: 10 }}>
            {dishMenu}
            <div className="col s12 l6 m6">
              <div className="card z-depth-1">
                <div className="card-content">
                  {ingredientTitle}

                  {Ingredients}

                  {attrTitle}

                  {dishAttr}

                  <span className="card-title" style={{ fontWeight: 500 }}>
                    Special Instructions
                  </span>
                  <p style={{ fontWeight: 500 }}>(Optional)</p>
                  <input
                    type="text"
                    placeholder="E.g No onions please"
                    onChange={this.handleText}
                  />
                </div>
                <div className="card-action center">
                  <button
                    onClick={this.decrementClick}
                    disabled={count === 1}
                    className="btn z-depth-1 white green-text"
                    style={{ marginRight: 15 }}
                  >
                    <i className="material-icons">remove</i>
                  </button>
                  <span style={{ fontWeight: 600 }}>{count}</span>
                  <button
                    onClick={this.incrementClick}
                    className="btn z-depth-1 white green-text"
                    style={{ marginLeft: 15 }}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* add to basket */}
          <div className="center" style={{ marginBottom: 10 }}>
            <button
              onClick={this.handleRoute}
              className="waves-effect btn btn-style blue darken-3 z-depth-0"
            >
              <i className="material-icons left">arrow_back</i>Back
            </button>
            <button
              onClick={() => {
                this.addCartClick(item.id, item.name);
              }}
              className="waves-effect btn blue darken-3 z-depth-0"
            >
              <i className="material-icons left">add_shopping_cart</i>Add to
              cart - {`$${price.toFixed(2)}`}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    count: state.item.count,
    price: state.item.pricesum,
    dishmenu: state.item.dishMenuById,
    attribute: state.item.dishattr,
    ingredients: state.item.ingredients,
    loading: state.item.loading,
    item: state.item.dishlist.find((dish) => dish.id.toString() === id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Increment: () => dispatch(Increment()),
    Decrement: () => dispatch(Decrement()),
    addToCart: (id, selectedOption, selectedChecked, specs) =>
      dispatch(addToCart(id, selectedOption, selectedChecked, specs)),
    dishMenuById: (dishId, id) => dispatch(dishMenuById(dishId, id)),
    backToMenu: (id) => dispatch(backToMenu(id)),
    Menu: () => dispatch(Menu()),
    getDelivery: () => dispatch(getDelivery()),
    ingredientSum: (id) => dispatch(ingredientSum(id)),
    ingredientDeduct: (id) => dispatch(ingredientDeduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
