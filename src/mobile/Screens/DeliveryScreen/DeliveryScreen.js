import React, { useState } from "react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { Input, Button, Icon } from "semantic-ui-react";
import Spacer from "../../components/Spacer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OutputErrors from "../../../utils/OutputErrors";
import NumberFormat from "react-number-format";
import { createOrder, clearOrder } from "../../../actions";

const DeliveryScreen = (props) => {
  const { order, history, selectedAddress, myOrders, createOrder } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [errors, setErrors] = useState([]);

  const validation = () => {
    let errors = [];

    if (name === "") {
      errors.push("Имя не должно быть пустым");
    }
    if (phone === "") {
      errors.push("Заполните телефон номер");
    }
    if (order.length === 0) {
      errors.push("Выберите продуктов");
    }
    if (selectedAddress.longitude === 0 || selectedAddress.latitude === 0) {
      errors.push("Адрес неправильно");
    }

    return errors;
  };

  const onClickCheckout = () => {
    setErrors(validation());
    if (validation().length === 0) {
      createOrder({ name,phone,extraPhone, ...selectedAddress, products: order }, myOrders, () => {
        history.push("/successBasket");
        clearOrder();
      });
    }
  };

  return (
      <ScreenHeader
        leftAccessories={() => (
          <Icon name="arrow left" onClick={() => history.push("/basket")} />
        )}
        centerAccessories={() => <h6>Оформление заказа</h6>}
      >
        <Spacer>
          <Input
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            fluid
          />
          <Spacer />
          <NumberFormat
            format="+7 (###) ###-##-##"
            customInput={Input}
            onValueChange={(e) => setPhone(e.value)}
            fluid
            mask="_"
            placeholder="Телефон номер"
          />
          <Spacer />
          <NumberFormat
            format="+7 (###) ###-##-##"
            customInput={Input}
            onValueChange={(e) => setExtraPhone(e.value)}
            fluid
            mask="_"
            placeholder="Дополнительный телефон номер"
          />
          <OutputErrors errors={errors} />
          <Spacer />
          <Button onClick={onClickCheckout} color="violet">
            Оформить
          </Button>
        </Spacer>
      </ScreenHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.Main.order,
    selectedAddress: state.Main.selectedAddress,
    myOrders: state.Main.myOrders
  };
};

export default connect(mapStateToProps, { createOrder })(withRouter(DeliveryScreen));
