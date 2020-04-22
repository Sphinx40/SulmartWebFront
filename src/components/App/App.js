import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeMenu, changeOrder } from '../../actions';
import RenderRoutes from "../routes/routes";

const App = (props) => {
  const { changeMenu } = props;
  const url = window.location.pathname.replace("/","");

  useEffect(() => {
    changeMenu(url);
  },[])
  
  return RenderRoutes();
};

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps, { changeOrder, changeMenu })(App);