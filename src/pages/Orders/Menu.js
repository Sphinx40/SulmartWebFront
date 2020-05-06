import React from "react";
import { formatDMYMS } from "../../utils/helpers";
import { connect } from "react-redux";
import { Label, Menu } from "semantic-ui-react";

const OrderMenu = ({ myOrders, getOrderDetails, activeOrder }) => {
  return (
    <Menu vertical stackable>
      {myOrders.map((item, id) => {
        const date = formatDMYMS(item.orderDate);
        return (
          <Menu.Item
            key={id}
            name={item.orderNumber.toString()}
            active={activeOrder === item.orderNumber}
            onClick={() => getOrderDetails(item)}
          ><Label color="teal">KZT {item.totalPrice}</Label> 
            {date}
            {item.currency}
            
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return { state: state.Main };
};

export default connect(mapStateToProps, {})(OrderMenu);
