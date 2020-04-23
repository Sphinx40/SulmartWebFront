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
  setYmaps
} from '../../actions/zmapActions';
import { connect } from 'react-redux';
//43.26975618015196, 76.93950828938578 Almaty coords
//37.611347,55.760241
const Zmap = props => {
  // const [city, setCity] = useState({
  //   coords: [43.24946867986241, 76.91736506700802],
  //   name: 'Алматы'
  // });

  // const [mapWidth, setMapWidth] = useState(458);
  // const [mapHeight, setMapHeight] = useState(405);
  // const [longitude, setLongitude] = useState(76.91736506700802);
  // const [latitude, setLatitude] = useState(43.24946867986241);
  // const [street, setStreet] = useState('');
  // const [house, setHouse] = useState('');

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
    setYmaps
  } = props;
  const {
    city,
    placeMarkCoords,
    placeMarkProperties,
    mapCenter,
    ymaps
  } = props;
  useEffect(() => {
    setPlaceMarkCoords(city.coords);
    setMapCenter(city.coords);
    //eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   if (userLocation && userLocation.coords) {
  //     setMapCenter([
  //       userLocation.coords.latitude,
  //       userLocation.coords.longitude
  //     ]);
  //   }
  //   //eslint-disable-next-line
  // }, [userLocation]);

  // const [placeMarkCoords, setPlaceMarkCoords] = useState(city.coords);
  // const [placeMarkProperties, setPlaceMarkProperties] = useState({});
  // const [mapCenter, setMapCenter] = useState(city.coords);
  // const [ymaps, setYmaps] = useState({});

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
      let streetArray = e.get('item').displayName.split(',');
      streetArray.forEach(item => {
        if (
          item.includes('улица') ||
          item.includes('проспект') ||
          item.includes('даңғылы') ||
          item.includes('көшесі')
        ) {
          streetName = item;
        }
      });
      streetArray.forEach(item => {
        if (item.includes('микрорайон')) {
          streetName = item;
        }
      });
      setStreet(streetName);
      if (streetName && streetName.length > 0) {
        ymaps.geocode(city.name + ', ' + streetName).then(result => {
          let coords = result.geoObjects.get(0).geometry.getCoordinates();
          // console.log(coords,'coords')
          setMapCenter(coords);
          setPlaceMarkCoords(coords);
          setPlaceMarkProperties({
            iconCaption: streetName
          });
          // setLatitude(coords[0]);
          // setLongitude(coords[1]);
        });
      }
    });
  };

  const getStreetNameByCoords = coords => {
    if (!ymaps.geocode) return;
    let returnObj = { found: false };
    // console.log(coords, 'coords');

    setStreet('');
    setHouse('');
    setPlaceMarkCoords(coords);
    // setMapCenter(coords);
    setPlaceMarkProperties({ iconCaption: '...searching' });
    // setLatitude(coords[0]);
    // setLongitude(coords[1]);
    // console.log(coords,'coords')
    ymaps
      .geocode(coords)
      .then(res => {
        let firstGeoObject = res.geoObjects.get(0);

        let iconCaptionText = '';
        let houseTemp = '';
        let streetTemp = '';

        let streetArray = firstGeoObject.getAddressLine().split(',');
        streetArray.forEach(item => {
          if (
            item.includes('улица') ||
            item.includes('проспект') ||
            item.includes('даңғылы') ||
            item.includes('көшесі')
          ) {
            streetTemp = item;
          }
        });
        streetArray.forEach(item => {
          if (item.includes('микрорайон')) {
            streetTemp = item;
          }
        });

        // if (firstGeoObject.getThoroughfare()) {
        //   streetTemp = firstGeoObject.getThoroughfare();
        // } else if (firstGeoObject.getPremise()) {
        //   streetTemp = firstGeoObject.getPremise();
        // }

        if (firstGeoObject.getPremiseNumber()) {
          houseTemp = firstGeoObject.getPremiseNumber();
        }

        // streetTemp = removeStreetWord(streetTemp);

        iconCaptionText = streetTemp + ' ' + houseTemp;
        setPlaceMarkProperties({
          iconCaption: iconCaptionText
        });

        // console.log(streetTemp, 'streetTemp');
        if (
          streetTemp === null ||
          streetTemp === '' ||
          streetTemp.length === 0
        ) {
          returnObj = { found: false };
          return returnObj;
        } else {
          // returnObj = { found: true, streetTemp, houseTemp };
          setStreet(streetTemp);
          setHouse(houseTemp);
          return returnObj;
        }
      })
      .catch(err => {
        returnObj = { found: false };
        return returnObj;
      });
  };

  const splitByCommaAndReturnStreetName = text => {
    let streetArray = text.split(',');
    streetArray.forEach(item => {
      if (
        item.includes('улица') ||
        item.includes('проспект') ||
        item.includes('даңғылы') ||
        item.includes('көшесі')
      ) {
        // console.log(item, 'item');
        return item;
      }
    });
    return '';
  };

  const removeStreetWord = text => {
    let tempText = text;

    tempText = tempText.replace('улица ', '');
    tempText = tempText.replace(' улица', '');
    tempText = tempText.replace('улица', '');

    tempText = tempText.replace('проспект ', '');
    tempText = tempText.replace(' проспект', '');
    tempText = tempText.replace('проспект', '');

    tempText = tempText.replace('даңғылы ', '');
    tempText = tempText.replace(' даңғылы', '');
    tempText = tempText.replace('даңғылы', '');

    tempText = tempText.replace('көшесі ', '');
    tempText = tempText.replace(' көшесі', '');
    tempText = tempText.replace('көшесі', '');
    return tempText;
  };

  return (
    <YMaps
      query={{ lang: 'ru_RU', apikey: '2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6' }}
    >
      <div id='map-basics'>
        {/* <input
          type='text'
          className='form-control'
          id='suggest'
          style={{ width: '100%' }}
          value={street}
          onBlur={event => {
            getCoordByStreetNameAndHouse(event.target.value);
          }}
          onChange={event => {
            setHouse('');
            setStreet(event.target.value);
          }}
        /> */}
        <Map
          state={{ center: mapCenter, zoom: 12, controls: [] }}
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
            // geometry: [43.26975618015196, 76.93950828938578],
            // properties: {
            //   iconCaption: 'searching...'
            //   // hintContent: 'Это хинт',
            //   // balloonContent: 'Это балун'
            // },
            // modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
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
    ymaps: state.Zmap.ymaps
  };
};

export default connect(mapStateToProps, {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setYmaps
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
