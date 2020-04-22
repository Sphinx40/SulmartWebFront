import React from "react";
import { List, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OrderPrice = ({ state, notShowButton }) => {
  const { order } = state;
  let orderTotal = 0;
  for (var t = 0; t<order.length; t++) {
    orderTotal = orderTotal + order[t].totalPrice;
  };

  return (
    <Segment attached='top'>
      <List divided relaxed>
        <List.Item>
          <List.Content>
            <List.Header>Сумма заказа</List.Header>
            <List.Description>{orderTotal}</List.Description>
          </List.Content>
        </List.Item>
      </List>
      {orderTotal === 0 || notShowButton === true ? null :
        <Button color="violet" as={Link} to="/Доставка">
          Оформить заказ
        </Button>
      }
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, {})(OrderPrice);
