import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as authActions from "../../store/actions/auth";
import styles from "./Auth.module.css";
import { checkValidity } from "../../shared/checkValidity";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 7,
          maxLength: 15,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.authForm,
    };
    const updatedFormItem = { ...updatedAuthForm[inputIdentifier] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.valid = checkValidity(
      updatedFormItem.value,
      updatedFormItem.validation
    );
    updatedFormItem.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormItem;

    let formIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ authForm: updatedAuthForm, formIsValid });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthSubmit(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }
    return (
      <>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={styles.auth}>
            <form onSubmit={this.onSubmitHandler}>
              {formElementsArray.map((formElement) => {
                return (
                  <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changeHandler={(event) =>
                      this.inputChangeHandler(event, formElement.id)
                    }
                  />
                );
              })}
              {this.props.error ? <p>{this.props.error.message}</p> : null}
              <Button btnType="success" disabled={!this.state.formIsValid}>
                Submit
              </Button>
            </form>
            <Button clicked={this.switchAuthModeHandler} btnType="danger">
              Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.authToken !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password, isSignUp) => {
      dispatch(authActions.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => {
      dispatch(authActions.setAuthRedirectPath("/"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
