import React from "react";
import { Image, Header, Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import "./HomeScreen.css";
import Spacer from "../../components/Spacer";
import { withRouter } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";

const HomeScreen = (props) => {
  const { categories, history } = props;
  return (
      <ScreenHeader bars centerAccessories={() => <Image src="/img/sulmart.png" size="small" />}>

        <Spacer>
          <Button color="teal" content="Мои местоположения" icon="map outline" onClick={() => history.push("addressList")} />
          <Spacer size={20} />
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
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.Main.categories,
  };
};

export default connect(mapStateToProps, {})(withRouter(HomeScreen));
