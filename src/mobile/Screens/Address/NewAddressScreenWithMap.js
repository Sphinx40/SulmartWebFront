import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, List, Icon } from 'semantic-ui-react';
import { Image, Segment } from 'semantic-ui-react';
import queryString from 'query-string';
import './address.css';

import { onGeocodeByCoords } from '../../../actions/addressActions';

const NewAddressScreenWithMap = props => {
  const ymaps = window.ymaps;
  const { history } = props;
  const [error, setError] = useState('');
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
          text => {},
          bool => setLoading(bool),
          city.name
        );
      }
      myMap = new ymaps.Map(
        'mobile-map',
        {
          //   center: [43.24946867986241, 76.91736506700802],
          center: initCoords,
          zoom: initZoom,
          controls: ['zoomControl', 'searchControl']
        },
        {
          searchControlProvider: 'yandex#search'
        }
      );

      let myPlacemark = new ymaps.Placemark(
        initCoords,
        {
          iconCaption: ''
        },
        { draggable: true }
      );

      myPlacemark.events.add('dragend', e => {
        let coords = [...e.get('target').geometry.getCoordinates()];

        onGeocodeByCoords(
          ymaps,
          coords,
          ({ error, iconCaption }) => {
            setError(error);
            myPlacemark.properties.set({ iconCaption });
          },
          bool => setLoading(bool),
          city.name
        );
      });

      myMap.events.add('click', e => {
        let coords = e.get('coords');
        // console.log(coords);
        myPlacemark.geometry.setCoordinates(coords);
        onGeocodeByCoords(
          ymaps,
          coords,
          ({ error, iconCaption }) => {
            setError(error);
            myPlacemark.properties.set({ iconCaption });
          },
          bool => setLoading(bool),
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
            <Input readOnly placeholder='Улица' fluid value={address.street} />
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
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
                loading: loading
              }}
            />
          </List.Content>
        </List.Item>
      </List>

      <div
        id='mobile-map'
        style={{ width: map.width, height: map.height, padding: 5 }}
      >
        {mapLoading && (
          <Segment placeholder loading>
            <Image src='/img/paragraph.png' />
          </Segment>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  // console.log(state, 'state');
  return {
    city: state.address.city,
    market: state.address.market,
    map: state.address.map,
    address: state.address.address
  };
};

export default connect(mapStateToProps, { onGeocodeByCoords })(
  NewAddressScreenWithMap
);
