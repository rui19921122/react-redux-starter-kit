/**
 * Created by hanrui on 2016/1/29.
 */
import {createAction,handleActions,applyMiddleware} from 'redux-actions'
import {trunk} from 'redux-thunk'
import { History } from 'react-router';
export const UPDATE_MENU = 'UPDATE_MENU';

export let updateMenu = createAction(UPDATE_MENU, (i)=>i);

export function getMenu() {
	return (dispatch, getState) => {
		let state = getState();
		if (state.menu.get) {
			return 0
		}
		return fetch('/api/menu/get-menu').then(response=> {
      if (response.status != 200) {
        location.href = '/login'
      } else {
        return response.json()
      }
    }).then(json=>dispatch(updateMenu(json)))
	}
}

export default handleActions({
	UPDATE_MENU: (state,
	              action) => ({
		items: action.payload,
		get: true
	})
}, {get: false, items: []})
