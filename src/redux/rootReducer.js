import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import menu from './modules/menu'
import login from './modules/login'

export default combineReducers({
	menu,
	router,
	login,
})
