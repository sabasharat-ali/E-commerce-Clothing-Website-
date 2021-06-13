import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from "./sign-in.styles";

class Admin extends React.Component {
  constructor(props) {
    super(props);

  
  }

  render() {
    return (
      <SignInContainer>
       
        <form>
          <FormInput
            name="email"
            type="email"
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            label="password"
            required
          />
          <ButtonsBarContainer>
            <CustomButton type="submit"> Sign in </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}




export default Admin;
