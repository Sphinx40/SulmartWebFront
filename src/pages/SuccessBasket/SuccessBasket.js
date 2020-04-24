import React, { useState } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Steps } from "antd";

const { Step } = Steps;

const SuccessBasket = () => {
    return (
        <Segment padded='very' style={{ margin: 20 }}>
            <Steps style={{ width: 500, margin: 'auto' }} size="small" current={1}>
            <Step status='finish' />
            <Step status="finish" />
            <Step status="finish" />
          </Steps>
            <Header textAlign='center'>Заказ успешно оформлен</Header>
        </Segment>
    );
};

export default SuccessBasket;