/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
import {message} from 'antd'
const BEGIN_LOGIN = 'BEGIN_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let begin_login = createAction(BEGIN_LOGIN);
let login_sucess = createAction(LOGIN_SUCCESS);
export let login = (username, password)=>
	(dispatch, state)=> {
		dispatch(begin_login);
		fetch('/api/auth/login/', {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify({
				username: username,
				password: password
			}), credentials: 'include'
		}).then((response=> {
			if (response.status == 200) {
				dispatch(login_sucess);
				window.location.href='/'
			}else{
				return response.json()
			}
		})).then(json=>message.error('登陆失败,错误为'+ json['detail']))
	};
export default handleActions({
	[BEGIN_LOGIN]: (state, {payload})=> object.assign(state,
		state.log = {auth: false, fetch: true}),
	[LOGIN_SUCCESS]: (state, {payload})=> object.assign(state,
		state.log = {auth: true, fetch: false}),
}, {log: {auth: false, fetch: false}})
