import React from "react";
import { Card, Icon, Image, Header, Divider, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import "./HomeScreen.css";
import Spacer from "../../components/Spacer";
import ResponsiveContainer from "../../components/ResponsiveContainer";

const HomeScreen = (props) => {
  const { categories } = props;

  return (
    <ResponsiveContainer>
      <Image src="/img/sulmart.png" size="small" />
      <Divider hidden />
      <Spacer>
        <Grid columns={2} stackable>
          {categories.map((item, idx) => (
            <Grid.Column key={idx}>
              <div className="category">
                <Image src={item.image.dataUrl} className="img" />
                <div className="title">
                  <Header inverted as="h4">
                    {item.ru}
                  </Header>
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      </Spacer>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.Main.categories,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
