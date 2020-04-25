export const SET_PLACEMARKCOORDS = 'SET_PLACEMARKCOORDS';
export const SET_PLACEMARKPROPERTIES = 'SET_PLACEMARKPROPERTIES';
export const SET_MAPCENTER = 'SET_MAPCENTER';
export const SET_YMAPS = 'SET_YMAPS';
export const FIND_COORDS_BY_STREET_AND_HOUSE =
  'FIND_COORDS_BY_STREET_AND_HOUSE';
export const SET_ANY_OBJECT = 'SET_ANY_OBJECT';

let initial = {
  city: {
    coords: [43.24946867986241, 76.91736506700802],
    name: 'Алматы'
  },
  market: {
    coords: [43.231612405843514, 76.76930712938592],
    name: 'Altyn Orda'
  },
  placeMarkCoords: undefined,
  placeMarkProperties: {},
  mapCenter: [],
  ymaps: {},
  zoom: 12,
  deliveryPrice: 0
};

const ZmapReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_ANY_OBJECT:
      // console.log(action.payload, 'action.payload');
      return {
        ...state,
        ...action.payload
      };

    case SET_PLACEMARKCOORDS:
      return {
        ...state,
        placeMarkCoords: [...action.payload]
      };

    case SET_PLACEMARKPROPERTIES:
      let placeMarkPropertiesTemp = JSON.parse(JSON.stringify(action.payload));
      return {
        ...state,
        placeMarkProperties: placeMarkPropertiesTemp
      };

    case SET_MAPCENTER:
      return {
        ...state,
        mapCenter: [...action.payload]
      };

    case SET_YMAPS:
      return {
        ...state,
        ymaps: action.payload
      };

    case FIND_COORDS_BY_STREET_AND_HOUSE:
      // console.log(action.payload, '...action.payload');

      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ZmapReducer;
