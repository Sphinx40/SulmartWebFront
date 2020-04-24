import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  Dropdown
} from 'semantic-ui-react';
import OrderPrice from '../../components/OrderPrice/OrderPrice';
import Zmap from '../../components/Zmap/Zmap';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import OutputErrors from '../../utils/OutputErrors';
import Recaptcha from 'react-google-invisible-recaptcha';
import {
  findCoordsByStreetAndHouse,
  setAnyObjectZmapReducer
} from '../../actions/zmapActions';
import { addToAddresses, createOrder } from '../../actions';
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';

const { Step } = Steps;

const DeliveryOrder = props => {
  const {
    state,
    addToAddresses,
    cityName,
    ymaps,
    placeMarkCoords,
    findCoordsByStreetAndHouse,
    setAnyObjectZmapReducer,
    createOrder,
    history
  } = props;
  const { order, addresses } = state;
  const [user, setUser] = useState({
    name: '',
    phone: '',
    extraPhone: '',
    street: '',
    house: '',
    appartment: '',
    longitude: 0,
    latitude: 0,
    mapWidth: 458,
    mapHeight: 405
  });

  let recaptcha;
  const [errors, setErrors] = useState([]);
  const [addressesOptions, setAddressesOptions] = useState([]);

  useEffect(() => {
    if (placeMarkCoords && placeMarkCoords.length === 2) {
      setUser(prev => {
        return {
          ...prev,
          latitude: placeMarkCoords[0],
          longitude: placeMarkCoords[1]
        };
      });
    }
    //eslint-disable-next-line
  }, [placeMarkCoords]);

  useEffect(() => {
    if (addresses.length !== 0) {
      const addAnotherAddress = [...addresses, { title: 'Добавить другое' }];
      const lastAdresses = addAnotherAddress.map((item, id) => {
        if (item.title === 'Добавить другое') {
          return {
            key: id,
            text: item.title,
            value: id
          };
        } else {
          return {
            key: id,
            text: item.street + ' ' + item.house,
            value: id
          };
        }
      });
      setAddressesOptions(lastAdresses);
    }
  }, [addresses]);

  const validation = () => {
    let errors = [];

    if (order.length === 0) {
      errors.push('Выберите продукты');
    }
    if (user.name === '') {
      errors.push('Заполните имя');
    }
    if (user.phone === '') {
      errors.push('Заполните телефон');
    }
    if (user.street === '') {
      errors.push('Выберите улицу');
    }
    if (user.house === '') {
      errors.push('Выберите дом');
    }
    if (user.longitude === 0 || user.latitude === 0) {
      errors.push('Адрес неправильно');
    }

    return errors;
  };

  const toOrder = () => {
    if (validation().length !== 0) {
      setErrors(validation());
    } else {
      recaptcha.execute().then(data => {
        if (data) {
          addToAddresses({
            house: user.house,
            street: user.street,
            longitude: user.longitude,
            latitude: user.latitude
          });
          createOrder({ ...user, products: order });
          history.push('/SuccessBasket');
        }
      });
    }
  };

  const onChangeDeliveryAddress = idx => {
    if (addressesOptions.length - 1 !== idx) {
      const address = addresses.find(({}, id) => id === idx);
      setUser({
        ...user,
        house: address.house,
        street: address.street,
        longitude: address.longitude,
        latitude: address.latitude
      });
      let coords = [];
      coords.push(address.latitude);
      coords.push(address.longitude);
      setAnyObjectZmapReducer({
        placeMarkProperties: {
          iconCaption: address.street + ' ' + address.house
        },
        placeMarkCoords: coords,
        mapCenter: coords,
        zoom: 16
      });
    } else {
      setUser({
        ...user,
        house: '',
        street: '',
        longitude: '',
        latitude: ''
      });
    }
  };

  return (
    <Segment padded='very' color='violet' style={{ margin: 20 }}>
      <Steps style={{ width: 500, margin: 'auto' }} size='small' current={1}>
        <Step status='finish' />
        <Step status='process' />
        <Step status='wait' />
      </Steps>
      <Header content='Доставка' textAlign='center' />
      <Divider />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Table>
              <Table.Body>
                {addresses.length === 0 ? null : (
                  <Table.Row>
                    <Table.Cell>
                      <Dropdown
                        options={addressesOptions}
                        selection
                        placeholder='Сохраненные адреса'
                        onChange={(e, { value }) =>
                          onChangeDeliveryAddress(value)
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                )}

                <Table.Row>
                  <Table.Cell>
                    <Input
                      placeholder='Имя'
                      fluid
                      onChange={e => setUser({ ...user, name: e.target.value })}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <NumberFormat
                      format='+7 (###) ###-##-##'
                      customInput={Input}
                      onValueChange={e => setUser({ ...user, phone: e.value })}
                      fluid
                      mask='_'
                      placeholder='Телефон номер'
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <NumberFormat
                      format='+7 (###) ###-##-##'
                      customInput={Input}
                      onValueChange={e =>
                        setUser({ ...user, extraPhone: e.value })
                      }
                      fluid
                      mask='_'
                      placeholder='Дополнительный телефон номер'
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Input
                      id={'suggest'}
                      placeholder='Улица'
                      fluid
                      value={user.street}
                      onChange={e =>
                        setUser({
                          ...user,
                          street: e.target.value,
                          house: '',
                          latitude: 0,
                          longitude: 0
                        })
                      }
                      onBlur={event => {
                        //

                        findCoordsByStreetAndHouse(
                          user.street,
                          user.house,
                          cityName,
                          ymaps
                        );
                      }}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Input
                      placeholder='Дом'
                      fluid
                      value={user.house}
                      onChange={e =>
                        setUser({
                          ...user,
                          house: e.target.value,
                          latitude: 0,
                          longitude: 0
                        })
                      }
                      onBlur={event => {
                        findCoordsByStreetAndHouse(
                          user.street,
                          user.house,
                          cityName,
                          ymaps
                        );
                      }}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Input
                      placeholder='Квартира'
                      fluid
                      value={user.appartment}
                      onChange={e =>
                        setUser({ ...user, appartment: e.target.value })
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <OrderPrice notShowButton={true} />
            <Divider />
            <OutputErrors errors={errors} />
            <Recaptcha
              ref={ref => (recaptcha = ref)}
              sitekey='6LfKV-0UAAAAACSPnzDikZx_bEnI0qL_IMdqAF2e'
            />
            <Button color='violet' type='submit' onClick={toOrder}>
              Оформить
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Zmap
              setStreet={street =>
                setUser(prev => {
                  return { ...prev, street };
                })
              }
              setHouse={house => {
                setUser(prev => {
                  return { ...prev, house };
                });
              }}
              mapWidth={user.mapWidth}
              mapHeight={user.mapHeight}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    state: state.Main,
    cityName: state.Zmap.city.name,
    ymaps: state.Zmap.ymaps,
    placeMarkCoords: state.Zmap.placeMarkCoords
  };
};

export default connect(mapStateToProps, {
  findCoordsByStreetAndHouse,
  setAnyObjectZmapReducer,
  addToAddresses,
  createOrder
})(withRouter(DeliveryOrder));
