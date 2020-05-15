import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  Dropdown,
  Label,
} from 'semantic-ui-react';

const NewAddressScreen = (props) => {
  const { history } = props;
  const [house, setHouse] = useState('');

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

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input
              icon='search'
              iconPosition='left'
              placeholder='Улица'
              fluid
              value={street}
              onClick={() => history.push('/searchStreet')}
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
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
              }}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row></Table.Row>
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(NewAddressScreen);
