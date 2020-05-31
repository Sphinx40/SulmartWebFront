import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "../../components/Product/Product";
import { Grid, Input, Icon } from "semantic-ui-react";
import Spacer from "../../components/Spacer";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { withRouter } from "react-router-dom";

const ProductsScreen = (props) => {
  const { categoryId, categories, history } = props;
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (products.length === 0 && productList.length === 0) {
      let findProducts = [];
      categories.map((item) => {
        item.subCategories.map((item) => {
          findProducts.push(item.products);
        });
      });
      setProducts(findProducts.flat(Infinity));
      setProductList(findProducts.flat(Infinity));
    }
  }, [categoryId, categories]);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      if (search !== "") {
        let foundproducts = products.filter((product) => {
          return (
            product.ru
              .toLowerCase()
              .toUpperCase()
              .indexOf(search.toLowerCase().toUpperCase()) !== -1
          );
        });
        setProductList(foundproducts);
      } else {
        setProductList(products);
      }
    }
  };

  const onChangeSearch = (event) => {
    if (event === "") {
      setProductList(products);
    } else {
      setSearch(event);
    }
  };

  return (
    <ScreenHeader
      centerAccessories={() => <h6>Продукты</h6>}
      leftAccessories={() => (
        <Icon name="arrow left" onClick={() => history.push("/")} />
      )}
    >
      <Spacer>
        <Input
          placeholder="Продукт"
          fluid
          icon="search"
          onChange={(e) => onChangeSearch(e.target.value)}
          onKeyDown={onSearch}
        />
        <Spacer />
        <div style={{ marginLeft: 25, marginTop: 10 }}>
          <Grid columns={2}>
            <Grid.Row>
              {productList.map((item, idx) => (
                <Grid.Column key={idx}>
                  <Product product={item} key={idx} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
      </Spacer>
    </ScreenHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.Main.categories,
  };
};

export default connect(mapStateToProps, {})(withRouter(ProductsScreen));
