import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Menu,
  Grid,
  Header,
  List,
  Image,
  Table,
} from "semantic-ui-react";
import { doGet } from "../../utils/axiosActions";
import { HEROKU_URI } from "../../actions/index";
import defineOrderStatus from "../../utils/defineOrderStatus";
import { Steps } from "antd";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import { formatDMYMS } from '../../utils/helpers';

const { Step } = Steps;

const MyOrders = (props) => {
  const { state } = props;
  const { myOrders } = state;
  const [activeOrder, setActiveOrder] = useState();
  const [order, setOrder] = useState(null);

  const getOrderDetails = (item) => {
    setActiveOrder(item.orderNumber);
    doGet(HEROKU_URI + "order/" + item.orderNumber).then(({ data }) => {
      setOrder(data.data);
    });
  };

  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu pointing vertical>
              {myOrders.map((item, id) => {
                  const date = formatDMYMS(item.orderDate)
                  return <Menu.Item
                  key={id}
                  name={item.orderNumber.toString()}
                  active={activeOrder === item.orderNumber}
                  onClick={() => getOrderDetails(item)}
              >{date}{item.currency} KZT {item.totalPrice}</Menu.Item>
})}
            </Menu>
          </Grid.Column>

          {order === null ? null : (
            <Grid.Column>
              <Segment padded="very">
                <Steps size="small" current={1}>
                  <Step
                    status={defineOrderStatus(order, "new")}
                    title="Новый"
                  />
                  <Step
                    status={defineOrderStatus(order, "accepted")}
                    title="Принят"
                  />
                  <Step
                    status={defineOrderStatus(order, "confirmed")}
                    title="Потвержден"
                  />
                  <Step
                    status={defineOrderStatus(order, "boxed")}
                    title="Укомплектован"
                  />
                  <Step
                    status={defineOrderStatus(order, "ontheway")}
                    title="В пути"
                  />
                  <Step
                    status={defineOrderStatus(order, "delivered")}
                    title="Доставлен"
                  />
                </Steps>
                <Header as="h5">Заказанные продукты: </Header>
                <List divided relaxed>
                  {order.products.map((item, id) => (
                    <List.Item key={id}>
                      <Image
                        src={item.imageUrl}
                        style={{ width: 80, height: 50 }}
                      />
                      <List.Content>
                        <List.Header>{item.ru}</List.Header>
                        {item.currency} {item.price}
                      </List.Content>
                      <List.Content floated="right" style={{ marginRight: 460 }}>
                          <Header as="h5">Количество: {item.quantity}</Header>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as="h5">Время заказа:</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h5">{formatDMYMS(order.orderDate)}</Header>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h5">Сумма заказа:</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h5">KZT {order.totalProductPrice}</Header>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h5">Доставка:</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h5">KZT {order.deliveryPrice}</Header>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h5">Итого:</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h5">KZT {order.totalPrice}</Header>
                      </Table.Cell>
                    </Table.Row>

                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, {})(MyOrders);
