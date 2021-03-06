import React from "react";
import { List, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OrderPrice = ({
  order,
  notShowButton,
  totalPrice,
  deliveryPrice = 0,
}) => {
  let orderTotal = 0;
  let total = deliveryPrice;

  for (var t = 0; t < order.length; t++) {
    orderTotal = orderTotal + order[t].totalPrice;
    total = total + order[t].totalPrice;
  };

  return (
    <Segment attached="top">
      <List divided relaxed>
        <List.Item>
          <List.Content>
            <List.Header>Сумма заказа</List.Header>
            <List.Description>KZT {orderTotal}</List.Description>
          </List.Content>
        </List.Item>

        {deliveryPrice ? (
          <List.Item>
            <List.Content>
              <List.Header>Доставка</List.Header>
              <List.Description>KZT {deliveryPrice}</List.Description>
            </List.Content>
          </List.Item>
        ) : null}

        {totalPrice ? (
          <List.Item>
            <List.Content>
              <List.Header>Итого</List.Header>
              <List.Description>KZT {total}</List.Description>
            </List.Content>
          </List.Item>
        ) : null}
      </List>
      {orderTotal === 0 || notShowButton === true ? null : (
        <Button
          color="violet"
          as={Link}
          to="/delivery"
        >
          Оформить заказ
        </Button>
      )}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, {})(OrderPrice);