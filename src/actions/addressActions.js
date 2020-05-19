import { SET_MAP, SET_ADDRESS } from '../reducers/addressReducer';
import {
  splitByCommaAndReturnStreetName,
  splitByCommaAndReturnFirstName,
  uniqByKeepLast,
} from '../utils/addressMethods';

export const setMap = (payload) => {
  return {
    type: SET_MAP,
    payload,
  };
};

export const setAddress = (payload) => {
  return {
    type: SET_ADDRESS,
    payload,
  };
};

export const onGeocodeByText = (
  ymaps,
  street,
  house,
  setResult,
  setLoading,
  cityName
) => {
  if (!ymaps.geocode) return;

  setLoading(true);
  let result = {
    error: '',
    iconCaption: '',
  };
  // console.log(street, house, cityName);

  return (dispatch) => {
    if (house && street && house.length > 0 && street.length > 0) {
      let myGeocoder = ymaps.geocode(street + ', ' + house + ', ' + cityName);
      myGeocoder.then(
        (geoCoderResult) => {
          setLoading(false);
          let found = geoCoderResult.metaData.geocoder.found;

          if (found > 0) {
            let firstGeoObject = geoCoderResult.geoObjects.get(0);
            let coords = firstGeoObject.geometry.getCoordinates();
            let premiseNumber = firstGeoObject.getPremiseNumber();

            if (premiseNumber !== undefined) {
              dispatch({
                type: SET_ADDRESS,
                payload: {
                  house,
                  street,
                  latitude: coords[0],
                  longitude: coords[1],
                  correctAddress: true,
                },
              });
              result = {
                error: '',
                iconCaption: street + ' ' + house,
                correctAddress: true,
                latitude: coords[0],
                longitude: coords[1],
              };
              setResult(result);
            } else {
              dispatch({
                type: SET_ADDRESS,
                payload: {
                  house: '',
                  street: '',
                  latitude: '',
                  longitude: '',
                  correctAddress: false,
                },
              });
              result = {
                error: 'Адрес не найден',
                iconCaption: 'Адрес не найден',
                correctAddress: false,
              };
              setResult(result);
            }
          } else {
            dispatch({
              type: SET_ADDRESS,
              payload: {
                house: '',
                street: '',
                latitude: '',
                longitude: '',
                correctAddress: false,
              },
            });
            result = {
              error: 'Адрес не найден',
              iconCaption: 'Адрес не найден',
              correctAddress: false,
            };
            setResult(result);
          }
        },
        (err) => {
          dispatch({
            type: SET_ADDRESS,
            payload: {
              house: '',
              street: '',
              latitude: '',
              longitude: '',
              correctAddress: false,
            },
          });
          result = {
            error: 'Адрес не найден',
            iconCaption: 'Адрес не найден',
            correctAddress: false,
          };
          setResult(result);
          // error handling
        }
      );
    }
  };
};

// export const onGeocodeByText = (ymaps, cityName, street, house) => {
//   // console.log('findCoordsByStreetAndHouse', street, house);
//   if (!ymaps.geocode) return;
//   return dispatch => {
//     if (house && street && house.length > 0 && street.length > 0) {
//       ymaps.geocode(street + ' ' + house + ', ' + cityName).then(result => {
//         let coords = result.geoObjects.get(0).geometry.getCoordinates();

//         if (!(coords[0] === 43.238293 && coords[1] === 76.945465)) {
//           // console.log('ddd');

//           dispatch({
//             // type: FIND_COORDS_BY_STREET_AND_HOUSE,
//             // payload: {
//             //   placeMarkProperties: {
//             //     iconCaption: street + ' ' + house
//             //   },
//             //   placeMarkCoords: coords,
//             //   mapCenter: coords,
//             //   zoom: 16
//             // }
//           });
//         } else {
//           dispatch({
//             // type: FIND_COORDS_BY_STREET_AND_HOUSE,
//             // payload: {
//             //   placeMarkProperties: {
//             //     iconCaption: ''
//             //   }
//             // }
//           });
//         }
//       });
//     } else {
//       dispatch({
//         // type: FIND_COORDS_BY_STREET_AND_HOUSE,
//         // payload: {
//         //   placeMarkProperties: {
//         //     iconCaption: ''
//         //   }
//         // }
//       });
//     }
//   };
// };

