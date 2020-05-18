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
    <ResponsiveContainer>
      <ScreenHeader
        bars
        centerAccessories={() => (
          <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <h6>Корзина</h6>
            <Icon name="shopping cart" color='violet' />
          </div>
        )}
      >
          {
            order.length === 0 ?
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              <Image src='/img/EmptyShoppingBasket.png' size='medium'/>
              <h6>Ваша корзина пуста</h6>
            </div> : 
            <div>
            <QuantityProduct />
            <OrderPrice order={order} />
            </div>
          }
            
      </ScreenHeader>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.Main.order
  };
};

export default connect(mapStateToProps, { })(BasketScreen);
