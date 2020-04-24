import React, { useState, useEffect } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl
} from 'react-yandex-maps';

import {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setYmaps,
  setAnyObjectZmapReducer
} from '../../actions/zmapActions';

import { splitByCommaAndReturnStreetName } from '../../utils/zmapMethods';
import { connect } from 'react-redux';
const Zmap = props => {
  //from DeliveryOrder
  const {
    // setMapWidth,
    // setMapHeight,
    // setLongitude,
    // setLatitude,
    setStreet,
    setHouse
  } = props;
  const {
    mapWidth,
    mapHeight
    // , longitude, latitude, street, house
  } = props;

  //from Reducer and Actions
  const {
    setPlaceMarkCoords,
    setPlaceMarkProperties,
    setMapCenter,
    setYmaps,
    setAnyObjectZmapReducer
  } = props;
  const {
    city,
    placeMarkCoords,
    placeMarkProperties,
    mapCenter,
    ymaps,
    zoom
  } = props;
  useEffect(() => {
    setAnyObjectZmapReducer({
      placeMarkCoords: city.coords,
      mapCenter: city.coords
    });
    //eslint-disable-next-line
  }, []);

  const loadYmaps = ymaps => {
    setYmaps(ymaps);
    let suggestView = new ymaps.SuggestView('suggest', {
      provider: {
        suggest: (request, options) => {
          return ymaps.suggest(city.name + ', ' + request);
        }
      }
    });

    suggestView.events.add('select', e => {
      let streetName = splitByCommaAndReturnStreetName(
        e.get('item').displayName
      );

      setStreet(streetName);
      if (streetName && streetName.length > 0) {
        ymaps.geocode(city.name + ', ' + streetName).then(result => {
          let coords = result.geoObjects.get(0).geometry.getCoordinates();
          setAnyObjectZmapReducer({
            placeMarkProperties: {
              iconCaption: streetName
            },
            placeMarkCoords: coords,
            mapCenter: coords
            // zoom: 16
          });
        });
      }
    });
  };

  const getStreetNameByCoords = coords => {
    if (!ymaps.geocode) return;
    setStreet('');
    setHouse('');
    setAnyObjectZmapReducer({
      placeMarkProperties: {
        iconCaption: '...searching'
      },
      placeMarkCoords: coords
    });

    ymaps
      .geocode(coords)
      .then(res => {
        let firstGeoObject = res.geoObjects.get(0);

        let iconCaptionText = '';
        let houseTemp = '';
        let streetTemp = '';

        streetTemp = splitByCommaAndReturnStreetName(
          firstGeoObject.getAddressLine()
        );

        if (firstGeoObject.getPremiseNumber()) {
          houseTemp = firstGeoObject.getPremiseNumber();
        }

        iconCaptionText = streetTemp + ' ' + houseTemp;
        setAnyObjectZmapReducer({
          placeMarkProperties: {
            iconCaption: iconCaptionText
          }
          // zoom: 16
        });
        if (
          streetTemp === null ||
          streetTemp === '' ||
          streetTemp.length === 0
        ) {
          return;
        } else {
          // returnObj = { found: true, streetTemp, houseTemp };
          setStreet(streetTemp);
          setHouse(houseTemp);
          return;
        }
      })
      .catch(err => {
        return;
      });
  };

  return (
    <YMaps
      query={{ lang: 'ru_RU', apikey: '2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6' }}
    >
      <div id='map-basics'>
        <Map
          state={{ center: mapCenter, zoom, controls: [] }}
          width={mapWidth}
          height={mapHeight}
          draggable={true}
          modules={['SuggestView', 'suggest', 'geocode']}
          onLoad={ymaps => loadYmaps(ymaps)}
          onClick={e => {
            getStreetNameByCoords([...e.get('coords')]);
          }}
        >
          {/* <TrafficControl options={{ float: 'right' }} /> */}
          <GeolocationControl options={{ float: 'left' }} />

          <ZoomControl options={{ float: 'right' }} />
          <Placemark
            geometry={placeMarkCoords}
            properties={placeMarkProperties}
            options={{ draggable: true }}
            // geometry={[...coords]}
            onClick={e => {
              getStreetNameByCoords([
                ...e.get('target').geometry.getCoordinates()
              ]);
            }}
            // onDragStart={e => console.log(e, 'onDragStart')}
            onDragEnd={e => {
              getStreetNameByCoords([
                ...e.get('target').geometry.getCoordinates()
              ]);
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

//2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6
//https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&format=json&geocode=Қазақстан, Алматы, Алатау ауданы, Шаңырақ-2 шағын ауданы, Сырым батыр көшесі&lang=en-US
// https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=76.85231,43.3077
// latitude:43.223790
// longitude:76.842540

const mapStateToProps = state => {
  // console.log(state.Zmap.placeMarkCoords,'placeMarkCoords')
  return {
    city: state.Zmap.city,
    placeMarkCoords: state.Zmap.placeMarkCoords,
    placeMarkProperties: state.Zmap.placeMarkProperties,
    mapCenter: state.Zmap.mapCenter,
    ymaps: state.Zmap.ymaps,
    zoom: state.Zmap.zoom
  };
};

export default connect(mapStateToProps, {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setYmaps,
  setAnyObjectZmapReducer
})(Zmap);

// const geocode = ymaps => {
//   console.log(ymaps, 'ymaps');
//   ymaps.geocode('Мытищи').then(result => {
//     console.log(
//       result.geoObjects.get(0).geometry.getCoordinates(),
//       'result.geoObjects.get(0).geometry.getCoordinates()'
//     );
//   });
// };

// const getGeoLocation = ymaps => {
//   return ymaps.geolocation
//     .get({ provider: 'yandex', mapStateAutoApply: true })
//     .then(result =>
//       ymaps.geocode(result.geoObjects.position).then(res => {
//         let firstGeoObject = res.geoObjects.get(0);
//         console.log(
//           firstGeoObject.getLocalities().length
//             ? firstGeoObject.getLocalities()
//             : firstGeoObject.getAdministrativeAreas()
//         );
//       })
//     );
// };

// const handleApiAvaliable = ymaps => {
//   const geolocation = getGeoLocation(ymaps);
//   console.log('object');
//   console.log(geolocation, 'geolocation');
// };
// const getCoordByStreetNameAndHouse = (street,house) => {
//   // console.log(ymaps, 'ymaps');
//   if (!ymaps.geocode) return;

//   if (house && street && house.length > 0 && street.length > 0) {
//     ymaps
//       .geocode(streetName + ' ' + house + ', ' + city.name)
//       .then(result => {
//         // ymaps.geocode(streetName).then(result => {
//         let coords = result.geoObjects.get(0).geometry.getCoordinates();
//         // console.log(coords, 'getCoordByStreetNameAndHouse');

//         if (!(coords[0] === 43.238293 && coords[1] === 76.945465)) {
//           setPlaceMarkProperties({
//             iconCaption: street + ' ' + house
//           });
//           setMapCenter(coords);
//           setPlaceMarkCoords(coords);
//           setLatitude(coords[0]);
//           setLongitude(coords[1]);
//         }
//       });
//   }
// };
