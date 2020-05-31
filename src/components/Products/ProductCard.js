import React, { useState, useEffect } from "react";
import { Card, Image, Header, Placeholder, Button, Label } from "semantic-ui-react";
import { doGet } from "../../utils/axiosActions";
import {
  HEROKU_URI,
  incrementToOrder,
  decrementFromOrder,
} from "../../actions";
import { connect } from "react-redux";

const ProductCard = (props) => {
  const { product, state, incrementToOrder, decrementFromOrder } = props;
  const { order } = state;
  let quantity = 0;
  const [image, setImage] = useState("");

  useEffect(() => {
    getImageOfProduct()
    return () => {
      setImage("")
    }
  }, []);

  const getImageOfProduct = () => {
    doGet(HEROKU_URI + `image/PRODUCT/${product._id}`).then(({ data }) => {
      setImage(data.data[0].dataUrl);
    });
  }

    order.forEach((element) => {
      if (element._id === product._id) {
        quantity = element.quantity;
      }
    });

  const onClickAction = (text, quantity) => {
    if (text === "Plus") {
      incrementToOrder({...product, imageUrl: image}, quantity);
    } else {
      decrementFromOrder({...product, imageUrl: image}, quantity);
    }
  };

  if (!product.show) {
    return null;
  }

  return (
    <Card raised style={{ width: 250 }}>
      {image !== "" ? (
        <Image src={image} wrapped />
      ) : (
        <Placeholder>
          <Placeholder.Image style={{ height: 150, width: 166 }} />
        </Placeholder>
      )}
      <Card.Content>
        <Card.Header>{product.ru} 
        <Label as='a' color='red' size='small' style={{ float: 'right'}} tag>
          KZT {product.price}
        </Label></Card.Header>
        <Card.Description>
          В наличии {product.onSale === true ? "Есть" : "Нет"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div style={{ marginRight: 10 }}>
            <Button color="blue" disabled={!product.onSale} inverted icon="plus" size="small" onClick={() => onClickAction('Plus', quantity+1)} />
          </div>
          <div style={{ marginTop: 7 }}>
            <Header>{quantity}</Header>
          </div>
          <div style={{ marginLeft: 15 }}>
            <Button color="blue" disabled={!product.onSale} inverted icon="minus" size="small" onClick={() => onClickAction('Minus', quantity-1)} />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { state: state.Main };
};

export default connect(mapStateToProps, {
  incrementToOrder,
  decrementFromOrder,
})(ProductCard);
