/**
 * Created by hanrui on 2016/3/3.
 */
import {createAction, handleActions} from 'redux-actions'
const BEGIN_GET_PEOPLE_DATA = 'BEGIN_GET_PEOPLE_DATA';

export let begin_get_people_data = createAction(BEGIN_GET_PEOPLE_DATA);

export default handleActions({
		GET_PEOPLE_DATA(state, {payload}){
			return Object.assign({}, state, fetch = true)
		}
	},
	{fetch: false, all_people: {}, should: {}, selected: {}}
)
