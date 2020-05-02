import React, { useState } from "react";
import {
  Segment,
  Grid,
  Header,
  List,
  Image,
  Table,
  Divider
} from "semantic-ui-react";
import { doGet } from "../../utils/axiosActions";
import { HEROKU_URI } from "../../actions/index";
import defineOrderStatus from "../../utils/defineOrderStatus";
import { Steps } from "antd";
import { connect } from 'react-redux';
import { formatDMYMS } from '../../utils/helpers';
import Menu from './Menu';
import ResponsiveContainer from '../../components/ResponsiveContainer/ResponsiveContainer';

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
    <ResponsiveContainer>
      <Segment>
      <Grid columns="equal" stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <Menu myOrders={myOrders} activeOrder={activeOrder} getOrderDetails={(param) => getOrderDetails(param)} />
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
                <Divider />
                <Header as="h5">Заказанные продукты: </Header>
                <Table>
                  <Table.Body>

                  {order.products.map((item, id) => (
                    <Table.Row key={id}>
                    <Table.Cell>
                      <Header as='h4' image>
            <Image src={item.imageUrl} style={{ width: 80, height: 50 }} rounded size='mini' />
            <Header.Content>
            {item.ru}
              <Header.Subheader>Количество: {item.quantity}</Header.Subheader>
            </Header.Content>
          </Header>
                    </Table.Cell>
                  </Table.Row>
                  ))}
                    
                    

                  </Table.Body>
                </Table>

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
      </Grid></Segment>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, {})(MyOrders);
