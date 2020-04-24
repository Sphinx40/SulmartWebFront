import {
  GET_CATEGORIES,
  CHANGE_MENU_TITLE,
  MODIFY_LOADER,
  PUSH_ERROR,
  CHANGE_DELIVERY,
  DECREMENT_FROM_ORDER,
  INCREMENT_TO_ORDER,
  GET_PRODUCTS,
  CLEAR_ORDER,
  CHANGE_ORDER,
  DELETE_FROM_ORDER,
  CHANGE_ADDRESSES,
  ADD_ADDRESS,
  CHANGE_ORDERS
} from './types';

import { doGet, doPost } from '../utils/axiosActions';
const HEROKU_URI = 'https://helix40.herokuapp.com/';

export const modifyLoader = boolean => {
  return {
    type: MODIFY_LOADER,
    payload: boolean
  };
};

export const changeMenu = title => {
  return {
    type: CHANGE_MENU_TITLE,
    payload: title
  };
};

export const errorhandler = error => {
  if (typeof error === 'string') {
    return {
      type: PUSH_ERROR,
      payload: error
    };
  } else {
    return {
      type: PUSH_ERROR,
      payload: error.response.data.error
    };
  }
};

export const getCategories = () => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(HEROKU_URI + `categories`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_CATEGORIES,
          payload: data.data
        });
      })
      .catch(err => {
        dispatch(modifyLoader(false));
        dispatch(errorhandler(err));
      });
  };
};

export const getProducts = () => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(HEROKU_URI + `products`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_PRODUCTS,
          payload: data.data
        });
      })
      .catch(err => {
        dispatch(modifyLoader(false));
        dispatch(errorhandler(err));
      });
  };
};

export const changeDelivery = number => {
  return {
    type: CHANGE_DELIVERY,
    payload: number
  };
};

export const incrementToOrder = (product, quantity) => {
  return {
    type: INCREMENT_TO_ORDER,
    payload: { product, quantity }
  };
};

export const decrementFromOrder = (product, quantity) => {
  return {
    type: DECREMENT_FROM_ORDER,
    payload: { product, quantity }
  };
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};

export const changeOrder = order => {
  return {
    type: CHANGE_ORDER,
    payload: order
  };
};

export const deleteFromOrder = idx => {
  return {
    type: DELETE_FROM_ORDER,
    payload: idx
  };
};

export const changeAddresses = (addresses) => {
  return {
    type: CHANGE_ADDRESSES,
    payload: addresses
  };
};

export const addToAddresses = (address) => {
  return {
    type: ADD_ADDRESS,
    payload: address
  };
};

export const createOrder = (userLocation,myOrders) => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doPost(HEROKU_URI + `order`, userLocation)
      .then(({data}) => {
        dispatch(modifyLoader(false));
        console.log(data)
        const newState = [...myOrders, {...data}];
        localStorage.setItem('myOrders',newState)
      })
      .catch(err => {
        dispatch(modifyLoader(false));
        dispatch(errorhandler(err));
      });
  };
};

export const changeOrders = (orders) => {
  return {
    type: CHANGE_ORDERS,
    payload: orders
  };
};