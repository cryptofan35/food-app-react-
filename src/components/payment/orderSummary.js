import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import StripeCheckout from "react-stripe-checkout";
import M from "materialize-css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../../store/actions/itemAction";
import { Menu } from "../../store/actions/itemAction";
import { takeOrder } from "../../store/actions/itemAction";
import { Rapyd } from "../../store/actions/itemAction";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "Set B - Toast",
        price: 2.8,
      },
      currentPage: "#/",
    };
  }

  handleToken = (token) => {
    console.log({ token });
    const { total } = this.props;
    axios
      .post("https://vast-brook-06837.herokuapp.com/charge", { token, total })
      .then((response) => {
        console.log("Response:", response.data);
        const { status } = response.data;
        if (status === "succeeded") {
          M.toast({
            html: "Payment successful! Your order is been placed.",
            classes: "green",
          });
          this.props.takeOrder();
        } else {
          M.toast({ html: `${response.data.raw.message}` });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeCart = (id) => {
    this.props.removeCart(id);
  };

  RapydPay = (e) => {
    e.preventDefault();
    const { total } = this.props;
    if (total === 0) {
      M.toast({ html: "There is no item added to cart!!!" });
    } else {
      this.props.Rapyd();
    }
  };

  render() {
    const { addedItems, total, packFee, redirect_url, status } = this.props;
    console.log(this.props);
    if (status === "SUCCESS") {
      window.open(redirect_url, "_self");
    }

    const summary = addedItems.length ? (
      addedItems.map((items) => {
        return (
          <div className="row" key={items.id}>
            <div className="col s2 l2">
              <p className="green-text">{`${items.quantity}x`}</p>
            </div>
            <div className="col s6 l6">
              <p style={{ fontWeight: 600 }}>{items.name}</p>
              <p>{items.selectedToppings}</p>
              {items.selectedAddons.map((add) => {
                return <p key={add.id}>{add.value}</p>;
              })}
              <button
                onClick={() => {
                  this.removeCart(items.uniqueId);
                }}
                style={{ padding: 0 }}
                className="btn z-depth-0 white green-text"
              >
                Remove
              </button>
            </div>
            <div className="col s4 l4 right-align">
              <p style={{ fontWeight: 600 }}>{`$${items.marketPrice.toFixed(
                2
              )}`}</p>
              {items.selectedToppings ? (
                <p style={{ fontWeight: 600 }}>$0.00</p>
              ) : (
                ""
              )}
              {items.selectedAddons.map((add) => {
                return (
                  <p key={add.id} style={{ fontWeight: 600 }}>
                    {`$${add.price.toFixed(2)}`}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">
        <i className="medium material-icons blue-text text-darken-3 ">
          shopping_cart
        </i>
        <span className="card-title">Your cart is empty</span>
        <p>Looks like you have no items in your cart</p>
      </div>
    );

    const packDesign = addedItems.length ? (
      <div className="row">
        <div className="col s6 l6">
          <p style={{ fontWeight: 500 }}>Packaging Fees</p>
        </div>
        <div className="col s6 l6 right-align">
          <p style={{ fontWeight: 600 }}>{`$${packFee.toFixed(2)}`}</p>
        </div>
      </div>
    ) : (
      <p></p>
    );

    return (
      <React.Fragment>
        <Navbar />
        <div className="container" style={{ marginTop: 20 }}>
          <div className="row">
            <div className="col s12 l10 m10">
              <div className="card z-depth-1">
                <div className="card-content">
                  <div className="row">
                    <div className="col s6 l6">
                      <span className="card-title">Order Summary</span>
                    </div>
                    <div className="col s6 l6 right-align">
                      <Link
                        to="/home"
                        onClick={this.props.Menu}
                        className="btn z-depth-0 white green-text"
                        style={{ padding: 0 }}
                      >
                        Add items
                      </Link>
                    </div>
                  </div>

                  {/* item details list */}
                  {summary}

                  {packDesign}
                </div>
                <div className="card-action">
                  <div className="row">
                    <div className="col s6 l6">
                      <span className="card-title">Total</span>
                    </div>
                    <div className="col s6 l6 right-align">
                      <p style={{ fontWeight: 600 }}>{`$${total.toFixed(
                        2
                      )}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col s12 l10 m10">
              <div className="card z-depth-1">
                <div className="card-content">
                  {/* payment method */}
                  <span className="card-title">Payment Methods</span>

                  <div className="row" style={{ marginTop: 20 }}>
                    <div className="col s4 l4 center-align">
                      <StripeCheckout
                        style={{ marginTop: 5 }}
                        stripeKey="pk_test_lD4fwMmmeJw5ZbIN1salJO1400rzkliycN"
                        token={this.handleToken}
                        billingAddress
                        shippingAddress
                        amount={total * 100}
                        name="SRDD-包含消费税测试"
                        label="Stripe"
                        description="Online Food Ordering made easy"
                      />
                      <p className="center">Stripe</p>
                    </div>
                    <div className="col s4 l4 center-align">
                      <a href="#/" onClick={this.RapydPay}>
                        <img
                          src="img/paynow.png"
                          alt="rapyd"
                          className="pay-style"
                          width="80"
                          height="40"
                        />
                      </a>
                      <p className="center">Rapyd</p>
                    </div>

                    <div className="col s4 l4 center-align">
                      <a href="#/">
                        <img
                          src="img/dbpaylah.png"
                          alt="DBSpaylah"
                          className="pay-style"
                          width="80"
                          height="40"
                        />
                      </a>
                      <p className="center">DBSPaylah</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s4 l4 center-align">
                      <a href="#/">
                        <img
                          src="img/grabpay.png"
                          alt="grabpay"
                          className="pay-style"
                          width="80"
                          height="40"
                        />
                      </a>
                      <p className="center">GrabPay</p>
                    </div>
                    <div className="col s4 l4 center-align">
                      <a href="#/">
                        <img
                          src="img/NETSPay_icon.png"
                          alt="grabpay"
                          className="pay-style"
                          width="80"
                          height="40"
                        />
                      </a>
                      <p className="center">NETSPay</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.item.addedItems,
    total: state.item.total,
    packFee: state.item.packFee,
    status: state.item.status,
    redirect_url: state.item.redirect_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (id) => dispatch(removeCart(id)),
    Menu: () => dispatch(Menu()),
    takeOrder: () => dispatch(takeOrder()),
    Rapyd: () => dispatch(Rapyd()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
