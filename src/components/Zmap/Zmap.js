import React, { useState, useEffect, Fragment } from 'react';

import { Segment, Loader, Dimmer, Image } from 'semantic-ui-react';
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from 'react-yandex-maps';

import {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setYmaps,
  setAnyObjectZmapReducer,
  setMapIsLoading
} from '../../actions/zmapActions';

import { splitByCommaAndReturnStreetName } from '../../utils/zmapMethods';
import { connect } from 'react-redux';
const Zmap = (props) => {
  //from DeliveryOrder
  const {
    // setMapWidth,
    // setMapHeight,
    // setLongitude,
    // setLatitude,
    setStreet,
    setHouse,
  } = props;
  const {
    mapWidth,
    mapHeight,
    // , longitude, latitude, street, house
  } = props;

  //from Reducer and Actions
  const {
    setPlaceMarkCoords,
    setPlaceMarkProperties,
    setMapCenter,
    setYmaps,
    setAnyObjectZmapReducer,
    setMapIsLoading
  } = props;
  const {
    city,
    placeMarkCoords = city.coords,
    placeMarkProperties,
    mapCenter,
    ymaps,
    zoom,
    mapIsLoading
  } = props;
  useEffect(() => {
    setAnyObjectZmapReducer({
      // placeMarkCoords: city.coords,
      mapCenter: city.coords,
    });
    //eslint-disable-next-line
  }, []);

  // const [mapIsLoading, setMapIsLoading] = useState(true);
  // console.log(placeMarkCoords);

  const loadYmaps = (ymaps) => {
    setYmaps(ymaps);
    setMapIsLoading(false);
    let suggestView = new ymaps.SuggestView('suggest', {
      provider: {
        suggest: (request, options) => {
          return (suggestView.state.get('open')
            ? ymaps.suggest(city.name + ', ' + request)
            : ymaps.vow.resolve([])
          ).then(function (res) {
            suggestView.events.fire('requestsuccess', {
              target: suggestView,
            });

            return res;
          });

          // return ymaps.suggest(city.name + ', ' + request);
        },
      },
    });

    // Изначально разрешаем саджесту открываться
    suggestView.state.set('open', true);

    suggestView.events.add('select', (e) => {
      let streetName = splitByCommaAndReturnStreetName(
        e.get('item').displayName
      );

      setStreet(streetName);
      setHouse('');
      if (streetName && streetName.length > 0) {
        ymaps.geocode(city.name + ', ' + streetName).then((result) => {
          let firstGeoObject = result.geoObjects.get(0);

          let adminAreas = firstGeoObject.getAdministrativeAreas();
          // console.log(adminAreas, 'AdminAreas');
          if (
            adminAreas === null ||
            adminAreas.length !== 1 ||
            adminAreas[0] !== 'Алматы'
          ) {
            setAnyObjectZmapReducer({
              placeMarkProperties: {
                iconCaption: 'Доставка только по городу Алматы!!!',
              },
              // zoom: 12
            });
            setStreet('');
            setHouse('');
          } else {
            let coords = firstGeoObject.geometry.getCoordinates();
            setAnyObjectZmapReducer({
              placeMarkProperties: {
                iconCaption: streetName,
              },
              placeMarkCoords: coords,
              mapCenter: coords,
              // zoom: 12
            });
          }
        });
      }

      suggestView.state.set({ open: false });
      suggestView.events.once('requestsuccess', function () {
        suggestView.state.set('open', true);
      });

      // suggestView.events.once('requestsuccess', function() {
      //   suggestView.state.set('open', true);
      // });
    });
  };

  const getStreetNameByCoords = (coords) => {
    if (!ymaps.geocode) return;
    setStreet('');
    setHouse('');
    setAnyObjectZmapReducer({
      placeMarkProperties: {
        iconCaption: '...searching',
      },
      placeMarkCoords: coords,
    });
    // console.log(coords,'coords')
    ymaps
      .geocode(coords)
      .then((res) => {
        let firstGeoObject = res.geoObjects.get(0);

        let iconCaptionText = '';
        let houseTemp = '';
        let streetTemp = '';

        let adminAreas = firstGeoObject.getAdministrativeAreas();
        if (
          adminAreas === null ||
          adminAreas.length !== 1 ||
          adminAreas[0] !== 'Алматы'
        ) {
          setAnyObjectZmapReducer({
            placeMarkProperties: {
              iconCaption: 'Доставка только по городу Алматы!!!',
            },
            // zoom: 12
          });
          setStreet('');
          setHouse('');
          return;
        }

        streetTemp = splitByCommaAndReturnStreetName(
          firstGeoObject.getAddressLine()
        );

        if (firstGeoObject.getPremiseNumber()) {
          houseTemp = firstGeoObject.getPremiseNumber();
        }

        iconCaptionText = streetTemp + ' ' + houseTemp;
        setAnyObjectZmapReducer({
          placeMarkProperties: {
            iconCaption: iconCaptionText,
          },
          // zoom: 12
        });

        // console.log(
        //   'firstGeoObject.getAddressLine()',
        //   firstGeoObject.getAddressLine(),
        //   firstGeoObject
        // );
        if (
          streetTemp === null ||
          streetTemp === '' ||
          streetTemp.length === 0
        ) {
          setStreet('');
          setHouse('');
          return;
        } else {
          // returnObj = { found: true, streetTemp, houseTemp };
          setStreet(streetTemp);
          setHouse(houseTemp);
          return;
        }
      })
      .catch((err) => {
        setStreet('');
        setHouse('');
        return;
      });
  };

  return (
    <Fragment>
      {mapIsLoading ? (
        <Segment style={{ width: mapWidth, height: mapHeight }}>
          <Dimmer active inverted>
            <Loader inverted></Loader>
          </Dimmer>

          <Image
            style={{ width: mapWidth, height: mapHeight - 15 }}
            src='/img/mapWhenLoading.png'
          />
        </Segment>
      ) : (
        ''
      )}
      <YMaps
        query={{
          lang: 'ru_RU',
          apikey: '2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6',
        }}
      >
        <div id='map-basics'>
          <Map
            state={{ center: mapCenter, zoom, controls: [] }}
            width={mapWidth}
            height={mapHeight}
            draggable={true}
            modules={['SuggestView', 'suggest', 'geocode']}
            onLoad={(ymaps) => loadYmaps(ymaps)}
            onClick={(e) => {
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
              onClick={(e) => {
                getStreetNameByCoords([
                  ...e.get('target').geometry.getCoordinates(),
                ]);
              }}
              // onDragStart={e => console.log(e, 'onDragStart')}
              onDragEnd={(e) => {
                getStreetNameByCoords([
                  ...e.get('target').geometry.getCoordinates(),
                ]);
              }}
            />
          </Map>
        </div>
      </YMaps>
    </Fragment>
  );
};

//2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6
//https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&format=json&geocode=Қазақстан, Алматы, Алатау ауданы, Шаңырақ-2 шағын ауданы, Сырым батыр көшесі&lang=en-US
// https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=76.85231,43.3077
// latitude:43.223790
// longitude:76.842540

const mapStateToProps = (state) => {
  // console.log(state.Zmap.placeMarkCoords,'placeMarkCoords')
  return {
    city: state.Zmap.city,
    placeMarkCoords: state.Zmap.placeMarkCoords,
    placeMarkProperties: state.Zmap.placeMarkProperties,
    mapCenter: state.Zmap.mapCenter,
    ymaps: state.Zmap.ymaps,
    zoom: state.Zmap.zoom,
    mapIsLoading:state.Zmap.mapIsLoading
  };
};

export default connect(mapStateToProps, {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setYmaps,
  setAnyObjectZmapReducer,
  setMapIsLoading  
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
