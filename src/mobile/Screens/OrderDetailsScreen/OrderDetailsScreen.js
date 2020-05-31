import React, { useEffect, useState } from "react";
import { doGet } from "../../../utils/axiosActions";
import { HEROKU_URI } from "../../../actions/index";
import { connect } from "react-redux";
import Spacer from "../../components/Spacer";
import { List, Image, Divider, Icon, Loader, Header } from "semantic-ui-react";
import OrderPrice from "../../../components/OrderPrice/OrderPrice";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { withRouter } from "react-router-dom";

const OrderDetailsScreen = (props) => {
  const { orderNumberRandom, orderStatuses, history } = props;
  const [order, setOrder] = useState();

  useEffect(() => {
    doGet(HEROKU_URI + "order/" + orderNumberRandom).then(({ data }) => {
      setOrder(data.data);
    });
  }, [orderNumberRandom]);

  const findStatus = (value) => {
    const foundStatus = orderStatuses.find((item) => item.value === value);
    return foundStatus.ru;
  };

  return (
    <div>
      <ScreenHeader
        leftAccessories={() => (
          <Icon name="arrow left" onClick={() => history.push("/orders")} />
        )}
        centerAccessories={() => <h6>Заказ</h6>}
      >
        <Spacer>
          {order ? (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6>Статус заказа: </h6>
                <h6 style={{ marginLeft: 20 }}>{findStatus(order.status)}</h6>
              </div>
              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ textTransform: "uppercase" }}
              >
                Продукты
              </Divider>
              <List>
                {order.products.map((item, idx) => (
                  <List.Item key={idx}>
                    <Image
                      src={item.imageUrl}
                      style={{ width: 80, height: 50, borderRadius: 10 }}
                    />
                    <List.Content>
                      <List.Header>{item.ru}</List.Header>
                      {item.currency} {item.price}
                    </List.Content>
                  </List.Item>
                ))}
              </List>
              <OrderPrice
                order={order.products}
                totalPrice
                deliveryPrice={order.deliveryPrice}
                notShowButton
              />
            </div>
          ) : <Loader active inline='centered' />}
        </Spacer>
      </ScreenHeader>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderStatuses: state.Main.orderStatuses,
  };
};

export default connect(mapStateToProps, {})(withRouter(OrderDetailsScreen));
