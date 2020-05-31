import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Card,
  Container,
  Placeholder,
} from "semantic-ui-react";
import "./Home.css";
import ResponsiveContainer from "../../components/ResponsiveContainer/ResponsiveContainer";
import PopularDishes from "./PopularDishes";
import Comments from "./Comments";
import { Steps } from "antd";

const { Step } = Steps;

const Home = () => {
  const [onLoadImage, setOnLoadImage] = useState(false);

  return (
    <ResponsiveContainer>
      <div className="cnn">
        <Segment basic>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image src="/img/sulmart.png" size="medium" />
            <Header>Удобная онлайн покупка</Header>
          </div>

          <div
            id="carouselExampleInterval"
            className="carousel slide carousel-fade"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleInterval"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleInterval" data-slide-to="1"></li>
              <li data-target="#carouselExampleInterval" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="2000">
                {onLoadImage ? null : (
                  <Placeholder style={{ height: 500 }} fluid>
                    <Placeholder.Image square />
                  </Placeholder>
                )}
                <div style={onLoadImage ? {} : { display: "none" }}>
                  <img
                    src="/img/sulmart1.jpg"
                    className="d-block w-100"
                    style={{ height: 500 }}
                    alt="..."
                    onLoad={() => setOnLoadImage(true)}
                  />
                </div>
                <div className="carousel-caption d-none d-md-block"></div>
              </div>
              <div className="carousel-item" data-interval="2000">
                <img
                  src="/img/sulmart2.jpg"
                  className="d-block w-100"
                  style={{ height: 500 }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/img/sulmart3.jpg"
                  className="d-block w-100"
                  style={{ height: 500 }}
                  alt="..."
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleInterval"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleInterval"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </Segment>
      </div>

      <Segment style={{ padding: 20 }} basic vertical>
        <div className="cnn">
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            ДОСТАВКА ПРОДУКТОВ ПИТАНИЯ НА ДОМ С ПОМОЩЬЮ ОНЛАЙН-СЕРВИСА
            SULMART.KZ
          </Divider>
        </div>
        <Container>
          <Header as="h4">Режим работы доставки</Header>
          <p>
            Доставка продуктов осуществляется со вторника по воскресенье.
            Понедельник – выходной день. Время доставки <b>с 15.00 по 21.00.</b>
          </p>
          <Header as="h4">Время исполнения заказа</Header>
          <p>
            При поступлении заказа <b>до 13.00</b> доставка осуществляется в этот же
            день, <b>после 13.00</b> доставка будет выполнена на следующий день.
          </p>
          <Header as="h4">Время работы Call-центра с 10.00 до 21.00.</Header>
          <Header as="h4">Стоимость доставки</Header>
          <p>
            При заказе на сумму свыше <b>20000тг.</b> Доставка продуктов осуществляется
            <b> БЕСПЛАТНО</b> Менее <b>20000тг</b> доставка <b>800тг.</b> Минимальный заказ <b>7000тг.</b><br />
            При полном возврате товара производится оплата доставки <b>800тг.</b>
          </p>
          <Header as="h4" color="red">
            {" "}
            Если в нашем каталоге отсутствует необходимый вам товар, Вы всегда
            можете сделать индивидуальный заказ, позвонив нам или отправить
            заявку по электронной почте.
          </Header>
        </Container>
      </Segment>

      <Segment style={{ padding: 20 }} basic vertical>
        <div className="cnn">
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            Доставка продуктов по городу Алматы
          </Divider>
        </div>
        <Container>
          <Steps style={{ height: 500 }} direction="vertical" size="small">
            <Step
              status="process"
              title="Выберите наименование продукта на сайте sulmart.kz."
            />
            <Step
              status="process"
              title="Добавьте товары в корзину, заполните контактные данные и укажите адрес."
            />
            <Step
              status="process"
              title="С вами свяжется наш сотрудник, для подтверждения заказа."
            />
            <Step
              status="process"
              title="После отправки заказа курьер уточнит ваше место нахождения и время своего прибытия."
            />
            <Step
              status="process"
              title="Оплата осуществляется курьеру наличными или безналичными на карточку Kaspi Gold, указанный курьером."
            />
          </Steps>
        </Container>
      </Segment>

      <Segment style={{ padding: 20 }} basic vertical>
        <div className="cnn">
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            Популярные
          </Divider>
        </div>

        <PopularDishes />
      </Segment>

      <Container>
        <Comments />
      </Container>
    </ResponsiveContainer>
  );
};

export default Home;
