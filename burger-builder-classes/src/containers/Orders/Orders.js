import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axiosInstance";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        console.log(response.data);
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        <Order />
      </div>
    );
  }
}

export default Orders;
