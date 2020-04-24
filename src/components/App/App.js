import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder, changeAddresses } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeMenu, changeAddresses } = props;
  const url = window.location.pathname.replace("/","");
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  useEffect(() => {
    changeMenu(url);
    changeAddresses(addresses)
  },[])
  
  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { changeOrder, changeMenu, changeAddresses })(App);