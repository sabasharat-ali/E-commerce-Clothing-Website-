import CartActionTypes from "./cart.types";
import firebase from "firebase/app";

import "firebase/firestore";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemsFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const placeOrder = (
  navigation,
  cart,
  userdata,
  total
  // toast,
) => {
  console.log(cart);
  console.log("asfasdf", total);
  console.log(userdata);
  // dispatch({
  //   type: actionTypes.START_LOADING,
  // });
  // let data = {
  //   userName: userdata.displayName,
  //   userEmail: userdata.email,
  //   userId: userdata.id,

  //   cart,
  // };
  // console.log(data);
  // let users = [],
  //   finalProductData = [...cart.products],
  //   notificationData = [];

  // for (let i = 0; i < cart.products.length; i++) {
  //   if (users.includes(cart.products[i].storeId) === false) {
  //     users.push(cart.products[i].storeId);
  //     if (cart.products[i].storeFcmToken !== null) {
  //       notificationData.push({
  //         fcmToken: cart.products[i].storeFcmToken,
  //         notificationBody:
  //           "Order Has Been Launched by " +
  //           userdata.name +
  //           ". Kindly Check Your ongoing Orders Page.",
  //       });
  //     }
  //   }
  //   finalProductData[i].images = [finalProductData[i].images[0]];
  //   delete finalProductData[i].tags;
  //   delete finalProductData[i].storeFcmToken;
  //   delete finalProductData[i].priceDollar;
  //   delete finalProductData[i].priceRS;
  //   delete finalProductData[i].productDetails;
  // }
  // users.push(cart.deliveryBoy.uid);
  // users.push(userdata.uid);
  // if (cart.deliveryBoy.fcmToken !== null) {
  //   notificationData.push({
  //     fcmToken: cart.deliveryBoy.fcmToken,
  //     notificationBody:
  //       "Order Has Been Launched by " +
  //       userdata.name +
  //       ". Kindly Check Your ongoing Booking Page.",
  //   });
  // }

  firebase
    .firestore()
    .collection("orders")
    .doc()
    .set({
      userName: userdata.displayName,
      userEmail: userdata.email,
      userId: userdata.id,
      total,
      cart,
    })
    .then(() => {
      // dispatch({ type: actionTypes.NOT_LOADING });
      // navigation.dispatch(
      //   StackActions.reset({
      //     index: 0,
      //     actions: [
      //       NavigationActions.navigate({
      //         routeName: "RestaurantProducts",
      //       }),
      //     ],
      //   })
      // );
      alert("Your Order Has Been Placed!");
    })

    .catch(() => {
      // dispatch({
      //   type: actionTypes.CLEAR_CART,
      // });
      // dispatch({ type: actionTypes.NOT_LOADING });
      // navigation.dispatch(
      //   StackActions.reset({
      //     index: 0,
      //     actions: [
      //       NavigationActions.navigate({
      //         routeName: "RestaurantProducts",
      //       }),
      //     ],
      //   })
      // );
      alert(
        "Some Problem Has Occured In Placing Your Order, If You Have Made Online Transaction Then Contact App Representative Otherwise Try Again"
      );
      // return;
    });
  return { type: CartActionTypes.PLACE_ORDER };
};
