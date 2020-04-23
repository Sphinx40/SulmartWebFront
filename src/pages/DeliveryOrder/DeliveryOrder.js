import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table
} from 'semantic-ui-react';
import QuantityProduct from '../../components/QuantityProduct/QuantityProduct';
import OrderPrice from '../../components/OrderPrice/OrderPrice';
import Zmap from '../../components/Zmap/Zmap';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import OutputErrors from '../../utils/OutputErrors';
import Recaptcha from 'react-google-invisible-recaptcha';

const DeliveryOrder = props => {
  const { state } = props;
  const { order } = state;
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

  const [errors, setErrors] = useState([]);
  let recaptcha;

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

    return errors;
  };

  const toOrder = () => {
    if (validation().length !== 0) {
      setErrors(validation());
    } else {
      recaptcha.execute();
    }
  };

  const onResolved = () => {};

  return (
    <Segment padded='very' color='violet' style={{ margin: 20 }}>
      <Header content='Доставка' textAlign='center' />
      <Divider />

      <QuantityProduct />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Table>
              <Table.Body>
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
                        setUser({ ...user, street: e.target.value, house: '' })
                      }
                      onBlur={event => {
                        // getCoordByStreetNameAndHouse(event.target.value);
                      }}
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
              sitekey='6LfUIO0UAAAAAPI8zy0I7xqS6KpVhQ6mbsdMD-7z'
              onResolved={onResolved}
            />
            <Button color='violet' type='submit' onClick={toOrder}>
              Оформить
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Zmap
              setMapWidth={mapWidth =>
                setUser(prev => {
                  return { ...prev, mapWidth };
                })
              }
              setMapHeight={mapHeight =>
                setUser(prev => {
                  return { ...prev, mapHeight };
                })
              }
              setLongitude={longitude =>
                setUser(prev => {
                  return { ...prev, longitude };
                })
              }
              setLatitude={latitude =>
                setUser(prev => {
                  return { ...prev, latitude };
                })
              }
              setStreet={street =>
                setUser(prev => {
                  return { ...prev, street };
                })
              }
              setHouse={house =>
                setUser(prev => {
                  return { ...prev, house };
                })
              }
              mapWidth={user.mapWidth}
              mapHeight={user.mapHeight}
              longitude={user.longitude}
              latitude={user.latitude}
              street={user.street}
              house={user.house}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, {})(DeliveryOrder);
