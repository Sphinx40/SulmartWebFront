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
import { getCookie } from "../../utils/helpers";

const App = (props) => {
  const {
    changeMenu,
    changeAddresses,
    changeMyOrders,
    getCategories,
    getOrderStatuses,
    selectedAddress,
  } = props;
  const url = window.location.pathname.replace("/customer/", "");
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
  let cookie = false;

  useEffect(() => {
    getCategories();
    changeMenu(url);
    changeAddresses(addresses);
    changeMyOrders(myOrders);
    getOrderStatuses();
  }, []);

  if (getCookie("isMobile")) {
    cookie = true
  }

  if (cookie) {
    return <MobileRoutes selectedAddress={selectedAddress} />;
  } else {
    return <WebRoutes />;
  }
};

const mapStateToProps = (state) => {
  return {
    selectedAddress: state.Main.selectedAddress,
  };
};

export default connect(mapStateToProps, {
  changeOrder,
  changeMenu,
  changeAddresses,
  changeMyOrders,
  getCategories,
  getOrderStatuses,
})(App);
