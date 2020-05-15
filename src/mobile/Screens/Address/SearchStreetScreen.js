import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
  List,
  Radio,
  Icon,
} from 'semantic-ui-react';
import { doGet } from '../../../utils/axiosActions';
import {
  uniqByKeepLast,
  parseGeoObjectsHttp,
  splitByCommaAndReturnFirstName,
} from '../../../utils/zmapMethods';

import { debounce } from 'lodash';

const SearchStreetScreen = (props) => {
  const ymaps = window.ymaps;
  const { history } = props;
  const [city, setCity] = useState('Алматы');
  const [apiKey, setApiKey] = useState('2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6');
  const [loading, setLoading] = useState(false);

  const [suggestedData, setSuggestedData] = useState([]);

  const onSuggest = debounce((text) => {
    setLoading(true);

    ymaps.ready(() => {
      ymaps.suggest(city + ', ' + text).then((items) => {
        setLoading(false);
        let arrayOfDisplayNames = items.map((item) => {
          return {
            text: splitByCommaAndReturnFirstName(item.displayName),
          };
        });
        arrayOfDisplayNames = uniqByKeepLast(
          arrayOfDisplayNames,
          (item) => item.text
        );
        setSuggestedData(arrayOfDisplayNames);
      });
    });
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
        onChange={(event) => onSuggest(event.target.value)}
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
                  state: { street: item.text },
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(SearchStreetScreen);
