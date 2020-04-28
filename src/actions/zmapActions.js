import {
  SET_PLACEMARKCOORDS,
  SET_PLACEMARKPROPERTIES,
  SET_MAPCENTER,
  SET_YMAPS,
  FIND_COORDS_BY_STREET_AND_HOUSE,
  SET_ANY_OBJECT,
  SET_MAP_IS_LOADING
} from '../reducers/ZmapReducer';

export const setPlaceMarkCoords = payload => {
  return {
    type: SET_PLACEMARKCOORDS,
    payload
  };
};

export const setPlaceMarkProperties = payload => {
  return {
    type: SET_PLACEMARKPROPERTIES,
    payload
  };
};

export const setMapCenter = payload => {
  return {
    type: SET_MAPCENTER,
    payload
  };
};

export const setYmaps = payload => {
  return {
    type: SET_YMAPS,
    payload
  };
};

export const setAnyObjectZmapReducer = payload => {
  // console.log(payload, 'payload');
  return {
    type: SET_ANY_OBJECT,
    payload
  };
};

export const setMapIsLoading = payload => {
  // console.log(payload, 'payload');
  return {
    type: SET_MAP_IS_LOADING,
    payload
  };
};

export const findCoordsByStreetAndHouse = (street, house, cityName, ymaps) => {
  // console.log('findCoordsByStreetAndHouse', street, house);
  if (!ymaps.geocode) return;
  return dispatch => {
    if (house && street && house.length > 0 && street.length > 0) {
      ymaps.geocode(street + ' ' + house + ', ' + cityName).then(result => {
        let coords = result.geoObjects.get(0).geometry.getCoordinates();

        if (!(coords[0] === 43.238293 && coords[1] === 76.945465)) {
          // console.log('ddd');
          dispatch({
            type: FIND_COORDS_BY_STREET_AND_HOUSE,
            payload: {
              placeMarkProperties: {
                iconCaption: street + ' ' + house
              },
              placeMarkCoords: coords,
              mapCenter: coords,
              zoom: 16
            }
          });
        } else {
          dispatch({
            type: FIND_COORDS_BY_STREET_AND_HOUSE,
            payload: {
              placeMarkProperties: {
                iconCaption: ''
              }
            }
          });
        }
      });
    } else {
      dispatch({
        type: FIND_COORDS_BY_STREET_AND_HOUSE,
        payload: {
          placeMarkProperties: {
            iconCaption: ''
          }
        }
      });
    }
  };
};
