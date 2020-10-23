import React, { Suspense, lazy, useEffect } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "./store/actions/auth";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          {props.isAuthenticated ? (
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
              </Suspense>
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={Auth} />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(authActions.authCheckState());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
