/**
 * Created by Administrator on 2016/3/3.
 */
import {createAction, handleActions} from 'redux-actions'
import React,{Component} from 'react'
import {message} from 'antd'
const BEGIN_GET_USER = 'BEGIN_GET_USER';
const FINISH_GET_USER = 'FINISH_GET_USER';
const FAILED_GET_USER = 'FAILED_GET_USER';
const BEGIN_GET_POSITION = 'BEGIN_GET_POSITION';
const FINISH_GET_POSITION = 'FINISH_GET_POSITION';
const FAILED_GET_POSITION = 'FAILED_GET_POSITION';
const BEGIN_UPDATE_USER = 'BEGIN_UPDATE_USER';
const FINISH_UPDATE_USER = 'FINISH_UPDATE_USER';
const FAILED_UPDATE_USER = 'FAILED_UPDATE_USER';
const BEGIN_UPDATE_POSITION = 'BEGIN_UPDATE_POSITION';
const FINISH_UPDATE_POSITION = 'FINISH_UPDATE_POSITION';
const FAILED_UPDATE_POSITION = 'FAILED_UPDATE_POSITION';
const BEGIN_CREATE_USER = 'BEGIN_CREATE_USER';
const FINISH_CREATE_USER = 'FINISH_CREATE_USER';
const OPEN_CREATE_USER = 'OPEN_CREATE_USER';
let begin_get_user = createAction(BEGIN_GET_USER);
let finish_get_user = createAction(FINISH_GET_USER);
let failed_get_user = createAction(FAILED_GET_USER);
let begin_get_position = createAction(BEGIN_GET_POSITION);
let finish_get_position = createAction(FINISH_GET_POSITION);
let failed_get_position = createAction(FAILED_GET_POSITION);
let begin_update_user = createAction(BEGIN_UPDATE_USER);
let finish_update_user = createAction(FINISH_UPDATE_USER);
let failed_update_user = createAction(FAILED_UPDATE_USER);
let begin_update_position = createAction(BEGIN_UPDATE_POSITION);
let finish_update_position = createAction(FINISH_UPDATE_POSITION);
let failed_update_position = createAction(FAILED_UPDATE_POSITION);
let begin_fetch_create_user = createAction(BEGIN_CREATE_USER);
let finish_create_user = createAction(FINISH_CREATE_USER);
let open_create_user = createAction(OPEN_CREATE_USER);
let getPosition = () =>(dispatch, state)=> {
  "use strict";
  fetch('api/worker/position/').then(response=>
    response.json()).then(json=>dispatch(finish_get_position(json)))
};
let getWorker = () =>(dispatch, state)=> {
  "use strict";
  dispatch(begin_get_user());
  fetch('api/worker/worker/').then(response=>response.json()).then(json=>dispatch(finish_get_user(json)))
  dispatch(finish_get_user())
};
let addWorker = (name, class_number, is_study, alter, position) =>(dispatch, state)=> {
  "use strict";
  dispatch(begin_fetch_create_user());
  fetch('api/worker/worker/',
    {
      method: 'post',
      "body": JSON.stringify({
        alter: alter, name: name, class_number: class_number, is_study: is_study, position: position
      }), credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }
  ).then(response=> {
    switch (response.status) {
      case 201:
        dispatch(finish_create_user());
        message.success("添加用户成功");
        dispatch(getWorker());
        break;
      default:
        dispatch(finish_create_user());
        message.error("添加用户失败")
    }
  })
};
let deleteWorker = (id) => (dispatch, state)=> {
  fetch('/api/worker/worker/' + id, {
    method: 'delete'
  }).then((response)=> {
    "use strict";
    switch (response.status) {
      case 204:
        message.success('删除人员成功');
        dispatch(getWorker());
        break;
      default:
        message.error('删除人员失败，错误码' + response.status)
    }
  })
};
export let actions = {
  begin_get_user,
  finish_get_user,
  failed_get_user,
  begin_get_position,
  finish_get_position,
  failed_get_position,
  begin_update_user,
  finish_update_user,
  failed_update_user,
  begin_update_position,
  finish_update_position,
  failed_update_position,
  begin_fetch_create_user,
  finish_create_user,
  deleteWorker,
  getPosition,
  getWorker,
  addWorker,
  open_create_user
};


export default handleActions({
    FINISH_GET_POSITION: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {position: payload})
    },
    FINISH_GET_USER: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {worker: payload})
    },
    BEGIN_CREATE_USER: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {create_worker_loading: true})
    },
    FINISH_CREATE_USER: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {create_worker_loading: false, adding: false})
    },
    OPEN_CREATE_USER: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {create_worker_loading: false, adding: true})
    },

  },
  {
    worker: [{key: '1', name: '韩瑞', position: '值班员'}],
    position: [],
    adding: false,
    create_worker_loading: false
  })
