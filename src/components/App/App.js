import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder, changeAddresses, changeMyOrders, getCategories } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeMenu, changeAddresses, changeMyOrders, getCategories } = props;
  const url = window.location.pathname.replace("/customer/","");
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

  useEffect(() => {
    getCategories()
    changeMenu(url);
    changeAddresses(addresses)
    changeMyOrders(myOrders)
  },[])
  
  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { changeOrder, changeMenu, changeAddresses, changeMyOrders, getCategories })(App);