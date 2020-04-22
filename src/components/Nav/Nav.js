import React from 'react';
import { Menu, Label, Image, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeMenu } from '../../actions';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const { state, changeMenu } = props;
  const { menu, order } = state;

  const handleItemClick = (e, { name }) => changeMenu(name)

    return (
      <Segment attached='top'>
      <Menu secondary>
        <Menu.Item
          name='Menu'
          active={menu === 'Menu' || menu === ''}
          onClick={handleItemClick}
          as={Link}
          to={`/`}
        >Меню</Menu.Item>

        <Menu.Item
          name='ShoppingBasket'
          active={menu === 'ShoppingBasket'}
          onClick={handleItemClick}
          as={Link}
          to={`/ShoppingBasket`}
        >
          Корзина
          <Label color='violet'>
            {order.length}
          </Label>
        </Menu.Item>
        <Menu.Item position='right'>
          Алматы
        </Menu.Item>
      </Menu></Segment>
    )
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps,{ changeMenu })(Nav);