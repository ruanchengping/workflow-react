/**
 * actionTypes
 */
import axios from 'axios';

import merge from 'lodash/merge';

export const REQUEST_SITE = 'paper.REQUEST_SITE';
export const REQUEST_PAGES = 'paper.REQUEST_PAGES';

export const RECEIVE_SITE = 'paper.RECEIVE_SITE';
export const RECEIVE_PAGES = 'paper.RECEIVE_PAGES';


export function fetchSiteById(siteId) {
  return (dispatch) => {
    dispatch(requestSite(siteId));
    //let {data} = await axios.get('');
    let data = {
      title: 'xxxx',
      settings:{
        license:'full'
      }
    };

    dispatch(receiveSite(data))
  }

};

let requestSite = (siteId) => {
  return {
    type: REQUEST_SITE,
    payload: siteId,
  };
};

let receiveSite = (data) => {
  return {
    type: RECEIVE_SITE,
    payload: data,
  };
};

const initialState = {
  accessToken: null,

  user: null,
};


export  function siteReducer(state = APPCONFIG, action) {
  switch (action.type) {
    case REQUEST_SITE:
      return Object.assign({}, state, {
        isFetching: true

      });

    case RECEIVE_SITE:
      return merge({}, state, {isFetching: false}, action.payload);
    default:
      return state;
  }
}
