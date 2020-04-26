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
    CHANGE_MY_ORDERS,
    GET_POPULAR,
    CHANGE_CLICKED_POPULAR_PRODUCT
  } from "../actions/types";
  
  let initial = {
    menu: "",
    loading: false,
    error: "",
    categories: [],
    order: [],
    deliveryCost: 0,
    productsForSearch: [],
    addresses: [],
    myOrders: [],
    deliveryDate: "",
    popular: [],
    clickedPopularProduct: {}
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
    return newState;
  };
  
  const deleteFromOrder = (state, idx) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.order = [...newState.order.slice(0,idx),...newState.order.slice(idx+1)];
    return newState;
  };

  const addNewAddress = (state,address) => {
    let newState = JSON.parse(JSON.stringify(state));
    const idx = newState.addresses.findIndex((item) => item.longitude === address.longitude && item.latitude === address.latitude); 
    if (idx < 0) {
      newState.addresses = [...newState.addresses,address];
      localStorage.setItem('addresses', JSON.stringify(newState.addresses));
    };
    return newState;
  };
  
  const MainReducer = (state = initial, action) => {
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
  
      case DELETE_FROM_ORDER:
        return deleteFromOrder(state,action.payload);
  
      case CHANGE_ADDRESSES:
        return {
          ...state,
          addresses: [...action.payload]
        };

      case ADD_ADDRESS:
        return addNewAddress(state,action.payload);

      case CHANGE_MY_ORDERS:
        return {
          ...state,
          myOrders: [...action.payload]
        };

      case GET_POPULAR:
        return {
          ...state,
          popular: [...action.payload]
        };

      case CHANGE_CLICKED_POPULAR_PRODUCT:
        return {
          ...state,
          clickedPopularProduct: { ...action.payload }
        };

      default:
        return state;
    }
  };
  
  export default MainReducer;
  