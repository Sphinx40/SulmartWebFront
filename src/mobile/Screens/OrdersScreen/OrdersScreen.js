import React from "react";
import { formatDMYMS } from "../../../utils/helpers";
import { Divider, Label, Image } from "semantic-ui-react";
import Spacer from "../../components/Spacer";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const OrdersScreen = (props) => {
  const { myOrders, history } = props;
  return (
    <ScreenHeader bars centerAccessories={() => <h6>Мои заказы</h6>}>
      
      {myOrders.length === 0 ?
      <div style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
        <Image src="/img/EmptyOrders.png" />
        <h6>У вас нет заказов</h6>
      </div>
      :
      myOrders.map((item, idx) => (
        <div className="orderItem" key={idx}>
          <div onClick={() => history.push(`orderDetails/${item.orderNumber}`)}>
            <Spacer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5>{formatDMYMS(item.orderDate)}</h5>
                <Label color="teal" size="small">
                  KZT {item.totalPrice}
                </Label>
              </div>
            </Spacer>
          </div>
          <Divider />
        </div>
      ))}
    </ScreenHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.Main.myOrders,
  };
};

export default connect(mapStateToProps, {})(withRouter(OrdersScreen));
