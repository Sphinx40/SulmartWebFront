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
  Placeholder,
} from "semantic-ui-react";
import "./Home.css";
import ResponsiveContainer from "../../components/ResponsiveContainer/ResponsiveContainer";
import PopularDishes from './PopularDishes';

const Home = () => {
  const [onLoadImage, setOnLoadImage] = useState(false);

  return (
    <ResponsiveContainer>
      <div className="cnn">
        <Segment basic>
         <Grid stackable columns='equal'>
           <Grid.Row>
             <Grid.Column>
              <Image src='/img/sulmart.png' />
             </Grid.Column>
             <Grid.Column>
               <div style={{ marginRight: 200 }}>
              <Header>Удобная онлайн покупка</Header>
              </div>
             </Grid.Column>
           </Grid.Row>
          </Grid> 
            
        
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
                    src='/img/sulmart1.jpg'
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
                  src='/img/sulmart2.jpg'
                  className="d-block w-100"
                  style={{ height: 500 }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src='/img/sulmart3.jpg'
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
        <div className="cnn">
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <Header>Популярные</Header>
          </Divider>
        </div>
        <PopularDishes />
      </Segment>
    </ResponsiveContainer>
  );
};

export default Home;
