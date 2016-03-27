/**
 * Created by Administrator on 2016/3/3.
 */
import {createAction, handleActions} from 'redux-actions'
import _fetch from '../../components/Fetch/fetch'
import React, {Component} from 'react'
const DEFAULT_DETAIL_ACTION = 'DEFAULT_DETAIL_ACTION';
const ADD_DETAIL_DATA = "ADD_DETAIL_DATA"
let DefaultAction = createAction(DEFAULT_DETAIL_ACTION);
let AddDetailData = createAction(ADD_DETAIL_DATA);
let getDetail = (id)=> {
  "use strict";
  return (dispatch, getState)=> {
    _fetch(`/api/call_over/query-call-over-detail/${id}/`).then(
      response=>response.json()
    ).then(json=>dispatch(AddDetailData({id: id, json: json})))
  }
}
export let actions = {
  DefaultAction,
  getDetail,
};


export default handleActions({
    DEFAULT_DETAIL_ACTION: (state, {payload})=> {
      "use strict";
      let change = payload.change;
      let value = payload.value;
      let _ = Object();
      _[change] = value;
      return Object.assign({}, state, _)
    },
    ADD_DETAIL_DATA: (state, {payload})=> {
      "use strict";
      let id = payload.id;
      let content = payload.json;
      let origin = Object.assign({}, state.data);
      origin[id] = content;
      return Object.assign({}, state, {data: origin})
    }
  },
  {
    data: {}
  }
)
