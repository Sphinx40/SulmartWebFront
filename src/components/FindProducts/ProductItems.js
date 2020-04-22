import React from "react";
import {
  Segment,
  Image,
  List,
  Button,
  Header,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import { incrementToOrder, decrementFromOrder } from "../../actions";

const ListOfFoundProducts = (props) => {
  const { state, incrementToOrder, decrementFromOrder, foundProducts, ru } = props;
  const { order } = state;

  const onChangeCount = (text, product, quantity) => {
    if (text === "Plus") {
      incrementToOrder(product,quantity)
    } else {
      decrementFromOrder(product,quantity)
    }
  };
  
  return (
    <Segment>
        <Header textAlign='center' as="h4">{ru}</Header>
        <Divider />
      <List divided relaxed>
        {foundProducts.map((item, id) => {
            let quantity = 0;
            order.forEach((element) => {
              if (element._id === item._id) {
                quantity = element.quantity;
              }
            });
          return <List.Item key={id}>
            <Image src={item.imageUrl} style={{ width: 80, height: 50 }} />
            <List.Content>
              <List.Header>{item.ru}</List.Header>
              KZT {item.price}{" "}
              В наличие {item.onSale ? "Есть" : "Нет"}
            </List.Content>
            <List.Content floated="right">
                <div style={{ display: "flex", flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                <Button size='mini' color="blue" inverted icon="plus" onClick={() => onChangeCount("Plus", item, quantity + 1)} />
                <Header as="h5">{quantity}</Header>
                <Button size='mini' color="blue" inverted icon="minus" style={{ marginLeft: 5 }} onClick={() => onChangeCount("Minus", item, quantity - 1)} />
                </div>
            </List.Content>
          </List.Item>
})}
      </List>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, { incrementToOrder, decrementFromOrder })(ListOfFoundProducts);
