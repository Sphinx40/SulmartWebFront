import React from 'react';
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
} from 'semantic-ui-react';

const AddreesListScreen = (props) => {
  const { history, ymaps } = props;
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
              onClick={() => history.push('/searchStreet')}
              // hidden={activeAddressDropdown}
              // value={user.street}
              // onChange={(e) =>
              //   // setUser({
              //   //   ...user,
              //   //   street: e.target.value,
              //   //   house: '',
              //   //   latitude: 0,
              //   //   longitude: 0,
              //   // })
              // }
              // onFocus={(event) => {
              //   // setUser({
              //   //   ...user,
              //   //   house: '',
              //   //   latitude: 0,
              //   //   longitude: 0,
              //   // });
              // }}
              // onBlur={(event) => {
              //   findCoordsByStreetAndHouse(user.street, '', city.name, ymaps);
              // }}
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Input
              placeholder='Дом'
              fluid
              // value={user.house}
              // hidden={activeAddressDropdown}
              // onChange={(e) =>
              //   setUser({
              //     ...user,
              //     house: e.target.value,
              //     latitude: 0,
              //     longitude: 0,
              //   })
              // }
              // onBlur={(event) => {
              //   findCoordsByStreetAndHouse(
              //     user.street,
              //     user.house,
              //     city.name,
              //     ymaps
              //   );
              // }}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(AddreesListScreen);