export const onGeocodeByCoords = (
  ymaps,
  coords,
  setResult,
  setLoading,
  cityName
) => {
  setLoading(true);
  let result = {
    error: '',
    iconCaption: '',
  };
  return (dispatch) => {
    let myGeocoder = ymaps.geocode(coords);
    myGeocoder.then(
      (geoCoderResult) => {
        setLoading(false);

        let found = geoCoderResult.metaData.geocoder.found;
        // console.log(found, 'found');
        if (found > 0) {
          let firstGeoObject = geoCoderResult.geoObjects.get(0);
          let streetTemp = '';
          let adminAreas = firstGeoObject.getAdministrativeAreas();
          if (
            adminAreas === null ||
            adminAreas.length !== 1 ||
            adminAreas[0] !== cityName
          ) {
            result = {
              address: {
                house: '',
                street: '',
                latitude: '',
                longitude: '',
                correctAddress: false,
              },
              error: 'Доставка только по городу Алматы!!!',
              iconCaption: 'Доставка только по городу Алматы!!!',
              correctAddress: false,
            };
            setResult(result);
            return;
          }

          streetTemp = splitByCommaAndReturnStreetName(
            firstGeoObject.getAddressLine()
          );

          let premiseNumber = firstGeoObject.getPremiseNumber();

          if (premiseNumber !== undefined) {
            if (
              streetTemp === null ||
              streetTemp === '' ||
              streetTemp.length === 0
            ) {
              dispatch({
                type: SET_ADDRESS,
                payload: {
                  house: '',
                  street: '',
                  latitude: '',
                  longitude: '',
                  correctAddress: false,
                },
              });
              result = {
                error: 'Адрес не найден',
                iconCaption: 'Адрес не найден',
                correctAddress: false,
              };
              setResult(result);
              return;
            } else {
              dispatch({
                type: SET_ADDRESS,
                payload: {
                  house: premiseNumber,
                  street: streetTemp,
                  latitude: coords[0],
                  longitude: coords[1],
                  correctAddress: true,
                },
              });

              result = {
                error: '',
                iconCaption: streetTemp + ' ' + premiseNumber,
                correctAddress: false,
              };
              setResult(result);
              return;
            }
          } else {
            dispatch({
              type: SET_ADDRESS,
              payload: {
                house: '',
                street: '',
                latitude: '',
                longitude: '',
                correctAddress: false,
              },
            });
            result = {
              error: 'Адрес не найден',
              iconCaption: 'Адрес не найден',
              correctAddress: false,
            };
            setResult(result);
          }
        } else {
          dispatch({
            type: SET_ADDRESS,
            payload: {
              house: '',
              street: '',
              latitude: '',
              longitude: '',
              correctAddress: false,
            },
          });
          result = {
            error: 'Адрес не найден',
            iconCaption: 'Адрес не найден',
            correctAddress: false,
          };
          setResult(result);
        }
      },
      (err) => {
        dispatch({
          type: SET_ADDRESS,
          payload: {
            house: '',
            street: '',
            latitude: '',
            longitude: '',
            correctAddress: false,
          },
        });
        result = {
          error: 'Адрес не найден',
          iconCaption: 'Адрес не найден',
          correctAddress: false,
        };
        setResult(result);
        // error handling
      }
    );
  };
};

export const onSuggest = (ymaps, text, setLoading, cityName, setResult) => {
  setLoading(true);
  return (dispatch) => {
    ymaps.ready(() => {
      ymaps.suggest(cityName + ', ' + text).then((items) => {
        setLoading(false);
        let arrayOfDisplayNames = items.map((item) => {
          return {
            text: splitByCommaAndReturnFirstName(item.displayName),
          };
        });
        arrayOfDisplayNames = uniqByKeepLast(
          arrayOfDisplayNames,
          (item) => item.text
        );
        setResult(arrayOfDisplayNames);
      });
    });
  };
};
