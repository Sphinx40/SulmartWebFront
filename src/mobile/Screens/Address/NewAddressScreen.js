import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Table, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NewAddressScreen = (props) => {
  const ymaps = window.ymaps;
  const { history } = props;
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('Алматы');
  // const [coords, setHouse] = useState('');

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (
  //     props.location.state !== null &&
  //     props.location.state !== undefined &&
  //     props.location.state.street !== null &&
  //     props.location.state.street !== undefined
  //   ) {
  //     setNewAddress({ street: props.location.state.street });
  //   }
  //   // else {
  //   //   setNewAddress({ street: '' });
  //   // }
  // }, [props.location.state]);

  let street = '';
  if (
    props.location.state !== null &&
    props.location.state !== undefined &&
    props.location.state.street !== null &&
    props.location.state.street !== undefined
  ) {
    street = props.location.state.street;
  }

  // latitude:43.223790
  // longitude:76.842540
  const onGeocodeByText = (street, house, city) => {
    setLoading(true);
    setError('');
    let myGeocoder = ymaps.geocode(street + ', ' + house + ', ' + city);
    myGeocoder.then(
      (result) => {
        setLoading(false);
        let found = result.metaData.geocoder.found;

        if (found > 0) {
          let firstGeoObject = result.geoObjects.get(0);
          let coords = firstGeoObject.geometry.getCoordinates();
          let premiseNumber = firstGeoObject.getPremiseNumber();

          if (premiseNumber !== undefined) {
            setLatitude(coords[0]);
            setLongitude(coords[1]);
          } else {
            setError('Адрес не найден');
          }
        } else setError('Адрес не найден');

        // console.log(result, 'res');
        // console.log(firstGeoObject, 'firstGeoObject');
        // console.log(coords, 'coords');
        // console.log(
        //   firstGeoObject.getAddressLine(),
        //   'firstGeoObject.getAddressLine()'
        // );
        // console.log(
        //   firstGeoObject.getPremiseNumber(),
        //   'firstGeoObject.getPremiseNumber()'
        // );
        // console.log(
        //   firstGeoObject.getThoroughfare(),
        //   'firstGeoObject.getThoroughfare()'
        // );
        // console.log(firstGeoObject.getPremise(), 'firstGeoObject.getPremise()');
        // map.geoObjects.add(res.geoObjects);
        // Taking the data resulting from geocoding the object
        // and outputting it to the console.
        // console.log(
        //   res.geoObjects.get(0).properties.get('metaDataProperty').getAll()
        // );
      },
      (err) => {
        setError('Адрес не найден');
        // error handling
      }
    );
  };

  return (
    <List relaxed>
      <List.Item>
        <List.Content>
          <Link to='/newAddressWithMap'>Выбрать на карте</Link>
          <Input
            icon='search'
            iconPosition='left'
            placeholder='Улица'
            fluid
            value={street}
            onClick={() => history.push('/searchStreet')}
          />
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          {error}
          <Input
            placeholder='Дом'
            value={house}
            onChange={({ target: { value } }) => setHouse(value)}
            autoFocus={street.length > 0 ? true : false}
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
              onClick: () => onGeocodeByText(street, house, city),
              loading: loading,
            }}
          />
        </List.Content>
      </List.Item>
    </List>
    // <Table>
    //   <Table.Body>
    //     <Table.Row>
    //       <Table.Cell>
    //         <Input
    //           icon='search'
    //           iconPosition='left'
    //           placeholder='Улица'
    //           fluid
    //           value={street}
    //           onClick={() => history.push('/searchStreet')}
    //         />
    //       </Table.Cell>
    //     </Table.Row>

    //     <Table.Row>
    //       <Table.Cell>
    //         {error}
    //         <Input
    //           placeholder='Дом'
    //           value={house}
    //           onChange={({ target: { value } }) => setHouse(value)}
    //           autoFocus={street.length > 0 ? true : false}
    //           fluid
    //           action={{
    //             color: 'teal',
    //             labelPosition: 'right',
    //             icon: 'right arrow',
    //             content: 'Выбрать',
    //             disabled:
    //               street.length > 0 && house.replace(/\s/g, '').length > 0
    //                 ? false
    //                 : true,
    //             size: 'mini',
    //             onClick: () => onGeocodeByText(street, house, city),
    //             loading: loading,
    //           }}
    //         />
    //       </Table.Cell>
    //     </Table.Row>
    //     <Table.Row></Table.Row>
    //   </Table.Body>
    // </Table>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(NewAddressScreen);
