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
let end = createAction("END")
let update_call_over_number = createAction("CALL_OVER_NUMBER");
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
							dispatch(update_call_over_data(json.data));
							dispatch(update_call_over_number(json.pk));
							dispatch(push('/call-over'))
						}))
				}
			}
		)
	};
let update_table_font = createAction("UPDATE_TABLE_FONT")
let update_p_font = createAction("UPDATE_P_FONT")
export let actions = {
	begin_select,
	end_select,
	add_unused,
	reduce_unused,
	commit_select,
	update_class_number,
	begin_call_over,
	can_upload_image,
	begin,
	end,
	update_table_font,
	update_p_font,
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
	END: (state, {payload})=> {
		"use strict";
		return Object.assign({}, state, {end: payload})
	},
	UPDATE_P_FONT: (state, {payload})=> {
		"use strict";
		return Object.assign({}, state, {
			options: {'p_font': payload, 'table_font': state.options.table_font}
		})
	},
	CALL_OVER_NUMBER: (state, {payload})=> {
		"use strict";
		return Object.assign({}, state, {
			options: {'p_font': payload, 'call_over_number': payload}
		})
	},
	UPDATE_TABLE_FONT: (state, {payload})=> {
		"use strict";
		return Object.assign({}, state, {
			// todo 寻找一种方法，简单的更新options，而不是脏检查
			options: {'table_font': payload, 'p_font': state.options.p_font}
		})
	},


}, {
	used: {},
	unused_cache: [],
	unused: [],
	begin: false,
	can_upload_image: false,
	select_visible: false,
	class_number: 0,
	data: {},
	options: {
		p_font: 2,
		table_font: 2
	},
	end: false
});
