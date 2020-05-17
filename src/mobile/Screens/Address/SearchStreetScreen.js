import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, List, Icon } from 'semantic-ui-react';

import { onSuggest } from '../../../actions/addressActions';

import { debounce } from 'lodash';

const SearchStreetScreen = props => {
  const ymaps = window.ymaps;
  const { history } = props;
  const { city, onSuggest } = props;
  const [loading, setLoading] = useState(false);

  const [suggestedData, setSuggestedData] = useState([]);

  const onSuggestDebounce = debounce(text => {
    onSuggest(
      ymaps,
      text,
      bool => setLoading(bool),
      city.name,
      result => setSuggestedData(result)
    );
  }, 1000);
  const backToPreviousPageIcon = () => {
    return (
      <Icon
        name='arrow left'
        link
        onClick={() => {
          history.push('/newAddress');
        }}
      />
    );
  };
  return (
    <div>
      <Input
        icon={backToPreviousPageIcon}
        iconPosition='left'
        placeholder='Улица'
        autoFocus
        fluid
        onChange={event => onSuggestDebounce(event.target.value)}
        loading={loading}
      />

      <List divided relaxed>
        {suggestedData.map((item, key) => {
          return (
            <List.Item
              key={key}
              onClick={() => {
                history.push({
                  pathname: '/newAddress',
                  state: { street: item.text }
                });
              }}
            >
              <List.Content>
                <List.Header as='a'>{item.text}</List.Header>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    city: state.address.city
  };
};

export default connect(mapStateToProps, { onSuggest })(SearchStreetScreen);
