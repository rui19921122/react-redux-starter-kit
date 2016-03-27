/**
 * Created by Administrator on 2016/3/3.
 */
import {createAction, handleActions} from 'redux-actions'
import React, {Component} from 'react'
import _fetch from '../../components/Fetch/fetch'
const DEFAULT_LIST_ACTION = 'DEFAULT_LIST_ACTION';
let DefaultAction = createAction(DEFAULT_LIST_ACTION);
let GetList = (start, end)=> {
  "use strict";
  return (dispatch, state) => {
    let start_date = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
    let end_date = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
    _fetch(`/api/call_over/list-call-over/?start=${start_date}&end=${end_date}`).then(
      response=>response.json()
    ).then(json=> {
      dispatch(DefaultAction({change: 'data', value: json}))
    })
  }
}
export let actions = {
  DefaultAction,
  GetList,
};

export default handleActions({
    DEFAULT_LIST_ACTION: (state, {payload})=> {
      "use strict";
      let change = payload.change;
      let value = payload.value;
      let _ = Object();
      _[change] = value;
      return Object.assign({}, state, _)
    }
  },
  {
    data: undefined,
    start: undefined,
    end: undefined,
  }
)
