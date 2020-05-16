import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Header, List, Icon } from 'semantic-ui-react';
import queryString from 'query-string';
import {
  splitByCommaAndReturnStreetName,
  splitByCommaAndReturnFirstName,
} from '../../../utils/zmapMethods';
import './address.css';

import {
  setPlaceMarkCoords,
  setPlaceMarkProperties,
  setMapCenter,
  setAnyObjectZmapReducer,
  setMapIsLoading,
} from '../../../actions/zmapActions';

const NewAddressScreenWithMap = (props) => {
  const ymaps = window.ymaps;
  const { history } = props;
  const [house, setHouse] = useState('');
  const [street, setStreet] = useState('');
  // const [coords, setHouse] = useState('');

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapWidth, setMapWidth] = useState(310);

  const [mapHeight, setMapHeight] = useState(380);
  const {
    setPlaceMarkCoords,
    setPlaceMarkProperties,
    setMapCenter,
    setAnyObjectZmapReducer,
    setMapIsLoading,
  } = props;
  const {
    city,
    placeMarkCoords = city.coords,
    placeMarkProperties,
    mapCenter,
    zoom,
    mapIsLoading,
  } = props;

  //   console.log(props.match, 'props.match.params.latitude');
  useEffect(() => {
    let initCoords = city.coords;
    let initZoom = zoom;

    const url = props.location.search;
    const params = queryString.parse(url);
    let myMap;

    // Waiting for the API to load and DOM to be ready.
    ymaps.ready(() => {
      if (params.latitude && params.longitude) {
        initCoords = [params.latitude, params.longitude];
        initZoom = 16;
        onGeocodeByCoords(initCoords, (text) => {});
      }
      myMap = new ymaps.Map(
        'mobile-map',
        {
          //   center: [43.24946867986241, 76.91736506700802],
          center: initCoords,
          zoom: initZoom,
          controls: ['zoomControl', 'searchControl'],
        },
        {
          searchControlProvider: 'yandex#search',
        }
      );

      let myPlacemark = new ymaps.Placemark(
        initCoords,
        {
          iconCaption: '',
        },
        { draggable: true }
      );

      myPlacemark.events.add('dragend', (e) => {
        let coords = [...e.get('target').geometry.getCoordinates()];

        onGeocodeByCoords(coords, (text) => {
          myPlacemark.properties.set({
            // Forming a string with the object's data.
            iconCaption: text,
          });
        });
      });

      myMap.events.add('click', (e) => {
        let coords = e.get('coords');
        // console.log(coords);
        myPlacemark.geometry.setCoordinates(coords);
        onGeocodeByCoords(coords, (text) => {
          myPlacemark.properties.set({
            // Forming a string with the object's data.
            iconCaption: text,
          });
        });
      });
      myMap.geoObjects.add(myPlacemark);
    });
    //eslint-disable-next-line
  }, []);
  //   ?latitude=43.21682403443262&&longitude=76.85062120420784
  // latitude:43.223790
  // longitude:76.842540
  const onGeocodeByCoords = (coords, setIconCaption) => {
    setLoading(true);
    setError('');
    let myGeocoder = ymaps.geocode(coords);
    myGeocoder.then(
      (result) => {
        setLoading(false);

        let found = result.metaData.geocoder.found;

        // console.log(found, 'found');
        if (found > 0) {
          let firstGeoObject = result.geoObjects.get(0);
          let streetTemp = '';
          let adminAreas = firstGeoObject.getAdministrativeAreas();
          if (
            adminAreas === null ||
            adminAreas.length !== 1 ||
            adminAreas[0] !== 'Алматы'
          ) {
            setStreet('');
            setHouse('');
            setError('Доставка только по городу Алматы!!!');
            setIconCaption('Доставка только по городу Алматы!!!');
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
              setStreet('');
              setHouse('');
              setError('Адрес не найден');
              setIconCaption('Адрес не найден');
              return;
            } else {
              // returnObj = { found: true, streetTemp, houseTemp };
              setStreet(streetTemp);
              setHouse(premiseNumber);
              setIconCaption(streetTemp + ' ' + premiseNumber);
              return;
            }
          } else {
            setStreet('');
            setHouse('');
            setError('Адрес не найден');
            setIconCaption('Адрес не найден');
          }
        } else {
          setStreet('');
          setHouse('');
          setError('Адрес не найден');
          setIconCaption('Адрес не найден');
        }
      },
      (err) => {
        setStreet('');
        setHouse('');
        setError('Адрес не найден');
        setIconCaption('Адрес не найден');
        // error handling
      }
    );
  };

  return (
    <React.Fragment>
      <List relaxed>
        <List.Item>
          <List.Content>
            <Icon
              name='arrow left'
              link
              onClick={() => {
                history.push('/newAddress');
              }}
            />
            NewAddressScreenWithMap
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Input placeholder='Улица' fluid value={street} />
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Input
              focus={false}
              placeholder='Дом'
              value={house}
              fluid
              action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'right arrow',
                content: 'Выбрать',
                disabled:
                  street.length > 0 && house.replace(/\s/g, '').length > 0
                    ? false
                    : true,
                size: 'mini',
                loading: loading,
              }}
            />
          </List.Content>
        </List.Item>
      </List>

      <div
        id='mobile-map'
        style={{ width: mapWidth, height: mapHeight, padding: 5 }}
      ></div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    city: state.Zmap.city,
    placeMarkCoords: state.Zmap.placeMarkCoords,
    placeMarkProperties: state.Zmap.placeMarkProperties,
    mapCenter: state.Zmap.mapCenter,
    zoom: state.Zmap.zoom,
    mapIsLoading: state.Zmap.mapIsLoading,
  };
};

export default connect(mapStateToProps, { setAnyObjectZmapReducer })(
  NewAddressScreenWithMap
);
