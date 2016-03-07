/**
 *
 * Created by Administrator on 2016/3/7.
 */
import {createAction,handleActions} from 'redux-actions'
import {message} from 'antd'
const UPDATE_PROFESSION_STUDY = 'UPDATE_PROFESSION_STUDY';
let updateProfessionStudy = createAction(UPDATE_PROFESSION_STUDY);

export function getStudy() {
  "use strict";
  return (dispatch, getState) => {
    fetch('/api/study/get-unlearned/').then(
      response=> {
        if (response.status == 200) {
          response.json().then(json=>dispatch(updateProfessionStudy(json)))
        }
        else {
          message.error("系统错误，错误码为" + response.status)
        }
      }
    )
  }
}
export function addStudy(data) {
  "use strict";
  return (dispatch, getState) => {
    fetch('/api/study/study', {
      method: 'post',
      "body": JSON.stringify({
        content: data.content
      }), credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then(
      response=> {
        if (response.status == 201) {
          response.json().then(json=>dispatch(updateProfessionStudy(json)))
        }
        else {
          message.error("系统错误，错误码为" + response.status)
        }
      }
    )
  }
}
export let actions = [
  updateProfessionStudy,
];

export default handleActions({
  UPDATE_PROFESSION_STUDY(state, {payload}){
    "use strict";
    return Object.assign({}, state, content = payload)
  }
}, {
  content: [],
  adding: true,
})
