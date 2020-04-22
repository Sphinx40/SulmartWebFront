import React from "react";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import { Segment } from "semantic-ui-react";


const Home = ({ searchProduct }) => {
  return (
    <div style={{ margin: 20 }}>
      <Segment color='violet'>   
        <CategoriesMenu />
      </Segment>
    </div>
  );
};

export default Home;
