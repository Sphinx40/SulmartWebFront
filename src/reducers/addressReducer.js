export const SET_MAP = 'SET_MAP';
export const SET_ADDRESS = 'SET_ADDRESS';

let initial = {
  city: {
    coords: [43.24946867986241, 76.91736506700802],
    name: 'Алматы'
  },
  market: {
    coords: [43.231612405843514, 76.76930712938592],
    name: 'Altyn Orda'
  },
  map: {
    ymaps: {},
    center: [],
    zoom: 12,
    height: 300,
    width: 300
  },

  address: {
    correctAddress: false,
    house: '',
    street: '',
    latitude: '',
    longitude: '',
    deliveryPrice: 0
  }
};

const AddressReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        map: { ...state.map, ...action.payload }
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: { ...state.address, ...action.payload }
      };
    default:
      return state;
  }
};

export default AddressReducer;
