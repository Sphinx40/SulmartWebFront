import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeOrder, changeMenu,state } = props;
  const url = window.location.pathname.replace("/","");
  const lastOrders = JSON.parse(localStorage.getItem('order')) || [];

  useEffect(() => {
    if (lastOrders.length !== 0) {
      changeOrder(lastOrders);
    };
    changeMenu(url);
  },[])
  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps, { changeOrder, changeMenu })(App);