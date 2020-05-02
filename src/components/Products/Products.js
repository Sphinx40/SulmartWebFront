import React from 'react';
import ProductCard from './ProductCard';
import { Segment, Card } from 'semantic-ui-react';

const Products = ({ products }) => {
    return (
        <Card.Group itemsPerRow={4} stackable>
        {
                products.map((item, id) => (
                    <ProductCard product={item} key={id} />
                ))
            }
        </Card.Group>
    )
};

export default Products;