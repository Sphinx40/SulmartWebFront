import React, { useState, useEffect, Fragment } from 'react'
import { connect } from "react-redux";
import { changeClickedPopularProduct, getPopularDishes } from "../../actions";
import {
    Card,
    Container
  } from "semantic-ui-react";
import PopularDishCard from './PopularDishCard';

const PopularDishes = (props) => {
  const { state, changeClickedPopularProduct, getPopularDishes } = props;
  const { popularDishes } = state;
  

  useEffect(() => {
    changeClickedPopularProduct({});
    if (popularDishes.length === 0) {
        getPopularDishes()
    }
  }, []);

    return (
        <Container>
            <Card.Group itemsPerRow={4} stackable>
                  {
                      popularDishes.map((item,idx) => (
                        <PopularDishCard product={item} key={idx} />
                      ))
                  }
              </Card.Group>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        state: state.Main
    }
}

export default connect(mapStateToProps,{ changeClickedPopularProduct, getPopularDishes })(PopularDishes);
