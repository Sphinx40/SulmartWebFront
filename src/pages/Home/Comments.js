import React, { Fragment, useState, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { sendMessage } from "../../actions";
import ReCaptcha from "react-recaptcha";
import { connect } from "react-redux";

const Comments = () => {
  let recaptchaInstance;
  const [text, setText] = useState("");

  const onSendMessage = () => {
    if (text) {
      sendMessage(text);
    }
  };
  return (
    <Fragment>
      <ReCaptcha
        ref={(e) => (recaptchaInstance = e)}
        render="explicit"
        sitekey="6Lf2a_MUAAAAAI8r305pcsyO4jtM4nam9qEDHLXG"
      />
      <Header as="h3" dividing>
        Оставьте отзыв
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
