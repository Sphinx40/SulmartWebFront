import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  Dropdown,
} from 'semantic-ui-react';

const AddreesListScreen = (props) => {
  const { history, ymaps } = props;
  return 'address list';
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(AddreesListScreen);
