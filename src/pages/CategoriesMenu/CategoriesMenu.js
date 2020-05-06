import React, { useState, Fragment, useEffect } from "react";
import {
  Menu,
  Segment,
  Header,
  Grid,
  Divider,
  Input,
  Image
} from "semantic-ui-react";
import {
  getCategories
} from "../../actions";
import { connect } from "react-redux";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import FindProducts from "../../components/FindProducts/FindProducts";
import Products from '../../components/Products/Products';
import ResponsiveContainer from '../../components/ResponsiveContainer/ResponsiveContainer';

const CategoriesMenu = (props) => {
  const {
    state,
    getCategories
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
    ) {
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
      <Grid columns='equal' stretched stackable>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={3}>
              <Menu vertical stackable fluid>
              <Menu.Item><Header textAlign='center'>Меню</Header></Menu.Item>
                {categories.map((item, id) => (
                  <Menu.Item
                    key={id}
                    active={activeCategory === item.ru}
                    onClick={() => onClickCategory(item)}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div><Image src={item.image.dataUrl} style={{ width: 60, height: 40, borderRadius: 7 }} /></div>
                    <div style={{ marginLeft: 5 }}><Header as='h5'>{item.ru}</Header></div>
                  </div>
                </Menu.Item>
                ))}
              </Menu>
            {order.length === 0 ? null : (
              <Fragment>
                <QuantityProduct />
                <OrderPrice order={order} />
                </Fragment>
            )}
          </Grid.Column>
          <Grid.Column >
            <Segment>
              <Input
                placeholder="Введите товар"
                fluid
                icon="search"
                onChange={onChangeSearchProduct}
                onKeyDown={onHandleKeyDown}
                loading={isLoading}
              />
            <Divider />
            {onActive === "Products" ? (
              <Products products={products} order={order} />
            ) : (
              <FindProducts
                searchProduct={searchProduct}
                stopLoading={() => setIsLoading(false)}
                categories={categories}
              />
            )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment basic style={{ height: 300 }}></Segment>
    </div>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, {
  getCategories
})(CategoriesMenu);
