import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/users.actions";

const HatsPage = () => (
  <div>
    <h1>HELLO THIS IS THE HATS PAGE</h1>
  </div>
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //IF WE HAVE A USER DO THIS (USER SIGNS IN)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //console.log(snapshot.data());
        // WITHOUT .data it wont give the name and email
        // SNAPSHOT TELLS US IF DATA EXISTS IN OUR DATABASE AND WITH .data WE CAN ACCESS THE DATA
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      //IF WE DONT HAVE USER SET IT TO NULL LIKE THIS (USER SIGNS OUT)
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        {/* NOW THE currentUser STATE WILL BE PROVIDED THROUGH REDUX */}
        {/* <Header currentUser={this.state.currentUser} /> */}
        {/* WE HAVE TO MAKE SURE THAT OUR HEADER IS AWARE WHEN OUR USER IS SIGNED IN AND WHEN THE USER IS SIGNED OUT */}
        {/* AND WE WILL DO THAT BY GIVING HEADER THE CURRENT USER STATE */}
        <Switch>
          {/* WE HAVE USED SWITCH TO GET MORE CONTROL OF ROUTE. ALL IT DOES IS ONLY RENDERS THE PATH THAT MATCHES */}
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
