/**
 *
 * Created by Administrator on 2016/3/7.
 */
import {createAction,handleActions} from 'redux-actions'
import {message} from 'antd'
const UPDATE_ACCIDENT = 'UPDATE_ACCIDENT';
let updateAccident = createAction(UPDATE_ACCIDENT);

const BEGIN_UPDATE = 'BEGIN_UPDATE';
let begin_update = createAction(BEGIN_UPDATE);
const FINISH_UPDATE = 'FINISH_UPDATE'
let finish_update = createAction(FINISH_UPDATE)

export function getAccident() {
	"use strict";
	return (dispatch, getState) => {
		fetch('/api/study/get-unlearned-study/').then(
			response=> {
				if (response.status == 200) {
					response.json().then(json=>dispatch(updateProfessionStudy(json)))
				}
			}
		)
	}
}
export function deleteStudy(id) {
	return (dispatch, state)=> {
		fetch('/api/study/professional-study/' + id, {
			method: 'delete'
		}).then((response)=> {
			"use strict";
			switch (response.status) {
				case 204:
					message.success('删除学习计划成功');
					dispatch(getStudy());
					break;
				default:
					message.error('删除人员失败，错误码' + response.status)
			}
		})
	};
}
export function addStudy(data) {
	"use strict";
	return (dispatch, getState) => {
		fetch('/api/study/professional-study/', {
			method: 'post',
			"body": JSON.stringify({
				content: data
			}), credentials: 'include',
			headers: {'Content-Type': 'application/json'}
		}).then(
			response=> {
				if (response.status == 201) {
					dispatch(getStudy())
				}
				else {
					message.error("系统错误，错误码为" + response.status)
				}
			}
		)
	}
}
export let actions = {
	updateProfessionStudy, begin_update_study, finish_update_study
};

export default handleActions({
		UPDATE_PROFESSION_STUDY: (state, {payload})=> {
			"use strict";
			return Object.assign({}, state, {content: payload})
		},
		BEGIN_UPDATE_STUDY: (state, {payload})=> {
			return Object.assign({}, state, {adding: true})
		},
		FINISH_UPDATE_STUDY: (state, {payload})=> {
			return Object.assign({}, state, {adding: false})
		}
	},
	{
		content: [],
		adding: false
	}
)
