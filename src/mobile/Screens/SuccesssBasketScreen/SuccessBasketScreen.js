import React from 'react'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { Image } from 'semantic-ui-react';

const SuccessBasketScreen = () => {
    return (
        <ScreenHeader
            bars
            centerAccessories={() => <h6>Заказ успешно оформлен</h6>}
        >
            <Image src="/img/OrderConfirmed.png" />
        </ScreenHeader>
    )
}

export default SuccessBasketScreen;