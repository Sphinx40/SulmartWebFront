import React, { Fragment } from "react";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import {
  Segment,
  Header,
  Divider,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import { clearOrder } from "../../actions";
import { Steps } from "antd";


const { Step } = Steps;

const ShoppingBasket = (props) => {
  const { state, clearOrder } = props;
  const { order } = state;

  return (
    <Segment color="violet" style={{ margin: 20 }} padded="very">
      {order.length !== 0 ? (
        <Fragment>
          <Steps style={{ width: 500, margin: 'auto' }} size="small" current={1}>
            <Step status='process' />
            <Step status="wait" />
            <Step status="wait" />
          </Steps>
          <Header>
            Продукты
            <Button floated="right" onClick={clearOrder} color="red">
              <Icon name="trash alternate" />
              Очистить
            </Button>
          </Header>
          <Divider />
          <QuantityProduct />
          <OrderPrice order={order} />
        </Fragment>
      ) : (
        <Header as="h4">Ваша корзина пуста</Header>
      )}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, { clearOrder })(ShoppingBasket);