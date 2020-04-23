import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import Nav from '../Nav/Nav';
import ErrorNotification from '../../utils/ErrorNotification';

const AsyncHome = Loadable({
    loader: () => import('../../pages/Home/Home' /* webpackChunkName: "Home" */),
    loading: Loading
});

const ShoppingBasket = Loadable({
    loader: () => import('../../pages/ShoppingBasket/ShoppingBasket'  /* webpackChunkName: "ShoppingBasket" */),
    loading: Loading
});

const AsyncDelivery = Loadable({
    loader: () => import('../../pages/DeliveryOrder/DeliveryOrder'   /* webpackChunkName: "AsyncDelivery" */),
    loading: Loading
});

const RenderRoutes = () => {
    return <Router>
      <Nav />
      <Loading />
      <ErrorNotification />
      <Switch >
      <Route path="/" component={AsyncHome} exact />
        <Route path="/ShoppingBasket" component={ShoppingBasket} />
        <Route path="/Delivery" component={AsyncDelivery} />
        <Route render={() => (
          <div style={{ margin: 'auto', width: '30%' }}>
          <Image style={{ width: 500, height: 150 }} src='/img/404.png' />
          </div> 
        )} />
      </Switch>
    </Router>
};

export default RenderRoutes;