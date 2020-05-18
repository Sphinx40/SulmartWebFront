import React from "react";
import Loadable from "react-loadable";
import Loading from "../Loading/Loading";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const AsyncHome = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/HomeScreen/HomeScreen" /* webpackChunkName: "AsyncHome" */
    ),
  loading: Loading,
});

const AsyncProducts = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/ProductsScreen/ProductsScreen" /* webpackChunkName: "AsyncProducts" */
    ),
  loading: Loading,
});

const AsyncBasket = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/BasketScreen/BasketScreen" /* webpackChunkName: "AsyncBasket" */
    ),
  loading: Loading,
});

const AsyncDelivery = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/DeliveryScreen/DeliveryScreen" /* webpackChunkName: "AsyncDelivery" */
    ),
  loading: Loading,
});

const AsyncOrders = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/OrdersScreen/OrdersScreen" /* webpackChunkName: "AsyncOrders" */
    ),
  loading: Loading,
});

const AsyncOrderDetails = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/OrderDetailsScreen/OrderDetailsScreen" /* webpackChunkName: "AsyncOrderDetails" */
    ),
  loading: Loading,
});

const AsyncAddressListScreen = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/Address/AddressListScreen" /* webpackChunkName: "AsyncAddressListScreen" */
    ),
  loading: Loading,
});

const AsyncSearchStreetScreen = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/Address/SearchStreetScreen" /* webpackChunkName: "AsyncSearchStreetScreen" */
    ),
  loading: Loading,
});

const AsyncNewAddressScreen = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/Address/NewAddressScreen" /* webpackChunkName: "AsyncNewAddressScreen" */
    ),
  loading: Loading,
});

const AsyncNewAddressScreenWithMap = Loadable({
  loader: () =>
    import(
      "../../mobile/Screens/Address/NewAddressScreenWithMap" /* webpackChunkName: "AsyncNewAddressScreenWithMap" */
    ),
  loading: Loading,
});

const mobileRoutes = () => {
  if (localStorage.getItem("selectedAddress")) {
    return (
      <Router basename="/customer/">
        <Route path="/addressList" component={AsyncAddressListScreen} />
        <Route path="/searchStreet" component={AsyncSearchStreetScreen} />
        <Route path="/newAddress" component={AsyncNewAddressScreen} />
        <Route
          path="/newAddressWithMap"
          component={AsyncNewAddressScreenWithMap}
        />
        <Route path="/" component={AsyncHome} exact />
        <Route
          path="/:categoryId/products"
          render={({ match }) => {
            const { categoryId } = match.params;
            return <AsyncProducts categoryId={categoryId} />;
          }}
        />
        <Route path="/basket" component={AsyncBasket} />
        <Route path="/delivery" component={AsyncDelivery} />
        <Route path="/orders" component={AsyncOrders} />
        <Route
          path="/orderDetails/:orderNumberRandom"
          render={({ match }) => {
            const { orderNumberRandom } = match.params;
            return <AsyncOrderDetails orderNumberRandom={orderNumberRandom} />;
          }}
        />
      </Router>
    );
  } else {
    history.push("/newAddress")
    return (
      <Router history={history}>
        <Route path="/newAddress" component={AsyncNewAddressScreen} exact />
        <Route path="/searchStreet" component={AsyncSearchStreetScreen} />
        <Route
          path="/newAddressWithMap"
          component={AsyncNewAddressScreenWithMap}
        />
      </Router>
    );
  }
};

export default mobileRoutes;
