import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import styles from "./ContactData.module.css";
import axios from "../../../axiosInstance";

class ContactData extends Component {
  state = {
    userName: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className={styles.contactData}>
            <h4>Contact Form</h4>
            <form>
              <Input type="text" label="Name" name="name" placeholder="Name" />
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Email"
              />
              <Input
                type="textarea"
                label="Street Address"
                name="street"
                placeholder="Street Address"
              />
              <Input
                type="text"
                label="Postal Code"
                name="postal"
                placeholder="Postal Code"
              />
              <Button btnType="success" clicked={this.orderHandler}>
                ORDER
              </Button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default ContactData;
