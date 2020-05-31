import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'semantic-ui-react';
import { Image, Segment } from 'semantic-ui-react';
import queryString from 'query-string';
import './address.css';

import { onGeocodeByCoords } from '../../../actions/addressActions';

import Spacer from '../../components/Spacer';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

const NewAddressScreenWithMap = (props) => {
  const ymaps = window.ymaps;
  const { history } = props;
  //   const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  const { onGeocodeByCoords } = props;
  const { city, map, address } = props;

  //   console.log(props.match, 'props.match.params.latitude');
  useEffect(() => {
    setMapLoading(true);
    let initCoords = city.coords;
    let initZoom = map.zoom;

    const url = props.location.search;
    const params = queryString.parse(url);
    let myMap;

    // Waiting for the API to load and DOM to be ready.
    ymaps.ready(() => {
      setMapLoading(false);
      if (params.latitude && params.longitude) {
        initCoords = [params.latitude, params.longitude];
        initZoom = 16;

        onGeocodeByCoords(
          ymaps,
          initCoords,
          (text) => {},
          (bool) => setLoading(bool),
          city.name
        );
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

        onGeocodeByCoords(
          ymaps,
          coords,
          ({ error, iconCaption }) => {
            // setError(error);
            myPlacemark.properties.set({ iconCaption });
          },
          (bool) => setLoading(bool),
          city.name
        );
      });

      myMap.events.add('click', (e) => {
        let coords = e.get('coords');
        // console.log(coords);
        myPlacemark.geometry.setCoordinates(coords);
        onGeocodeByCoords(
          ymaps,
          coords,
          ({ error, iconCaption }) => {
            // setError(error);
            myPlacemark.properties.set({ iconCaption });
          },
          (bool) => setLoading(bool),
          city.name
        );
      });
      myMap.geoObjects.add(myPlacemark);
    });
    //eslint-disable-next-line
  }, []);
  //   ?latitude=43.21682403443262&&longitude=76.85062120420784
  // latitude:43.223790
  // longitude:76.842540

  const onContinue = () => {
    history.push("/")
  };

  return (
    <React.Fragment>
      <ScreenHeader
        leftAccessories={() => (
          <Icon onClick={() => history.push('/newAddress')} name='arrow left' />
        )}
        centerAccessories={() => (
          <h6>Новый адрес с картой</h6>
        )}
      >
        <Spacer>
          <Input readOnly placeholder='Улица' fluid value={address.street} />
          <Spacer />
          <Input
            readOnly
            placeholder='Дом'
            value={address.house}
            fluid
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'right arrow',
              content: 'Выбрать',
              disabled:
                address.street.length > 0 &&
                address.house.replace(/\s/g, '').length > 0
                  ? false
                  : true,
              size: 'mini',
              loading: loading,
              onClick: () => onContinue()
            }}
          />

          <div
            id='mobile-map'
            style={{
              width: window.innerWidth - 20,
              height: window.innerHeight - 205,
              padding: 5,
            }}
          >
            {mapLoading && (
              <Segment placeholder loading>
                <Image src='/img/paragraph.png' />
              </Segment>
            )}
          </div>
        </Spacer>
      </ScreenHeader>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  // console.log(state, 'state');
  return {
    city: state.address.city,
    market: state.address.market,
    map: state.address.map,
    address: state.address.address,
  };
};

export default connect(mapStateToProps, { onGeocodeByCoords })(
  NewAddressScreenWithMap
);
