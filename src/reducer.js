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

let initial = {
  menu: "",
  loading: false,
  error: "",
  categories: [],
  order: [],
  deliveryCost: 0,
  productsForSearch: []
};

const decrementFromOrder = (state, product, quantity) => {
  const idx = state.order.findIndex(({ _id }) => _id === product._id);
  let newState = JSON.parse(JSON.stringify(state));
  let newProduct = JSON.parse(JSON.stringify(product));

  if (idx>=0){
    if (quantity<1){ 
      //removing from array     
      newState.order = [...newState.order.slice(0,idx),...newState.order.slice(idx+1)]
    }else{
      newProduct ={...newProduct,quantity, totalPrice:newProduct.price*quantity};
      newState.order = [...newState.order.slice(0,idx),newProduct,...newState.order.slice(idx+1)]
    }
  };
  localStorage.setItem('order',JSON.stringify(newState.order))
  return newState;
};

const incrementToOrder = (state, product, quantity) => {
  const idx = state.order.findIndex(({ _id }) => _id === product._id);
  let newState = JSON.parse(JSON.stringify(state));
  let newProduct = JSON.parse(JSON.stringify(product));
  newProduct = {...newProduct,quantity, totalPrice:newProduct.price*quantity};

  if (idx>=0){
    newState.order = [...newState.order.slice(0,idx),newProduct,...newState.order.slice(idx+1)]
  }else{
    newState.order.push(newProduct)
  };
  localStorage.setItem('order',JSON.stringify(newState.order))
  return newState;
};


const reducer = (state = initial, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };

    case GET_PRODUCTS:
      return {
        ...state,
        productsForSearch: [...action.payload]
      };

    case CHANGE_MENU_TITLE:
      return {
        ...state,
        menu: action.payload,
      };

    case MODIFY_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    case PUSH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_DELIVERY:
      return {
        ...state,
        deliveryCost: action.payload,
      };

    case DECREMENT_FROM_ORDER:
      return decrementFromOrder(state, action.payload.product, action.payload.quantity);

    case INCREMENT_TO_ORDER:
      return incrementToOrder(state, action.payload.product, action.payload.quantity);

    case CLEAR_ORDER:
      return {
        ...state,
        order: []
      };
    
    case CHANGE_ORDER:
      return {
        ...state,
        order: [...action.payload]
      };

    default:
      return state;
  }
};

export default reducer;
