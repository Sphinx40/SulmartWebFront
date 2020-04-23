export const SET_PLACEMARKCOORDS = 'SET_PLACEMARKCOORDS';
export const SET_PLACEMARKPROPERTIES = 'SET_PLACEMARKPROPERTIES';
export const SET_MAPCENTER = 'SET_MAPCENTER';
export const SET_YMAPS = 'SET_YMAPS';
export const FIND_COORDS_BY_STREET_AND_HOUSE =
  'FIND_COORDS_BY_STREET_AND_HOUSE';

let initial = {
  city: {
    coords: [43.24946867986241, 76.91736506700802],
    name: 'Алматы'
  },
  placeMarkCoords: [],
  placeMarkProperties: {},
  mapCenter: [],
  ymaps: {}
};

const ZmapReducer = (state = initial, action) => {
  switch (action.type) {
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
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ZmapReducer;
