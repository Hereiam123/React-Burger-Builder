import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";

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
              <input type="text" name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
              <input type="text" name="street" placeholder="Street Address" />
              <input type="text" name="postal" placeholder="Postal Code" />
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