/**
 *
 * Created by Administrator on 2016/3/2.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
const BEGIN_UPDATE_CLASS_PLAN = 'BEGIN_UPDATE_CLASS_PLAN';
const FINISH_UPDATE_CLASS_PLAN = 'FINISH_UPDATE_CLASS_PLAN';
const DATE_PICKER_DATE_CHANGE = 'DATE_PICKER_DATE_CHANGE';
export let begin_update_class_plan = createAction(BEGIN_UPDATE_CLASS_PLAN);
export let finish_update_class_plan = createAction(FINISH_UPDATE_CLASS_PLAN);
export let date_picker_date_change = createAction(DATE_PICKER_DATE_CHANGE);
export let get_class_from_server = (date = Date()) =>
  (dispatch, state) => {
    dispatch(BEGIN_UPDATE_CLASS_PLAN);
    fetch('/api/class-plan/')
  };


export default handleActions(
  {
    BEGIN_UPDATE_CLASS_PLAN: (state, {payload})=> {
      "use strict";
      return Object.assign(state, state.fetch, true)
    },
    DATE_PICKER_DATE_CHANGE: (state, {payload})=> {
      "use strict";
      return Object.assign(state, {view_date: payload})
    }

  }, {
    'header': [{
      key: 'number',
      title: '序号',
      dataIndex: 'number',
      width: '10%'
    },
      {
        title: '属性',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width: '50%'
      },
      {
        title: '涉及部门',
        dataIndex: 'department',
        key: 'department',
        width: '20%'
      }
    ],
    'content': [
      {key: 1, number: 1, department: '测试部门', content: '测试数据', name: '测试'}
    ],
    'fetch': false,
    'today': new Date(),
    'view_date': undefined
  }
)
