import React from 'react';
import { Menu, Label, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeMenu } from '../../actions';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const { state } = props;
  const { menu, order } = state;

  const handleItemClick = (e, { name }) => changeMenu(name)

    return (
      <Menu stackable>
        <Menu.Item>
          <Image src={require('./AltynOrda.png')} size='mini' />
        </Menu.Item>

        <Menu.Item
          name='features'
          active={menu === 'features'}
          onClick={handleItemClick}
          as={Link}
          to={`/`}
        >Home</Menu.Item>

        <Menu.Item
          name='testimonials'
          active={menu === 'testimonials'}
          onClick={handleItemClick}
          as={Link}
          to={`/Корзина`}
        >
          Корзина
          <Label color='violet'>
            {order.length}
          </Label>
        </Menu.Item>
      </Menu>
    )
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps,{})(Nav);