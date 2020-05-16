import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AsyncHome = Loadable({
  loader: () =>
    import(
      '../Screens/HomeScreen/HomeScreen' /* webpackChunkName: "AsyncHome" */
    ),
  loading: Loading,
});

const AsyncAddressListScreen = Loadable({
  loader: () =>
    import(
      '../Screens/Address/AddressListScreen' /* webpackChunkName: "AsyncAddressListScreen" */
    ),
  loading: Loading,
});

const AsyncSearchStreetScreen = Loadable({
  loader: () =>
    import(
      '../Screens/Address/SearchStreetScreen' /* webpackChunkName: "AsyncSearchStreetScreen" */
    ),
  loading: Loading,
});

const AsyncNewAddressScreen = Loadable({
  loader: () =>
    import(
      '../Screens/Address/NewAddressScreen' /* webpackChunkName: "AsyncNewAddressScreen" */
    ),
  loading: Loading,
});

const AsyncNewAddressScreenWithMap = Loadable({
  loader: () =>
    import(
      '../Screens/Address/NewAddressScreenWithMap' /* webpackChunkName: "AsyncNewAddressScreenWithMap" */
    ),
  loading: Loading,
});

const App = () => {
  return (
    <Router basename='/customer' history={history}>
      <Route path='/' component={AsyncHome} exact />
      <Route path='/addressList' component={AsyncAddressListScreen} exact />
      <Route path='/searchStreet' component={AsyncSearchStreetScreen} exact />
      <Route path='/newAddress' component={AsyncNewAddressScreen} exact />
      <Route
        path='/newAddressWithMap'
        component={AsyncNewAddressScreenWithMap}
        exact
      />

      {/* <Route path='/basket' component={AsyncBasket} /> */}
    </Router>
  );
};

export default App;
