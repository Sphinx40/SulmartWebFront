import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { doGet } from "../../../utils/axiosActions";
import { HEROKU_URI } from "../../../actions/index";
import "./Product.css";
import { Image, Button, Placeholder } from "semantic-ui-react";
import { incrementToOrder, decrementFromOrder } from "../../../actions/index";

const Product = ({ product, order, incrementToOrder, decrementFromOrder }) => {
  const [image, setImage] = useState("");
  let quantity = 0;

  useEffect(() => {
    setImage("");
    doGet(HEROKU_URI + `image/PRODUCT/${product._id}`).then(({ data }) => {
      setImage(data.data[0].dataUrl);
    });
    return () => {
      setImage("");
    };
  }, [product]);

  order.forEach((element) => {
    if (element._id === product._id) {
      quantity = element.quantity;
    }
  });

  const onChangeCount = (text, quantity) => {
    if (text === "Plus") {
      incrementToOrder({...product, imageUrl: image}, quantity);
    } else {
      decrementFromOrder({...product, imageUrl: image}, quantity);
    }
  };

  return (
      <div className="product">
        {image !== "" ? (
          <Image src={image} className="productImage" wrapped />
        ) : (
          <Placeholder>
            <Placeholder.Image style={{ height: 75, width: 200 }} />
          </Placeholder>
        )}
        <div className="title">
          <h6 style={{ color: 'white'}}>{product.ru}</h6>
        </div>
        {image === "" ? null :
        <div className="actions">
          <Button
            icon="plus"
            color="blue"
            size="mini"
            inverted
            onClick={() => onChangeCount("Plus", quantity + 1)}
          />
          <h6 style={{ color: 'white'}}>{quantity}</h6>
          <Button
            icon="minus"
            color="blue"
            size="mini"
            inverted
            onClick={() => onChangeCount("Minus", quantity - 1)}
          />
        </div>}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.Main.order,
  };
};

export default connect(mapStateToProps, {
  incrementToOrder,
  decrementFromOrder,
})(Product);
