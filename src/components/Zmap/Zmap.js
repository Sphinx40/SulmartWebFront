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
      // setCoords([userLocation.coords.latitude, userLocation.coords.longitude]);
    }
    //eslint-disable-next-line
  }, [userLocation]);

  const [placeMarkCoords, setPlaceMarkCoords] = useState([43.3077, 76.85231]);
  const [placeMarkProperties, setPlaceMarkProperties] = useState({});
  // const [coords, setCoords] = useState([43.3077, 76.85231]);

  const placeMark = {
    geometry: placeMarkCoords,
    properties: placeMarkProperties,
    // geometry: [43.26975618015196, 76.93950828938578],
    // properties: {
    //   iconCaption: 'searching...'
    //   // hintContent: 'Это хинт',
    //   // balloonContent: 'Это балун'
    // },
    // modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
    options: { draggable: true }
  };

  const [mapState, setMapState] = useState({
    center: [43.3077, 76.85231],
    zoom: 13,
    controls: []
  });

  const [ymaps, setYmaps] = useState({});

  // const geocode = ymaps => {
  //   // console.log(ymaps, 'ymaps');
  //   const suggestView = new ymaps.SuggestView('suggest');
  // };
  const loadSuggest = ymaps => {
    const suggestView = new ymaps.SuggestView('suggest', {
      provider: {
        suggest: (request, options) => {
          return ymaps.suggest('алматы, ' + request);
        }
      }
    });
    console.log(suggestView, 'suggestView');
  };

  const geocode = ymaps => {
    console.log(ymaps, 'ymaps');
    setYmaps(ymaps);
  };

  const getStreetName = coords => {
    console.log(coords, 'coords');
    setPlaceMarkCoords(coords);
    setPlaceMarkProperties({ iconCaption: '...searching' });
    ymaps.geocode(coords).then(function(res) {
      let firstGeoObject = res.geoObjects.get(0);

      let iconCaptionText = '';
      let premiseNumber = '';
      let street = '';

      if (firstGeoObject.getThoroughfare()) {
        street = firstGeoObject.getThoroughfare();
      } else if (firstGeoObject.getPremise()) {
        street = firstGeoObject.getPremise();
      }

      if (firstGeoObject.getPremiseNumber()) {
        premiseNumber = firstGeoObject.getPremiseNumber();
      }

      iconCaptionText = street + ' ' + premiseNumber;

      street = street.replace('улица ', '');

      setPlaceMarkProperties({
        iconCaption: iconCaptionText
        // [
        //   // The name of the municipality or the higher territorial-administrative formation.
        //   firstGeoObject.getLocalities().length
        //     ? firstGeoObject.getLocalities()
        //     : firstGeoObject.getAdministrativeAreas(),

        //   // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
        //   firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        // ]
        //   .filter(Boolean)
        //   .join(', '),
        // // Specifying a string with the address of the object as the balloon content.
        // balloonContent: firstGeoObject.getAddressLine()
      });
      // placeMark = {
      //   ...placeMark,
      //   properties: {
      //     iconCaption: [
      //       // The name of the municipality or the higher territorial-administrative formation.
      //       firstGeoObject.getLocalities().length
      //         ? firstGeoObject.getLocalities()
      //         : firstGeoObject.getAdministrativeAreas(),
      //       // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
      //       firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      //     ]
      //       .filter(Boolean)
      //       .join(', '),
      //     // Specifying a string with the address of the object as the balloon content.
      //     balloonContent: firstGeoObject.getAddressLine()
      //   }
      // };
    });
  };

  const getCoordinates = () => {
    ymaps
      .geocode(
        'Қазақстан, Алматы, Алатау ауданы, Шаңырақ-2 шағын ауданы, Сырым батыр көшесі'
      )
      .then(result => {
        console.log(
          result.geoObjects.get(0).geometry.getCoordinates(),
          'result.geoObjects.get(0).geometry.getCoordinates()'
        );
      });
  };

  return (
    <YMaps
      query={{ lang: 'ru_RU', apikey: '2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6' }}
    >
      <div id='map-basics'>
        <input
          type='text'
          className='form-control'
          id='suggest'
          style={{ width: '100%' }}
          onChange={event => {
            console.log(event, 'input onSelect is triggered');
          }}
        />
        <Map
          state={mapState}
          width={640}
          height={480}
          draggable={true}
          modules={['SuggestView', 'suggest', 'geocode']}
          onLoad={ymaps => geocode(ymaps)}
          onClick={e => {
            // setCoords([...e.get('coords')]);
            getStreetName([...e.get('coords')]);
            // console.log(e, 'e', e.get('coords'));
          }}
        >
          <TrafficControl options={{ float: 'right' }} />
          <GeolocationControl options={{ float: 'left' }} />

          <ZoomControl options={{ float: 'right' }} />
          <Placemark
            {...placeMark}
            // geometry={[...coords]}
            onClick={e => {
              // getStreetName();
              // console.log(e.get('target').geometry.getCoordinates(), 'onclick');
              // console.log(ymaps, 'ymaps');
              getStreetName([...e.get('target').geometry.getCoordinates()]);
            }}
            // onDragStart={e => console.log(e, 'onDragStart')}
            onDragEnd={e => {
              getStreetName([...e.get('target').geometry.getCoordinates()]);
              // console.log(
              //   e.get('target').geometry.getCoordinates(),
              //   'ondragand drop'
              // )
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

//2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6
//https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=76.93,43.26&format=json&lang=en_US
// https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=37.611347,55.760241
//https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&format=json&geocode=Қазақстан, Алматы, Алатау ауданы, Шаңырақ-2 шағын ауданы, Сырым батыр көшесі&lang=en-US

// https://geocode-maps.yandex.ru/1.x/?apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6&geocode=76.85231,43.3077
// latitude:43.223790
// longitude:76.842540

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
