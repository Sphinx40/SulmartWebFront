import React, { useState } from "react";
import { Image, Header, Divider, Grid, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import "./HomeScreen.css";
import Spacer from "../../components/Spacer";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { withRouter } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";

const HomeScreen = (props) => {
  const { categories, history } = props;
  return (
    <ResponsiveContainer>
      <ScreenHeader bars centerAccessories={() => <Image src="/img/sulmart.png" size="small" />}>

        <Spacer>
          <Grid columns={2} stackable>
            {categories.map((item, idx) => (
              <Grid.Column
                key={idx}
              >
                <div className="category" 
                onClick={() => history.push(`/${item._id}/products`)}>
                  <Image src={item.image.dataUrl} className="img" />
                  <div className="title">
                    <Header as="h4">{item.ru}</Header>
                  </div>
                </div>
              </Grid.Column>
            ))}
          </Grid>
        </Spacer>

      </ScreenHeader>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.Main.categories,
  };
};

export default connect(mapStateToProps, {})(withRouter(HomeScreen));
