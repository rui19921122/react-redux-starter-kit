/**
 *
 * Created by Administrator on 2016/3/7.
 */
import {createAction,handleActions} from 'redux-actions'
import {message} from 'antd'
import _fetch from '../../components/Fetch/fetch'
const UPDATE_ACCIDENT = 'UPDATE_ACCIDENT';
let updateAccident = createAction(UPDATE_ACCIDENT);

const BEGIN_UPDATE = 'BEGIN_UPDATE';
let begin_update = createAction(BEGIN_UPDATE);
const FINISH_UPDATE = 'FINISH_UPDATE';
let finish_update = createAction(FINISH_UPDATE);

export function getAccident() {
  "use strict";
  return (dispatch, getState) => {
    _fetch('/api/accident/get-unlearned-accident/').then(
      response=> {
        if (response.status == 200) {
          response.json().then(json=>dispatch(updateAccident(json)))
        }
      }
    )
  }
}
export function deleteAccident(id) {
  return (dispatch, state)=> {
    fetch('/api/accident/accident/' + id, {
      method: 'delete'
    }).then((response)=> {
      "use strict";
      switch (response.status) {
        case 204:
          message.success('删除学习计划成功');
          dispatch(getAccident());
          break;
        default:
          message.error('删除人员失败，错误码' + response.status)
      }
    })
  };
}
export function addAccident(data) {
  "use strict";
  return (dispatch, getState) => {
    fetch('/api/accident/accident/', {
      method: 'post',
      "body": JSON.stringify({
        content: data
      }), credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then(
      response=> {
        if (response.status == 201) {
          dispatch(getAccident())
        }
        else {
          message.error("系统错误，错误码为" + response.status)
        }
      }
    )
  }
}
export let actions = {
  updateAccident, begin_update, finish_update
};

export default handleActions({
    UPDATE_ACCIDENT: (state, {payload})=> {
      "use strict";
      return Object.assign({}, state, {content: payload})
    },
    BEGIN_UPDATE: (state, {payload})=> {
      return Object.assign({}, state, {adding: true})
    },
    FINISH_UPDATE: (state, {payload})=> {
      return Object.assign({}, state, {adding: false})
    }
  },
  {
    content: [],
    adding: false
  }
)
