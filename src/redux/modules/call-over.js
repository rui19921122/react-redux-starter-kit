/**
 * Created by Administrator on 2016/3/16.
 */
import {createAction, handleActions} from 'redux-actions'
import {push} from 'react-router-redux'
import {browserHistory} from 'react-router'
import _fetch from '../../components/Fetch/fetch'
let begin_select = createAction("BEGIN_SELECT");
let end_select = createAction("END_SELECT");
let add_unused = createAction("ADD_UNUSED");
let reduce_unused = createAction("REDUCE_UNUSED");
let commit_select = createAction("COMMIT_SELECT");
let update_class_number = createAction("UPDATE_CLASS_NUMBER");
let can_begin = createAction("CAN_BEGIN");
let update_call_over_data = createAction("UPDATE_CALL_OVER_DATA");
let can_upload_image = createAction("CAN_UPLOAD_IMAGE");
let begin = createAction("BEGIN");
export const get_default_class_number = ()=>
  (dispatch, state) => {
    "use strict";
    _fetch('/api/call_over/get-default-class-number').then(
      (response)=> {
        if (response.status == 200) {
          response.json().then(
            (json=> {
              let number = json.number;
              if (number in [1, 2, 3, 4]) {
                dispatch(update_class_number(json.number));
                dispatch(can_begin(true))
              }
              if (number == false) {
                dispatch(can_begin(false))
              }
            }))
        }
      }
    )
  };
export const begin_call_over = ()=>
  (dispatch, getState) => {
    "use strict";
    let state = getState();
    let unused = state.call_over.unused;
    let number = state.call_over.class_number;
    _fetch('/api/call_over/begin-call-over/',
      {
        method: 'post',
        body: JSON.stringify({unused: unused, number: number})
      }).then(
      (response)=> {
        if (response.status == 200) {
          response.json().then(
            (json=> {
              dispatch(update_call_over_data(json));
              dispatch(push('/call-over'))
            }))
        }
      }
    )
  };
export let actions = {
  begin_select,
  end_select,
  add_unused,
  reduce_unused,
  commit_select,
  update_class_number,
  begin_call_over,
  can_upload_image,
  begin
};
export default handleActions({
  BEGIN_SELECT: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {select_visible: true})
  },
  END_SELECT: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {select_visible: false, unused_cache: state.unused})
  },
  ADD_UNUSED: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {unused_cache: payload})
  },
  REDUCE_UNUSED: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {unused_cache: payload})
  },
  COMMIT_SELECT: (state, {payload})=> {
    "use strict";
    let cache = state.unused_cache;
    return Object.assign({}, state, {unused: cache, select_visible: false})
  },
  UPDATE_CLASS_NUMBER: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {class_number: payload})
  },
  CAN_BEGIN: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {can_begin: payload})
  },
  UPDATE_CALL_OVER_DATA: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {data: payload})
  },
  CAN_UPLOAD_IMAGE: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {can_upload_image: payload})
  },
  BEGIN: (state, {payload})=> {
    "use strict";
    return Object.assign({}, state, {begin: payload})
  },


}, {
  used: {},
  unused_cache: [],
  unused: [],
  begin: false,
  can_upload_image: false,
  select_visible: false,
  class_number: 0,
  data: {}
});
