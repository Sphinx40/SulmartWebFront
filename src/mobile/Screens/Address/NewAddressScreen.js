import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { onGeocodeByText } from '../../../actions/addressActions';

const NewAddressScreen = props => {
  const ymaps = window.ymaps;
  const { history } = props;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [house, setHouse] = useState('');

  const { onGeocodeByText } = props;
  const { city, map, address } = props;

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

  const onSuccess = result => {
    setError(result.error);
    if (result.correctAddress) {
      console.log('success');
    }
  };
  const onContinue = (street, house) => {
    onGeocodeByText(
      ymaps,
      street,
      house,
      onSuccess,
      bool => setLoading(bool),
      city.name
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
              onClick: () => onContinue(street, house),
              loading: loading
            }}
          />
        </List.Content>
      </List.Item>
    </List>
  );
};

const mapStateToProps = state => {
  // console.log(state.address.address);
  return {
    city: state.address.city,
    market: state.address.market,
    address: state.address.address
  };
};

export default connect(mapStateToProps, { onGeocodeByText })(NewAddressScreen);
