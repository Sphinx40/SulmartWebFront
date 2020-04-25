import React from "react";
import { Segment, Image, List, Button, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { incrementToOrder, decrementFromOrder, deleteFromOrder } from "../../actions";

const QuantityProduct = (props) => {
  const {
    state,
    incrementToOrder,
    decrementFromOrder,
    deleteFromOrder
  } = props;
  const { order } = state;

  const onChangeCount = (text, product, quantity) => {
    if (text === "Plus") {
      incrementToOrder(product, quantity);
    } else {
      decrementFromOrder(product, quantity);
    }
  };

  const onDeleteProduct = (idx) => {
    deleteFromOrder(idx)
  };

  if (order.length !== 0) {
    return (
      <Segment>
        <List divided relaxed>
          {order.map((item, id) => (
            <List.Item key={id}>
              <Image src={item.imageUrl} style={{ width: 80, height: 50 }} />
              <List.Content>
                <List.Header>{item.ru}</List.Header>
                {item.currency} {item.price}
              </List.Content>
              <List.Content floated="right">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    size="mini"
                    color="blue"
                    inverted
                    icon="plus"
                    style={{ marginRight: 10 }}
                    onClick={() =>
                      onChangeCount("Plus", item, item.quantity + 1)
                    }
                  />
                  <Header as="h5">{item.quantity}</Header>
                  <Button
                    size="mini"
                    color="blue"
                    inverted
                    icon="minus"
                    style={{ marginLeft: 10 }}
                    onClick={() =>
                      onChangeCount("Minus", item, item.quantity - 1)
                    }
                  />
                    <Button
                      size="mini"
                      color="red"
                      inverted
                      icon="trash alternate"
                      style={{ marginLeft: 10 }}
                      onClick={() => onDeleteProduct(id)}
                    />
                </div>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return { 
    state: state.Main
  };
};

export default connect(mapStateToProps, {
  incrementToOrder,
  decrementFromOrder,
  deleteFromOrder
})(QuantityProduct);