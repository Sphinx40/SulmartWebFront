import React, { Fragment, useState } from "react";
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
} from "semantic-ui-react";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import Zmap from "../../components/Zmap/Zmap";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

const { Step } = Steps;

const DeliveryOrder = (props) => {
  const { state } = props;
  const { order } = state;

  const [user, setUser] = useState({
    name: '',
    phone: '',
    extraPhone: '',
    street: ''
  });

  const validation = () => {
    let errors = [];

    if (order.length === 0) {
      errors.push("Выберите продукты")
    };
    if (user.name === "") {
      errors.push("Заполните имя")
    };
    if (user.phone === "") {
      errors.push("Заполните телефон")
    };
    if (user.extraPhone === "") {
      errors.push("Заполните дополнительный телефон")
    };
    if (user.street === "") {
      errors.push("Выберите улицу")
    };/* 
    if (errors.length !== 0) {

    }; */
    return errors;
  };

  return (
    <Segment padded="very" color="violet" style={{ margin: 20 }}>
      <Header content="Доставка" textAlign="center" />
{/*       <Steps>
        <Step status="process" title="Адрес" icon={<LoadingOutlined />} />
        <Step status="wait" title="Сделано" icon={<SmileOutlined />} />
      </Steps> */}
      <Divider />
      <QuantityProduct />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
          <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            placeholder="Имя"
                            fluid
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            type="number"
                            placeholder="Телефон"
                            fluid
                          />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Input
                            type="number"
                            placeholder="Дополнительный телефон"
                            fluid
                          />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Input
                            placeholder="Улица"
                            fluid
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <OrderPrice notShowButton={true} />
                  <Divider />
                  <Button color="violet" type="submit" disabled={validation().length === 0 ? false : true}>
                    Оформить
                  </Button>
          </Grid.Column>
          <Grid.Column>
            <Zmap />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => {
  return { state };
}

export default connect(mapStateToProps, {})(DeliveryOrder);
