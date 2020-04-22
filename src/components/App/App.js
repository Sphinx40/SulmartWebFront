import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeOrder } = props;
  /* const url = window.location.pathname; */
  const lastOrders = JSON.parse(localStorage.getItem('order'));

  /* useEffect(() => {
    if (lastOrders.length !== 0) {
      changeOrder(lastOrders);
    };
  },[]) */

  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps, { changeOrder })(App);