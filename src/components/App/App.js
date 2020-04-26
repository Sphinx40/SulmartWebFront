import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder, changeAddresses, changeMyOrders, getPopular } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeMenu, changeAddresses, changeMyOrders, getPopular } = props;
  const url = window.location.pathname.replace("/","");
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

  useEffect(() => {
    changeMenu(url);
    changeAddresses(addresses)
    changeMyOrders(myOrders)
    getPopular()
  },[])
  
  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { changeOrder, changeMenu, changeAddresses, changeMyOrders, getPopular })(App);