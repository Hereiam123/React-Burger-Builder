import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as authActions from "../../store/actions/auth";
import styles from "./Auth.module.css";

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
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.authForm,
    };
    const updatedFormItem = { ...updatedAuthForm[inputIdentifier] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.valid = this.checkValidity(
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
      this.state.authForm.password.value
    );
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
              <Button btnType="success" disabled={!this.state.formIsValid}>
                Sign Up
              </Button>
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password) => {
      dispatch(authActions.auth(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
