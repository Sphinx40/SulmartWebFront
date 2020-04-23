import React, { Fragment } from "react";
import { Segment, Label } from "semantic-ui-react";

const OutputErrors = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Segment raised>
      {errors.map((item, id) => (
        <Fragment>
          <Label as="a" style={{ marginTop: 5 }} basic color="red" key={id}>
            {item}
          </Label><br></br>
        </Fragment>
      ))}
    </Segment>
  );
};

export default OutputErrors;
