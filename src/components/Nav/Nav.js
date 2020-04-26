import React from "react";
import { Menu, Label, Image, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeMenu } from "../../actions";
import { Link } from "react-router-dom";
import './Nav.css';

const Nav = (props) => {
  const { state, changeMenu } = props;
  const { menu, order } = state;

  const handleItemClick = (e, { name }) => changeMenu(name);

  return (
    <Segment attached="top">
      <div className="cnn">
        <Menu secondary stackable>
          <Menu.Item
            name="Main"
            active={menu === "Main" || menu === ""}
            onClick={handleItemClick}
            as={Link}
            to={`/`}
          >
            Главная
          </Menu.Item>
          <Menu.Item
            name="categories"
            active={menu === "categories"}
            onClick={handleItemClick}
            as={Link}
            to={`/categories`}
          >
            Категории
          </Menu.Item>
          <Menu.Item
            name="basket"
            active={menu === "basket"}
            onClick={handleItemClick}
            as={Link}
            to={`/basket`}
          >
            Корзина
            <Label color="violet">{order.length}</Label>
          </Menu.Item>

          <Menu.Item
            name="orders"
            active={menu === "orders"}
            onClick={handleItemClick}
            as={Link}
            to={`/orders`}
          >
            Мои заказы
          </Menu.Item>
          <Menu.Item position="right">Алматы</Menu.Item>
        </Menu>
      </div>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, { changeMenu })(Nav);
