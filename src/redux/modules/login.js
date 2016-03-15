/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
import {message} from 'antd'
import _fetch from '../../components/Fetch/fetch'
const BEGIN_LOGIN = 'BEGIN_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let begin_login = createAction(BEGIN_LOGIN);
let login_sucess = createAction(LOGIN_SUCCESS);
export let login = (username, password)=>
		(dispatch, state)=> {
			dispatch(begin_login);
			_fetch('/api/auth/login/', {
				method: 'post',
				headers: {
					"Content-Type": "application/json"
				},
				"body": JSON.stringify({
					username: username,
					password: password
				}), credentials: 'include'
			}).then((response=> {
					switch (response.status) {
						case 200:
							dispatch(login_sucess);
							window.location.href = '/';
							break;
						default:
							response.json().then(json=> {
								message.error('未成功登陆，原因为' + json.non_field_errors[0])
							});
							break
					}
				}
			))
		}
	;
export default handleActions({
	[BEGIN_LOGIN]: (state, {payload})=> object.assign(state,
		state.log = {auth: false, fetch: true}),
	[LOGIN_SUCCESS]: (state, {payload})=> object.assign(state,
		state.log = {auth: true, fetch: false}),
}, {log: {auth: false, fetch: false}})
