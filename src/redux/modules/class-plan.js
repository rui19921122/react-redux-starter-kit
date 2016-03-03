/**
 *
 * Created by Administrator on 2016/3/2.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
import {message} from 'antd'

const BEGIN_UPDATE_CLASS_PLAN = 'BEGIN_UPDATE_CLASS_PLAN';
const FINISH_UPDATE_CLASS_PLAN = 'FINISH_UPDATE_CLASS_PLAN';
const DATE_PICKER_DATE_CHANGE = 'DATE_PICKER_DATE_CHANGE';
const FAIL_UPDATE_CLASS_PLAN = 'FAIL_UPDATE_CLASS_PLAN';
export const begin_update_class_plan = createAction(BEGIN_UPDATE_CLASS_PLAN);
export const finish_update_class_plan = createAction(FINISH_UPDATE_CLASS_PLAN);
export const fail_update_class_plan = createAction(FAIL_UPDATE_CLASS_PLAN);
export const date_picker_date_change = createAction(DATE_PICKER_DATE_CHANGE);
export const get_class_from_server = (date) =>
	(dispatch, state) => {
		dispatch(begin_update_class_plan());
		let _date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
		fetch('/api/class_plan/classPlan/' + _date).then(
			(response) => {
				switch (response.ok) {
					case true:
						response.json().then(json=>dispatch(finish_update_class_plan(json)));
						break;
					case false:
						response.json().then(json=>dispatch(fail_update_class_plan(json)));
						break;
				}
			}
		).catch(message.error("出现错误，请检查您的网络连接"))
	};


export default handleActions(
	{
		BEGIN_UPDATE_CLASS_PLAN: (state, {payload})=> {
			"use strict";
			return Object.assign({}, state, {fetch: true})
		},
		DATE_PICKER_DATE_CHANGE: ({}, state, {payload})=> {
			"use strict";
			return Object.assign({}, state, {view_date: payload})
		},
		FINISH_UPDATE_CLASS_PLAN: (state, {payload})=> {
			return Object.assign({}, state, {content: payload, fetch: false})
		},
		FAIL_UPDATE_CLASS_PLAN: (state, {payload})=> {
			return Object.assign({}, state, {fetch: false, content: []})
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
		'view_date': new Date()
	}
)
