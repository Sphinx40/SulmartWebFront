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
  CHANGE_ORDER
} from "./types";

import { doGet } from "./utils/apiActions";

export const modifyLoader = (boolean) => {
  return {
    type: MODIFY_LOADER,
    payload: boolean,
  };
};

export const changeMenu = (title) => {
  return {
    type: CHANGE_MENU_TITLE,
    payload: title,
  };
};

export const errorhandler = (error) => {
  if (typeof error === "string") {
    return {
      type: PUSH_ERROR,
      payload: error,
    };
  } else {
    return {
      type: PUSH_ERROR,
      payload: error.response.data.error,
    };
  }
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch(modifyLoader(true));
    doGet(`categories`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_CATEGORIES,
          payload: data.data,
        });
      })
      .catch((err) => {
        dispatch(modifyLoader(false));
        dispatch(errorhandler(err));
      });
  };
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch(modifyLoader(true));
    doGet(`products`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_PRODUCTS,
          payload: data.data,
        });
      })
      .catch((err) => {
        dispatch(modifyLoader(false));
        dispatch(errorhandler(err));
      });
  };
};

export const changeDelivery = (number) => {
  return {
    type: CHANGE_DELIVERY,
    payload: number,
  };
};

export const incrementToOrder = (product, quantity) => {
    return {
        type: INCREMENT_TO_ORDER,
        payload: {product,quantity}
    };
};

export const decrementFromOrder = (product, quantity) => {
    return {
        type: DECREMENT_FROM_ORDER,
        payload: {product,quantity}
    };
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};

export const changeOrder = (order) => {
  return {
    type: CHANGE_ORDER,
    payload: order
  };
}