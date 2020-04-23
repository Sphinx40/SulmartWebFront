import {
    GET_ACTION
} from "../actions/types";

let initial = {
  function: {},
};

const ZmapReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ACTION:
      return {
          function: action.payload
      }

    default:
      return state;
  }
};

export default ZmapReducer;
