import React from "react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { Icon, Image } from "semantic-ui-react";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import Spacer from "../../components/Spacer";
import { connect } from "react-redux";
import QuantityProduct from '../../../components/QuantityProduct/QuantityProduct';
import OrderPrice from '../../../components/OrderPrice/OrderPrice';

const BasketScreen = (props) => {
  const { order = [] } = props;

  return (
      <ScreenHeader
        bars
        centerAccessories={() => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h6>Корзина</h6>
            <Icon name="shopping cart" color='violet' />
          </div>
        )}
      >
          {
            order.length === 0 ?
            <div>
              <Image src='/img/EmptyShoppingBasket.png' size='medium' style={{ margin: 'auto' }}/>
              <h6 style={{ textAlign: 'center' }}>Ваша корзина пуста</h6>
            </div> : 
            <div>
            <QuantityProduct />
            <OrderPrice order={order} />
            </div>
          }
            
      </ScreenHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.Main.order
  };
};

export default connect(mapStateToProps, { })(BasketScreen);
