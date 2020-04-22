import axios from 'axios';

export const doGet = (uri, params = {}) => {
  return axios.get(uri, {
    params
  });
};

export const doPost = (uri, postData, params = {}) => {
  return axios.post(uri, postData, {
    params
  });
};

export const doPut = (uri, putData, params = {}) => {
  return axios.put(uri, putData, {
    params
  });
};

export const doDelete = (uri, delData, params = {}) => {
  return axios.delete(uri, delData, {
    params
  });
};
