import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  Dropdown,
  Icon,
  Menu,
  List,
} from "semantic-ui-react";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { withRouter } from "react-router-dom";
import Spacer from "../../components/Spacer";
import { selectAddress } from "../../../actions";

const AddressListScreen = (props) => {
  const { history, addresses, selectedAddress, selectAddress } = props;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(selectedAddress.street)
  },[selectedAddress]);

  const onClickAddress = (item) => {
    selectAddress(item)
  };

  return (
    <ScreenHeader
      centerAccessories={() => <h6>Мои местоположения</h6>}
      leftAccessories={() => (
        <Icon name="arrow left" onClick={() => history.push("/")} />
      )}
      rightAccessories={() => (
        <Icon
          name="add"
          style={{ marginTop: 5 }}
          onClick={() => history.push("newAddress")}
        />
      )}
    >
      <Spacer>
        <Menu secondary vertical fluid>
          {addresses.map((item, idx) => (
            <Menu.Item
              key={idx}
              name={item.street}
              active={activeItem === item.street}
              onClick={() => onClickAddress(item)}
            />
          ))}
        </Menu>
      </Spacer>
    </ScreenHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    addresses: state.Main.addresses,
    selectedAddress: state.Main.selectedAddress
  };
};

export default connect(mapStateToProps, { selectAddress })(withRouter(AddressListScreen));
