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
  ItemMeta,
} from "semantic-ui-react";
import "./Home.css";
import { connect } from "react-redux";
import { changeClickedPopularProduct, changeMenu } from "../../actions";
import { Link } from "react-router-dom";
import ResponsiveContainer from '../../components/ResponsiveContainer/ResponsiveContainer';

const Home = (props) => {
  const { state, changeClickedPopularProduct, changeMenu } = props;
  const { popular } = state;
  const [findTenPopular, setFindTenPopular] = useState([]);

  useEffect(() => {
    changeClickedPopularProduct({})
    let products = [];
    popular.map((item) => {
      return item.products.map((item) => {
        if (products.length !== 10) {
          products.push(item);
        }
      });
    });
    setFindTenPopular(products);
  }, [popular]);

  return (
    <ResponsiveContainer>
      <div className='cnn'>
        <Segment basic>
          <Header>Logo</Header>
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
                <img
                  src="/img/BLACK.png"
                  className="d-block w-100"
                  style={{ height: 500 }}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <Button color="red">Заказать</Button>
                </div>
              </div>
              <div className="carousel-item" data-interval="2000">
                <img
                  src="/img/BLUE.png"
                  className="d-block w-100"
                  style={{ height: 500 }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/img/Green.png"
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

        <Segment style={{ padding: "8em 0em" }} vertical>
          <div className='cnn'>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
          <Header>Популярные</Header>
          </Divider>
          </div>
          <Grid stackable container verticalAlign="middle" columns={5}>
            <Grid.Row>
            {findTenPopular.map((item,id) => (
              <Grid.Column key={id}>
                <Card>
                  <Image
                    src={item.imageUrl}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                  <Card.Header>{item.ru}</Card.Header>
                    <Card.Description>
                      {ItemMeta.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                  <Button animated='vertical' color='violet' as={Link} to='/categories' onClick={() => {
                    changeClickedPopularProduct(item)
                    changeMenu("categories")
                    window.scrollTo(0,0)
                  }}>
                    <Button.Content visible>Заказать</Button.Content>
                    <Button.Content hidden><Icon name='shopping cart' /></Button.Content>
                  </Button>
                  </Card.Content>
                </Card>
                { id !== 5 ? <Divider />  : null }
                </Grid.Column>
              ))}
            </Grid.Row>
            
          </Grid>
        </Segment>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Main,
  };
};

export default connect(mapStateToProps, { changeClickedPopularProduct, changeMenu })(Home);