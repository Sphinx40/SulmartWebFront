import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import Nav from '../Nav/Nav';
import ErrorNotification from '../../utils/ErrorNotification';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AsyncHome = Loadable({
  loader: () =>
    import('../../pages/Home/Home' /* webpackChunkName: "AsyncHome" */),
  loading: Loading
});

const AsyncShoppingBasket = Loadable({
  loader: () =>
    import(
      '../../pages/ShoppingBasket/ShoppingBasket' /* webpackChunkName: "AsyncShoppingBasket" */
    ),
  loading: Loading
});

const AsyncDelivery = Loadable({
  loader: () =>
    import(
      '../../pages/DeliveryOrder/DeliveryOrder' /* webpackChunkName: "AsyncDelivery" */
    ),
  loading: Loading
});

const AsyncMyOrders = Loadable({
  loader: () =>
    import(
      '../../pages/MyOrders/MyOrders' /* webpackChunkName: "AsyncMyOrders" */
    ),
  loading: Loading
});

const AsyncSuccessBasket = Loadable({
  loader: () =>
    import(
      '../../pages/SuccessBasket/SuccessBasket' /* webpackChunkName: "AsyncSuccessBasket" */
    ),
  loading: Loading
});

const RenderRoutes = () => {
  return (
    <Router basename='/customer' history={history}>
      <Nav />
      <Loading />
      <ErrorNotification />
      <Switch>
        <Route path='/' component={AsyncHome} exact />

        <Route path='/shoppingBasket' component={AsyncShoppingBasket} />
        <Route path='/delivery' component={AsyncDelivery} />
        <Route path='/myOrders' component={AsyncMyOrders} />
        <Route path='/successBasket' component={AsyncSuccessBasket} />

        <Route
          render={() => (
            <div style={{ margin: 'auto', width: '30%' }}>
              <Image style={{ width: 500, height: 150 }} src='/img/404.png' />
            </div>
          )}
        />
      </Switch>
    </Router>
  );
};

export default RenderRoutes;
