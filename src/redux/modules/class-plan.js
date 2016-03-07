/**
 *
 * Created by Administrator on 2016/3/2.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
import {message} from 'antd';
import 'antd/lib/index.css';

const BEGIN_UPDATE_CLASS_PLAN = 'BEGIN_UPDATE_CLASS_PLAN';
const FINISH_UPDATE_CLASS_PLAN = 'FINISH_UPDATE_CLASS_PLAN';
const DATE_PICKER_DATE_CHANGE = 'DATE_PICKER_DATE_CHANGE';
const FAIL_UPDATE_CLASS_PLAN = 'FAIL_UPDATE_CLASS_PLAN';
const SAVE_UPLOAD_FILE_TO_STATE = 'SAVE_UPLOAD_FILE_TO_STATE';
export const begin_update_class_plan = createAction(BEGIN_UPDATE_CLASS_PLAN);
export const finish_update_class_plan = createAction(FINISH_UPDATE_CLASS_PLAN);
export const fail_update_class_plan = createAction(FAIL_UPDATE_CLASS_PLAN);
export const date_picker_date_change = createAction(DATE_PICKER_DATE_CHANGE);
export const save_upload_file_to_state = createAction(SAVE_UPLOAD_FILE_TO_STATE);
export const get_class_from_server = (date) =>
	(dispatch, state) => {
		dispatch(begin_update_class_plan());
		let _date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
		fetch('/api/class_plan/classPlan/' + _date).then(
			(response) => {
				switch (response.status) {
					case 200:
						response.json().then(json=>dispatch(finish_update_class_plan(json)));
						break;
					case 404:
						response.json().then(json=>dispatch(fail_update_class_plan()));
						break;
					default:
						message.error('出现未知错误，请与管理员联系')

				}
			}
		)
	};

export const confirm_upload_file = () =>
  (dispatch, state) => {
    let date = state().class_plan.view_date;
    let _date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    let file = state().class_plan.cache_upload;
    fetch('/api/upload/class-plan/' + _date, {
      method: 'post',
      headers: {
        'Content-Type': file.type
      },
      body: file
    }).then(
      (response) => {
        switch (response.status) {
          case 200:
            response.json().then(json=>dispatch(finish_update_class_plan(json)));
            break;
          case 404:
            response.json().then(json=>dispatch(fail_update_class_plan()));
            break;
          default:
            message.error('出现未知错误，请与管理员联系')

        }
      }
    )
  };

export default handleActions(
	{
		BEGIN_UPDATE_CLASS_PLAN: (state, {payload})=> {
			"use strict";
			return Object.assign({}, state, {fetch: true})
		},
		DATE_PICKER_DATE_CHANGE: (state, {payload})=> {
			"use strict";
			return Object.assign({}, state, {view_date: payload})
		},
		FINISH_UPDATE_CLASS_PLAN: (state, {payload})=> {
			return Object.assign({}, state, {content: payload['day_detail'], fetch: false})
		},
		FAIL_UPDATE_CLASS_PLAN: (state, {payload})=> {
			return Object.assign({}, state, {fetch: false, content: []})
    },
    SAVE_UPLOAD_FILE_TO_STATE: (state, {payload})=> {
      return Object.assign({}, state, {cache_upload: payload})
    }

  },
  {
    'content': [
			{key: 1, number: 1, department: '测试部门', content: '测试数据', name: '测试'}
		],
		'fetch': false,
    'cache_upload': undefined,
    'view_date': new Date(),
	}
)
