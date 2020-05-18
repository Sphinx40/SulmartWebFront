import React from "react";
import { formatDMYMS } from "../../../utils/helpers";
import { Divider } from "semantic-ui-react";
import Spacer from "../../components/Spacer";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const OrdersScreen = (props) => {
  const { myOrders, history } = props;
  return (
    <div>
      <ScreenHeader
        bars
        centerAccessories={() => <h6 style={{ marginTop: 10 }}>Мои заказы</h6>}
      >
        {myOrders.map((item, idx) => (
          <div className="orderItem" key={idx}>
            <div onClick={() => history.push(`orderDetails/${item.orderNumber}`)}>
              <Spacer>
                <h5>{formatDMYMS(item.orderDate)}</h5>
              </Spacer>
            </div>
            <Divider />
          </div>
        ))}
      </ScreenHeader>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.Main.myOrders,
  };
};

export default connect(mapStateToProps, {})(withRouter(OrdersScreen));
