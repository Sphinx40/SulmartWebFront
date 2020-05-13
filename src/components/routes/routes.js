import React from "react";
import Loadable from "react-loadable";
import Loading from "../Loading/Loading";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Image } from "semantic-ui-react";
import Nav from "../Nav/Nav";
import ErrorNotification from "../../utils/ErrorNotification";
import { createBrowserHistory } from "history";
import Footer from "../Footer/Footer";
import Mobile from "../../mobile/App/App";

const history = createBrowserHistory();

const AsyncHome = Loadable({
  loader: () =>
    import("../../pages/Home/Home" /* webpackChunkName: "AsyncHome" */),
  loading: Loading,
});

const AsyncBasket = Loadable({
  loader: () =>
    import("../../pages/Basket/Basket" /* webpackChunkName: "AsyncBasket" */),
  loading: Loading,
});

const AsyncСategoriesMenu = Loadable({
  loader: () =>
    import(
      "../../pages/CategoriesMenu/CategoriesMenu" /* webpackChunkName: "AsyncСategoriesMenu" */
    ),
  loading: Loading,
});

const AsyncDelivery = Loadable({
  loader: () =>
    import(
      "../../pages/DeliveryOrder/DeliveryOrder" /* webpackChunkName: "AsyncDelivery" */
    ),
  loading: Loading,
});

const AsyncOrders = Loadable({
  loader: () =>
    import("../../pages/Orders/Orders" /* webpackChunkName: "AsyncOrders" */),
  loading: Loading,
});

const AsyncSuccessBasket = Loadable({
  loader: () =>
    import(
      "../../pages/SuccessBasket/SuccessBasket" /* webpackChunkName: "AsyncSuccessBasket" */
    ),
  loading: Loading,
});

const RenderRoutes = () => {
  if (window.innerWidth <= 500) {
    return <Mobile />;
  }
  return (
    <Router basename="/customer" history={history}>
      <Nav />
      <Loading />
      <ErrorNotification />
      <Switch>
        <Route path="/" component={AsyncHome} exact />

        <Route path="/basket" component={AsyncBasket} />
        <Route path="/delivery" component={AsyncDelivery} />
        <Route path="/orders" component={AsyncOrders} />
        <Route path="/successBasket" component={AsyncSuccessBasket} />
        <Route path="/products" component={AsyncСategoriesMenu} />

        <Route
          render={() => (
            <div style={{ margin: "auto", width: "30%" }}>
              <Image style={{ width: 500, height: 150 }} src="/img/404.png" />
            </div>
          )}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default RenderRoutes;
