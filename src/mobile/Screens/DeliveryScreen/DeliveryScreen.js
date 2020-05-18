import React, { useState } from "react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { Input, Button, Icon } from "semantic-ui-react";
import Spacer from "../../components/Spacer";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const DeliveryScreen = (props) => {
  const { order, history } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [errors, setErrors] = useState([]);

  const onClickCheckout = () => {
    let errors = [];
    if (name === "") {
      errors.push("Имя не должно быть пустым");
    }
    if (phone === "") {
      errors.push("Заполните телефон номер");
    }
    if (extraPhone === "") {
      errors.push("Заполните дополнительный телефон номер");
    }
    if (order.length === 0) {
      errors.push("Выберите продуктов");
    }
  };

  return (
    <ResponsiveContainer>
      <ScreenHeader
        leftAccessories={() => <Icon name="arrow left" onClick={() => history.push("/basket")} />}
        centerAccessories={() => (
          <h6 style={{ marginTop: 10 }}>Оформление заказа</h6>
        )}
      >
          <Spacer>
            <Input placeholder="Имя" fluid />
            <Spacer />
            <Input placeholder="Телефон" fluid />
            <Spacer />
            <Input placeholder="Дополнительный телефон" fluid />
            <Spacer />
            <Button onClick={onClickCheckout} color='violet'>Оформить</Button>
          </Spacer>
      </ScreenHeader>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.Main.order,
  };
};

export default connect(mapStateToProps, {})(withRouter(DeliveryScreen));
