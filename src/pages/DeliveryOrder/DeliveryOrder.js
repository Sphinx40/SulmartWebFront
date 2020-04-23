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
import { connect } from "react-redux";
import NumberFormat from 'react-number-format';
import OutputErrors from "../../utils/OutputErrors";

const DeliveryOrder = (props) => {
  const { state } = props;
  const { order } = state;
  const [user, setUser] = useState({
    name: '',
    phone: '',
    extraPhone: '',
    street: ''
  });

  const [errors, setErrors] = useState([]);

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
    };
    
    return errors;
  };

  const toOrder = () => {
    setErrors(validation());
  };

  return (
    <Segment padded="very" color="violet" style={{ margin: 20 }}>
      <Header content="Доставка" textAlign="center" />
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
                            onChange={(e) => setUser({...user,name: e.target.value})}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                        <NumberFormat 
                          format="+7 (###) ###-##-##"
                          customInput={Input} 
                          onValueChange={(e) => setUser({...user, phone: e.value})} 
                          fluid 
                          mask="_"
                          placeholder='Телефон номер'
                        />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                        <NumberFormat 
                          format="+7 (###) ###-##-##"
                          customInput={Input} 
                          onValueChange={(e) => setUser({...user, extraPhone: e.value})} 
                          fluid 
                          mask="_"
                          placeholder='Дополнительный телефон номер'
                        />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Input
                            placeholder="Улица"
                            fluid
                            onChange={(e) => setUser({...user,street: e.target.value})}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <OrderPrice notShowButton={true} />
                  <Divider />
                  <OutputErrors errors={errors} />
                  <Button color="violet" type="submit" onClick={toOrder}>
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
