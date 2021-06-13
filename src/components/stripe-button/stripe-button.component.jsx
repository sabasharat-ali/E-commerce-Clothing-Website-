import React from "react";

import StripeCheckout from "react-stripe-checkout";

import { createStructuredSelector } from "reselect";
import { placeOrder } from "../../redux/cart/cart.actions";


import { connect } from "react-redux";

import {
  clearItemsFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import {
selectCurrentUser
  
} from "../../redux/user/user.selectors";
const StripeCheckoutButton = ({ cartItems, total, price, placeOrder, user }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_fivJuTVZsYJK9gi2efuz3Jqo00R0XzbpWX";

  const onToken = (token) => {
    // console.log(cartItems)
    console.log(user)
    placeOrder({}, cartItems, user, total)


  };
  // import { createStructuredSelector } from "reselect";


  return (
    // <StripeCheckout
    //   label="Pay Now"
    //   name="CROWN Clothing Ltd."
    //   billingAddress
    //   shippingAddress
    //   image="https://svgshare.com/i/CUz.svg"
    //   description={`Your total is $${price}`}
    //   amount={priceForStripe}
    //   panelLabel="Pay Now"
    //   token={onToken}
    //   stripeKey={publishableKey}
    // />
    <button onClick={onToken}>hello</button>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  user: selectCurrentUser

});

const mapDispatchToProps = (dispatch) => ({
  // signOutStart: () => dispatch(signOutStart()),
  placeOrder: ({ }, cart, user, total) => dispatch(placeOrder({}, cart, user, total))
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton);
