import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as authActions from "../../store/actions/auth";
import styles from "./Auth.module.css";
import { checkValidity } from "../../shared/checkValidity";

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
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
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (props.building && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...authForm,
    };
    const updatedFormItem = { ...updatedAuthForm[inputIdentifier] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.valid = checkValidity(
      updatedFormItem.value,
      updatedFormItem.validation
    );
    updatedFormItem.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormItem;

    let inputformIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      inputformIsValid =
        updatedAuthForm[inputIdentifier].valid && inputformIsValid;
    }
    setAuthForm(updatedAuthForm);
    setFormIsValid(inputformIsValid);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuthSubmit(authForm.email.value, authForm.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }
  return (
    <>
      {props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : null}
      {props.loading ? (
        <Spinner />
      ) : (
        <div className={styles.auth}>
          <form onSubmit={onSubmitHandler}>
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
                    inputChangeHandler(event, formElement.id)
                  }
                />
              );
            })}
            {props.error ? <p>{props.error.message}</p> : null}
            <Button btnType="success" disabled={!formIsValid}>
              Submit
            </Button>
          </form>
          <Button clicked={switchAuthModeHandler} btnType="danger">
            Switch to {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      )}
    </>
  );
};

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
