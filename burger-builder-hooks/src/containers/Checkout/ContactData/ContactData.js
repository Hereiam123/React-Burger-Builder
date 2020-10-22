import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import styles from "./ContactData.module.css";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/order";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import { checkValidity } from "../../../shared/checkValidity";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
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
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street Address",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    postalCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
        minLength: 5,
        maxLength: 5,
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "2 day", display: "2 Day" },
          { value: "1 hour", display: "1 Hour" },
        ],
      },
      value: "2 day",
      validation: {
        required: true,
      },
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token, props.userId);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormItem = { ...updatedOrderForm[inputIdentifier] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.valid = checkValidity(
      updatedFormItem.value,
      updatedFormItem.validation
    );
    updatedFormItem.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormItem;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className={styles.contactData}>
          <h4>Contact Form</h4>
          <form onSubmit={orderHandler}>
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
            <Button btnType="success" disabled={!formIsValid}>
              ORDER
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.authToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (order, token) => {
      dispatch(orderActions.purchaseBurger(order, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
