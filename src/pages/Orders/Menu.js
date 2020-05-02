import React, { useState, useEffect } from "react";
import { formatDMYMS } from "../../utils/helpers";
import { connect } from "react-redux";
import { Label, Menu, Input } from "semantic-ui-react";

const OrderMenu = ({ myOrders, getOrderDetails, activeOrder }) => {
  return (
    <Menu vertical stackable>
      <Menu.Item>
        <Input icon="search" placeholder="Дата" />
      </Menu.Item>

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
