import React, { Fragment } from 'react';
import QuantityProduct from '../../components/QuantityProduct/QuantityProduct';
import { Segment, Header, Divider, Button, Icon, Image, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import OrderPrice from '../../components/OrderPrice/OrderPrice';
import { clearOrder } from '../../actions';

const ShoppingBasket = (props) => {
    const { state, clearOrder } = props;
    const { order } = state;

    return (
        <Segment color='violet' style={{ margin: 20 }} padded='very'>
            {order.length !== 0 ?
            <Fragment>
            <Header>Продукты
            <Button floated='right' onClick={clearOrder} color='red'><Icon name='trash alternate' />Очистить</Button>
            </Header>
            <Divider />
            <QuantityProduct />
            <OrderPrice /></Fragment> : 
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column><Image src='/img/EmptyShoppingBasket.png' size='medium' /></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column><Header as='h4'>Ваша корзина пуста</Header></Grid.Column>
                </Grid.Row>
            </Grid>}
        </Segment>
    )
};

const mapStateToProps = state => {
    return { state };
}

export default connect(mapStateToProps,{ clearOrder })(ShoppingBasket);