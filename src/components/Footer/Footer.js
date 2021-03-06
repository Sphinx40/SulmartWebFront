import React from 'react';
import { Header, List, Grid, Segment, Container, Divider, Image, Icon } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted style={{ margin: '5em 0em 0em', padding: '5em 0em' }} vertical>
  <Container textAlign='center'>
    <Grid columns={3} divided stackable inverted>
      <Grid.Row>
        <Grid.Column>
          <Header inverted as='h4' content='Гарантии' />
          <p>Спешите ! Из-за того что у нас самые низкие цены, заказов очень много.
          В случае если Ваш заказ не оформлен на сегодня, не беспокойтесь! 
          Ваш заказ будет исполнен на следующий день!</p>
        </Grid.Column>
        <Grid.Column>
          <Header inverted as='h4' content='Контакты' />
          <List link inverted>
            <List.Item as='a'>390503@mail.ru</List.Item>
            <List.Item as='a'>Ежедневно с 8:00 до 18:00</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column>
          <Header inverted as='h4' content='Sulmart Онлайн заказы с доставкой на дом' />
          <p>
            Овощи, фрукты и другие продовольственные товары с доставкой на дом по самой низкой цене по городу
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider inverted section />
    <Image src='/img/sulmart.png' centered size='small' />
    <Header as='h4' inverted><Icon name='copyright outline' size='small' />Sulmart</Header>
    <Header as='h6' inverted>Все права защищены</Header>
  </Container>
</Segment>
);

export default Footer;