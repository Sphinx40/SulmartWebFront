import React, { useState, Fragment, useEffect } from "react";
import {
  Menu,
  Segment,
  Header,
  Grid,
  List,
  Image,
  Button,
  Accordion,
  Divider,
  Input,
} from "semantic-ui-react";
import {
  getCategories,
  incrementToOrder,
  decrementFromOrder
} from "../../actions";
import { connect } from "react-redux";
import QuantityProduct from "../QuantityProduct/QuantityProduct";
import OrderPrice from "../OrderPrice/OrderPrice";
import FindProducts from "../FindProducts/FindProducts";
import ProductImages from "../ProductImages/ProductImages";
import ResponsiveContainer from '../ResponsiveContainer/ResponsiveContainer';

const CategoriesMenu = (props) => {
  const {
    state,
    getCategories,
    incrementToOrder,
    decrementFromOrder
  } = props;

  const { categories, order, clickedPopularProduct } = state;
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [activeImages, setActiveImages] = useState(false);
  const [activeImageId, setActiveImageId] = useState();
  const [activeCategory, setActiveCategory] = useState();

  // we figure out last time which component is actived
  // we must have in onActive FindProducts or Products
  // we are showing up FindProducts or Products using onActive
  const [onActive, setOnActive] = useState("Products");

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    if (Object.keys(clickedPopularProduct).length !== 0) {
      setProducts([clickedPopularProduct]);
    }
  }, []);

  useEffect(() => {
    if (
      categories.length !== 0 &&
      Object.keys(clickedPopularProduct).length === 0 &&
      products.length === 0
    ) {/* 
      let products = [];
      categories[0] */
      setProducts(categories[0].subCategories[0].products);
    }
  }, [categories]);

  // we'll have products of subCategory
  const onClickCategory = (category) => {
    let products = []
    category.subCategories.map((item) => {
      products.push(...item.products)
    })
    setActiveCategory(category.ru)
    setProducts(products)
    setOnActive("Products");
    setActiveImages(false);
    setImages([]);
  };

  // we are clicking plus or minus button
  // increment or decrement are going to reducer and we are changing quantity
  const onClickAction = (text, item, quantity) => {
    if (text === "Plus") {
      incrementToOrder(item, quantity);
    } else {
      decrementFromOrder(item, quantity);
    }
  };

  const onChangeSearchProduct = (e) => {
    setIsLoading(true);
    setSearchProduct(e.target.value);
    setOnActive("FindProducts");
    if (e.target.value === "") {
      setOnActive("Products")
      setIsLoading(false)
    }
  };

  const onHandleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchProduct !== "") {
        setIsLoading(true);
        setOnActive("FindProducts");
      }
    }
  };

  return (
    <ResponsiveContainer>
    <div style={{ margin: 40 }}>
      <Grid columns={3} stackable>
        <Grid.Row>
          <Grid.Column>
            <Header textAlign="center">Меню</Header>
              <div>
              <Menu vertical>
                {categories.map((item, id) => (
                  <Menu.Item
                    key={id}
                    name={item.ru}
                    active={activeCategory === item.ru}
                    onClick={() => onClickCategory(item)}
                  />
                ))}
              </Menu>
              </div>
            {order.length === 0 ? null : (
              <Segment>
                <QuantityProduct />
                <OrderPrice order={order} />
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column width={10} >
            <div>
              <Input
                placeholder="Введите товар"
                fluid
                icon="search"
                onChange={onChangeSearchProduct}
                onKeyDown={onHandleKeyDown}
                loading={isLoading}
              />
            
            
            {onActive === "Products" ? (
              renderProductsWithOrderQuantity(
                products,
                order,
                onClickAction,
                (images, id) => {
                  setImages(images);
                  setActiveImages((prev) => !prev);
                  setActiveImageId(id);
                },
                images,
                activeImages,
                activeImageId
              )
            ) : (
              <FindProducts
                searchProduct={searchProduct}
                stopLoading={() => setIsLoading(false)}
                categories={categories}
              />
            )}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment basic style={{ height: 300 }}></Segment>
    </div>
    </ResponsiveContainer>
  );
};

const renderProductsWithOrderQuantity = (
  products,
  order,
  onClickAction,
  onClickProduct,
  images,
  activeImages,
  activeImageId
) => {
  return (
    <Segment attached="top">
      <List divided relaxed>
        {products.map((item, id) => {
          let quantity = 0;
          order.forEach((element) => {
            if (element._id === item._id) {
              quantity = element.quantity;
            }
          });
          if (item.show) {
            return (
              <Fragment key={id}>
                <List.Item>
                  <Image
                    src={item.imageUrl}
                    style={{ width: 70, height: 40, cursor: "pointer" }}
                    onClick={() => onClickProduct(item.images, id)}
                  />
                  <List.Content>
                    <List.Header
                      style={{ cursor: "pointer" }}
                      onClick={() => onClickProduct(item.images, id)}
                    >
                      {item.ru}
                    </List.Header>
                    {item.currency} {item.price} В наличии{" "}
                    {item.onSale ? "Есть" : "Нет"}
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
                        disabled={!item.onSale}
                        style={{ marginRight: 10 }}
                        onClick={() =>
                          onClickAction("Plus", item, quantity + 1)
                        }
                      />
                      <Header content={quantity} />
                      <Button
                        size="mini"
                        color="blue"
                        inverted
                        icon="minus"
                        style={{ marginLeft: 5 }}
                        disabled={!item.onSale}
                        style={{ marginLeft: 10 }}
                        onClick={() =>
                          onClickAction("Minus", item, quantity - 1)
                        }
                      />
                    </div>
                  </List.Content>
                </List.Item>
                {activeImages && activeImageId === id ? (
                  <ProductImages images={images} />
                ) : null}
              </Fragment>
            );
          }
        })}
      </List>
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  incrementToOrder,
  decrementFromOrder
})(CategoriesMenu);
