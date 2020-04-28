import React, { Fragment } from "react";
import { List } from "semantic-ui-react";
import ProductItems from "./ProductItems";

const FindProducts = ({
  searchProduct,
  stopLoading,
  categories,
}) => {
  let foundProducts = [];
  
    // categories
    categories.forEach((element) => {
      // subCategories
      element.subCategories.forEach((item) => {
        // products
        const resultOfSearchProduct = item.products.filter((product) => {
          if (searchProduct !== "") {
            return (
              product.ru
                .toLowerCase()
                .toUpperCase()
                .indexOf(searchProduct.toLowerCase().toUpperCase()) !== -1
            );
          }
        });
        item.products.forEach((elem) => {
          // we're finding element of products in resultOfSearchProduct
          resultOfSearchProduct.forEach((el) => {

            if (elem._id === el._id && elem.show) {
              // if we're finding product, we're finding this product in foundProducts
              // Because if 2-3 products have same category, we're putting products together with category
              const idx = foundProducts.findIndex(
                ({ _id }) => _id === element._id
              );
              const newProductsForFoundProducts = {
                _id: element._id,
                ru: element.ru,
                products: [elem]
              };
              if (idx >= 0) {
                foundProducts[idx].products.push(elem);
              } else {
                foundProducts.push(newProductsForFoundProducts);
              }
            }
          });
        });
      });
    });

  setTimeout(() => stopLoading(), 500);

  return (
    <Fragment>
      <List>
        {foundProducts.map((item, id) => {
          return <ProductItems key={id} foundProducts={item.products} ru={item.ru} />;
        })}
      </List>
    </Fragment>
  );
};

export default FindProducts;