import axios from 'axios';

const API = "https://helix40.herokuapp.com/";

export const doGet = (uri, params = {}) => {
  return axios.get(API + uri, {
    params,
  });
};

export const doPost = (uri, postData, params = {}) => {
  return axios.post(API + uri, postData, {
    params,
  });
};

export const doPut = (uri, putData, params = {}) => {
  return axios.put(API + uri, putData, {
    params,
  });
};

export const doDelete = (uri, delData, params = {}) => {
  return axios.delete(API + uri, delData, {
    params,
  });
};
