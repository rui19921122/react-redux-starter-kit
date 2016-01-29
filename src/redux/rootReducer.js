import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import menu from './modules/menu'

export default combineReducers({
	menu,
	router
})
