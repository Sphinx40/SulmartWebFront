import React, { useState, useEffect } from "react";
import { Card, Image, Header, Placeholder, Button, Icon } from "semantic-ui-react";
import { doGet } from "../../utils/axiosActions";
import {
  HEROKU_URI,
  changeMenu,
  changeClickedPopularProduct
} from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PopularDishCard = (props) => {
  const { product, changeClickedPopularProduct, changeMenu } = props;
  const [image, setImage] = useState("");

  useEffect(() => {
    doGet(HEROKU_URI + `image/PRODUCT/${product.productId}`)
    .then(({ data }) => {
      setImage(data.data[0].dataUrl);
    });
  }, []);


  return (
    <Card raised >
      {image !== "" ? (
        <Image src={image} wrapped />
      ) : (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      )}
      <Card.Content>
        <Card.Header>{product.ru}</Card.Header>
        <Card.Description>
          В наличии Есть
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button animated='vertical' color='violet' as={Link} to="/products" onClick={() => {
            changeClickedPopularProduct({...product,_id: product.productId,onSale: true, show: true});
            changeMenu('products');
            window.scrollTo(0,0);
        }}>
          <Button.Content visible>Заказать</Button.Content>
          <Button.Content hidden><Icon name='shopping cart' /></Button.Content>
        </Button>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { state: state.Main };
};

export default connect(mapStateToProps, { changeClickedPopularProduct, changeMenu })(PopularDishCard);
