import React, { useState, useEffect, useRef } from 'react';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  Dropdown,
  Image,
} from 'semantic-ui-react';
import OrderPrice from '../../components/OrderPrice/OrderPrice';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import OutputErrors from '../../utils/OutputErrors';
import Recaptcha from 'react-google-invisible-recaptcha';
import {
  onGeocodeByCoords,
  onSuggest,
  setAddress,
  setMap,
  onGeocodeByText,
} from '../../actions/addressActions';
import { addToAddresses, createOrder, clearOrder } from '../../actions';
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';
import { calculateDeliveryCost } from '../../utils/addressMethods';
import ResponsiveContainer from '../../components/ResponsiveContainer/ResponsiveContainer';
import { debounce } from 'lodash';

const { Step } = Steps;

const INPUT_NOT_EDITABLE = 'INPUT_NOT_EDITABLE';
const INPUT_HOUSE_CLICKED = 'INPUT_HOUSE_CLICKED';
const INPUT_STREET_CLICKED = 'INPUT_STREET_CLICKED';

const DeliveryOrder = (props) => {
  const { state, addToAddresses, createOrder, history, clearOrder } = props;
  const { order, addresses, myOrders } = state;
  const [user, setUser] = useState({
    name: '',
    phone: '',
    extraPhone: '',
    appartment: '',
  });

  let recaptcha;
  const [errors, setErrors] = useState([]);
  const [addressesOptions, setAddressesOptions] = useState([]);

  const ymaps = window.ymaps;
  const { city, map, address } = props;
  const {
    onGeocodeByCoords,
    onSuggest,
    setAddress,
    setMap,
    onGeocodeByText,
  } = props;
  const [mapLoading, setMapLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [onGeocodeByTextLoading, setOnGeocodeByTextLoading] = useState(false);

  const [inputClicked, setInputClicked] = useState(INPUT_NOT_EDITABLE);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(0);

  const myMapRef = useRef();
  const myPlacemarkRef = useRef();

  useEffect(() => {
    setMapLoading(true);
    let initCoords = city.coords;
    let initZoom = map.zoom;

    let myMap;
    let myPlacemark;
    // Waiting for the API to load and DOM to be ready.
    if (ymaps) {
      ymaps.ready(() => {
        setMapLoading(false);
        myMap = new ymaps.Map(
          'web-map',
          {
            //   center: [43.24946867986241, 76.91736506700802],
            center: initCoords,
            zoom: initZoom,
            controls: ['zoomControl'],
          },
          {
            searchControlProvider: 'yandex#search',
          }
        );

        myPlacemark = new ymaps.Placemark(
          initCoords,
          {
            iconCaption: '',
          },
          { draggable: true }
        );

        myPlacemark.events.add('dragend', (e) => {
          let coords = [...e.get('target').geometry.getCoordinates()];
          setInputClicked(INPUT_NOT_EDITABLE);
          setSelectedSavedAddress(0);
          onGeocodeByCoords(
            ymaps,
            coords,
            ({ error, iconCaption }) => {
              // setError(error);
              myPlacemark.properties.set({ iconCaption });
            },
            // (bool) => setLoading(bool),
            (bool) => {},
            city.name
          );
        });

        myMap.events.add('click', (e) => {
          let coords = e.get('coords');
          // console.log(coords);
          setInputClicked(INPUT_NOT_EDITABLE);
          setSelectedSavedAddress(0);
          myPlacemark.geometry.setCoordinates(coords);
          onGeocodeByCoords(
            ymaps,
            coords,
            ({ error, iconCaption }) => {
              // setError(error);
              myPlacemark.properties.set({ iconCaption });
            },
            // (bool) => setLoading(bool),
            (bool) => {},
            city.name
          );
        });
        myMap.geoObjects.add(myPlacemark);
        myPlacemarkRef.current = myPlacemark;
        myMapRef.current = myMap;
        // setMyMap
      });
    }
    //eslint-disable-next-line
    return () => {
      setMapLoading(true);
    };
  }, []);

  // useEffect(() => {
  //   // if (placeMarkCoords && placeMarkCoords.length === 2) {
  //   //   let result = calculateDeliveryCost(
  //   //     city.coords,
  //   //     market.coords,
  //   //     placeMarkCoords
  //   //   );
  //   //   //
  //   //   let deliveryPrice = 0;
  //   //   if (result.boolean) {
  //   //     deliveryPrice = result.deliveryPrice;
  //   //   }
  //   //   setUser((prev) => {
  //   //     return {
  //   //       ...prev,
  //   //       latitude: placeMarkCoords[0],
  //   //       longitude: placeMarkCoords[1],
  //   //       deliveryPrice,
  //   //     };
  //   //   });
  //   // }
  //   //eslint-disable-next-line
  // }, [placeMarkCoords]);

  useEffect(() => {
    if (addresses.length !== 0) {
      const addAnotherAddress = [
        {
          house: '',
          street: 'Добавить другой адрес',
          longitude: '',
          latitude: '',
        },
        ...addresses,
      ];
      const lastAdresses = addAnotherAddress.map((item, id) => {
        return {
          key: id,
          text: item.street + ' ' + item.house,
          value: id,
        };
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
      recaptcha.execute().then((data) => {
        if (data) {
          addToAddresses({
            house: user.house,
            street: user.street,
            longitude: user.longitude,
            latitude: user.latitude,
          });
          createOrder({ ...user, products: order }, myOrders, () => {
            history.push('/successBasket');
            clearOrder();
          });
        }
      });
    }
  };

  const onChangeDeliveryAddress = (idx) => {
    setSelectedSavedAddress(idx);
    if (idx > 0) {
      setInputClicked(INPUT_NOT_EDITABLE);
      // const address = addressesOptions[idx];
      // console.log(addresses, 'addresses');
      // console.log(address, 'address');
      const address = addresses.find(({}, id) => id === idx - 1);

      setAddress({
        house: address.house,
        street: address.street,
        longitude: address.longitude,
        latitude: address.latitude,
      });

      let coords = [];
      coords.push(address.latitude);
      coords.push(address.longitude);
      setMap({
        center: coords,
        zoom: 16,
      });

      myPlacemarkRef.current.geometry.setCoordinates(coords);
      myPlacemarkRef.current.properties.set({ iconCaption: address.street });
      myMapRef.current.setCenter(coords, 16);
    }
    // else {
    //   setAddress({
    //     house: '',
    //     street: '',
    //     longitude: '',
    //     latitude: '',
    //   });
    //   setActiveAddressDropdown(false);
    // }
  };

  const [suggestedData, setSuggestedData] = useState([]);
  const onSuggestDebounce = debounce((text) => {
    // console.log('onSuggestDebounce');
    onSuggest(
      ymaps,
      text,
      (bool) => setSuggestLoading(bool),
      city.name,
      (result) =>
        setSuggestedData(
          result.map((item, idx) => {
            return {
              key: idx,
              text: item.text,
              value: item.text,
            };
          })
        )
    );
  }, 1000);

  const onGeocodeByTextSuccess = (result) => {
    // setError(result.error);
    if (result.correctAddress) {
      let coords = [];
      coords.push(result.latitude);
      coords.push(result.longitude);
      console.log('success');

      myPlacemarkRef.current.geometry.setCoordinates(coords);
      myPlacemarkRef.current.properties.set({
        iconCaption: result.iconCaption,
      });
      myMapRef.current.setCenter(coords, 16);
    } else {
      myPlacemarkRef.current.geometry.setCoordinates(city.coords);
      myPlacemarkRef.current.properties.set({
        iconCaption: result.iconCaption,
      });
      myMapRef.current.setCenter(city.coords, 12);
    }
  };

  const onHouseDebounce = debounce((value) => {
    console.log('test', value);
    onGeocodeByText(
      ymaps,
      address.street,
      value,
      onGeocodeByTextSuccess,
      (bool) => setOnGeocodeByTextLoading(bool),
      city.name
    );
  }, 1000);
  return (
    <ResponsiveContainer>
      <Segment padded='very' color='violet' style={{ margin: 20 }}>
        <Steps style={{ width: 500, margin: 'auto' }} size='small' current={1}>
          <Step status='finish' />
          <Step status='process' />
          <Step status='wait' />
        </Steps>
        <Header content='Доставка' textAlign='center' />
        <Divider />

        <Segment loading={mapLoading} basic>
          <Grid stackable columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Table loading='true'>
                  <Table.Body>
                    {addresses.length === 0 ? null : (
                      <Table.Row>
                        <Table.Cell>
                          <Dropdown
                            options={addressesOptions}
                            selection
                            placeholder='Сохраненные адреса'
                            value={selectedSavedAddress || 0}
                            onChange={(e, { value }) =>
                              onChangeDeliveryAddress(value)
                            }
                            onClick={() => {
                              setInputClicked(INPUT_NOT_EDITABLE);
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}

                    <Table.Row>
                      <Table.Cell>
                        <Input
                          placeholder='Имя'
                          fluid
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          onClick={() => {
                            setInputClicked(INPUT_NOT_EDITABLE);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <NumberFormat
                          format='+7 (###) ###-##-##'
                          customInput={Input}
                          onValueChange={(e) =>
                            setUser({ ...user, phone: e.value })
                          }
                          fluid
                          mask='_'
                          placeholder='Телефон номер'
                          onClick={() => {
                            setInputClicked(INPUT_NOT_EDITABLE);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <NumberFormat
                          format='+7 (###) ###-##-##'
                          customInput={Input}
                          onValueChange={(e) =>
                            setUser({ ...user, extraPhone: e.value })
                          }
                          fluid
                          mask='_'
                          placeholder='Дополнительный телефон номер'
                          onClick={() => {
                            setInputClicked(INPUT_NOT_EDITABLE);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    {/* OPTION 1 *******************************************************/}
                    {inputClicked === INPUT_NOT_EDITABLE && (
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            value={address.street}
                            placeholder='Улица'
                            readOnly
                            fluid
                            onClick={() => {
                              setInputClicked(INPUT_STREET_CLICKED);
                              onChangeDeliveryAddress(0);
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {inputClicked === INPUT_NOT_EDITABLE && (
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            value={address.house}
                            placeholder='Дом'
                            readOnly
                            fluid
                            onClick={() => {
                              setInputClicked(INPUT_HOUSE_CLICKED);
                              onChangeDeliveryAddress(0);
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {/* OPTION 2 *******************************************************/}
                    {inputClicked === INPUT_STREET_CLICKED && (
                      <Table.Row>
                        <Table.Cell>
                          <Dropdown
                            autoComplete='something-randomsadasdasd'
                            placeholder='Улица'
                            search
                            selection
                            options={suggestedData}
                            onChange={(e, { value }) =>
                              setAddress({ street: value })
                            }
                            onSearchChange={(e) =>
                              onSuggestDebounce(e.target.value)
                            }
                            loading={suggestLoading}
                            text={address.street}
                            noResultsMessage='Не найден'
                            fluid
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {inputClicked === INPUT_STREET_CLICKED && (
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            value={address.house}
                            placeholder='Дом'
                            readOnly
                            fluid
                            onClick={() => {
                              setInputClicked(INPUT_HOUSE_CLICKED);
                              onChangeDeliveryAddress(0);
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {/* OPTION 3 *******************************************************/}
                    {inputClicked === INPUT_HOUSE_CLICKED && (
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            value={address.street}
                            placeholder='Улица'
                            readOnly
                            fluid
                            onClick={() => {
                              setInputClicked(INPUT_STREET_CLICKED);
                              onChangeDeliveryAddress(0);
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {inputClicked === INPUT_HOUSE_CLICKED && (
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            placeholder={address.house ? address.house : 'Дом'}
                            fluid
                            loading={onGeocodeByTextLoading}
                            onChange={(e) => onHouseDebounce(e.target.value)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {/* <Table.Row>
                      <Table.Cell>
                        {activeAddressDropdown === false &&
                          houseInput === 'suggest' && (
                            <Dropdown
                              autoComplete='something-randomsadasdasd'
                              placeholder='Улица'
                              search
                              selection
                              options={suggestedData}
                              onChange={(e, { value }) =>
                                setAddress({ street: value })
                              }
                              onSearchChange={(e) =>
                                onSuggestDebounce(e.target.value)
                              }
                              loading={suggestLoading}
                              text={address.street}
                              noResultsMessage='Не найден'
                              fluid
                            />
                          )}
                        {activeAddressDropdown === false &&
                          houseInput === 'map' && (
                            <Input
                              value={address.street}
                              readOnly
                              fluid
                              onClick={() => {
                                setHouseInput('suggest');
                                setSuggestedData([
                                  {
                                    key: 0,
                                    value: address.street,
                                    text: address.street,
                                  },
                                ]);
                              }}
                            />
                          )}
                        {activeAddressDropdown === true ? (
                          <Input value={address.street} readOnly fluid />
                        ) : null}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        {activeAddressDropdown === false &&
                          houseInput === 'suggest' && (
                            <Input
                              placeholder='Дом'
                              fluid
                              loading={onGeocodeByTextLoading}
                              onChange={(e) => onHouseDebounce(e.target.value)}
                              text={address.house}
                            />
                          )}
                        {activeAddressDropdown === false &&
                        houseInput === 'map' ? (
                          <Input
                            value={address.house}
                            readOnly
                            fluid
                            onClick={() => {
                              setHouseInput('suggest');
                            }}
                          />
                        ) : null}
                        {activeAddressDropdown === true ? (
                          <Input value={address.house} readOnly fluid />
                        ) : null}
                      </Table.Cell>
                    </Table.Row> */}

                    <Table.Row>
                      <Table.Cell>
                        <Input
                          placeholder='Квартира'
                          fluid
                          value={user.appartment}
                          onChange={(e) =>
                            setUser({ ...user, appartment: e.target.value })
                          }
                          onClick={() => {
                            setInputClicked(INPUT_NOT_EDITABLE);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <OrderPrice
                  order={order}
                  notShowButton={true}
                  deliveryPrice={user.deliveryPrice}
                  totalPrice
                />
                <Divider />
                <OutputErrors errors={errors} />
                <Recaptcha
                  ref={(ref) => (recaptcha = ref)}
                  sitekey='6LfKV-0UAAAAACSPnzDikZx_bEnI0qL_IMdqAF2e'
                />
                <Button color='violet' type='submit' onClick={toOrder}>
                  Заказать
                </Button>
              </Grid.Column>
              <Grid.Column id='web-map' style={{ height: 400 }}>
                {/* <div className='Parent' ref={parentRef}>
                  <h2>I'm the parent.</h2>
                  <p>I have height and width.</p>
                </div>
                {mapWidth}
                <div
                  id='web-map'
                  style={{
                    width: 260,
                    height: 500,
                    padding: 5,
                  }}
                >
                  zzzzzzzzzzzzzz
                  {mapLoading && (
                    <Segment placeholder loading>
                      <Image src='/img/paragraph.png' />
                    </Segment>
                  )}
                </div> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
    city: state.address.city,
    map: state.address.map,
    address: state.address.address,
    market: state.address.market,
  };
};

export default connect(mapStateToProps, {
  addToAddresses,
  createOrder,
  clearOrder,
  onGeocodeByCoords,
  onSuggest,
  setAddress,
  setMap,
  onGeocodeByText,
})(withRouter(DeliveryOrder));
