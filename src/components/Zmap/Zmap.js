import React, { useState, useEffect } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  TrafficControl,
  ZoomControl
} from 'react-yandex-maps';

//43.26975618015196, 76.93950828938578 Almaty coords
//37.611347,55.760241
const Zmap = props => {
  const { userLocation } = props;

  useEffect(() => {
    if (userLocation && userLocation.coords) {
      setMapState(prev => {
        return {
          ...prev,
          center: [userLocation.coords.latitude, userLocation.coords.longitude],
          zoom: 13
        };
      });
      setCoords([userLocation.coords.latitude, userLocation.coords.longitude]);
    }
    //eslint-disable-next-line
  }, [userLocation]);

  const [coords, setCoords] = useState([43.26975618015196, 76.93950828938578]);
  const placeMark = {
    geometry: [...coords],
    properties: {
      hintContent: 'Это хинт',
      balloonContent: 'Это балун'
    },
    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
    options: { draggable: true }
  };

  const [mapState, setMapState] = useState({
    center: [43.26975618015196, 76.93950828938578],
    zoom: 13,
    controls: []
  });

  const geocode = ymaps => {
    // console.log(ymaps, 'ymaps.geolocation');
    // const obj = ymaps.geolocation
    //   .get({ provider: 'yandex', mapStateAutoApply: true })
    //   .then(result =>
    //     ymaps.geocode(result.geoObjects.position).then(res => {
    //       let firstGeoObject = res.geoObjects.get(0);
    //       console.log(
    //         firstGeoObject.getLocalities().length
    //           ? firstGeoObject.getLocalities()
    //           : firstGeoObject.getAdministrativeAreas()
    //       );
    //     })
    //   );
    // console.log(obj, 'obj');
  };

  return (
    <YMaps
      query={{ lang: 'ru_RU', apikey: '2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6' }}
    >
      <div id='map-basics'>
        <Map
          state={mapState}
          width={640}
          height={480}
          draggable={true}
          modules={['geocode']}
          onLoad={ymaps => geocode(ymaps)}
          onClick={e => {
            setCoords([...e.get('coords')]);
            // console.log(e, 'e', e.get('coords'));
          }}
        >
          <TrafficControl options={{ float: 'right' }} />
          <GeolocationControl options={{ float: 'left' }} />

          <ZoomControl options={{ float: 'right' }} />
          <Placemark
            {...placeMark}
            // geometry={[...coords]}
            onClick={e => console.log(e, 'clieckd')}
            // onDragStart={e => console.log(e, 'onDragStart')}
            onDragEnd={e =>
              console.log(e.get('target').geometry.getCoordinates(), 'clieckd')
            }
          />
        </Map>
      </div>
    </YMaps>
  );
};

//2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6
//https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=76.93,43.26&format=json&lang=en_US
// https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=37.611347,55.760241

export default Zmap;

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