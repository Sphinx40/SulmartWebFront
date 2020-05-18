import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  changeMenu,
  changeOrder,
  changeAddresses,
  changeMyOrders,
  getCategories,
  getOrderStatuses,
} from "../../actions";
import WebRoutes from "../routes/webRoutes";
import MobileRoutes from "../routes/mobileRoutes";

const App = (props) => {
  const {
    changeMenu,
    changeAddresses,
    changeMyOrders,
    getCategories,
    getOrderStatuses,
  } = props;
  const url = window.location.pathname.replace("/customer/", "");
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

  useEffect(() => {
    getCategories();
    changeMenu(url);
    changeAddresses(addresses);
    changeMyOrders(myOrders);
    getOrderStatuses();
  }, []);

  if (window.innerWidth <= 500) {
    return <MobileRoutes />;
  } else {
    return <WebRoutes />;
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  changeOrder,
  changeMenu,
  changeAddresses,
  changeMyOrders,
  getCategories,
  getOrderStatuses,
})(App);
