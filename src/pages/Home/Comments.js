import React, { Fragment, useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { sendMessage } from "../../actions";
import { connect } from "react-redux";

const Comments = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const onSendMessage = () => {
    if (text) {
      sendMessage(text, () => {
        setText("")
      });
    }
  };
  
  return (
    <Fragment>
      <Header as="h3" dividing>
        Оставить отзыв
      </Header>

      <Form reply>
        <Form.TextArea onChange={(e) => setText(e.target.value)} />
        <Button
          onClick={onSendMessage}
          content="Отправить"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { sendMessage })(Comments);
