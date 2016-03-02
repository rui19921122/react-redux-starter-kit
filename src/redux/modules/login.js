/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction,handleAction,handleActions} from 'redux-actions'
const BEGIN_LOGIN = 'BEGIN_LOGIN';
let begin_login = createAction(BEGIN_LOGIN);
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
				this.history.pushState(null, '/')
			}
		}))
	};
export default handleActions({
	[BEGIN_LOGIN]: (state, {payload})=> object.assign(state,
		state.log = {auth: false, fetch: true})
}, {log: {auth: false, fetch: false}})
