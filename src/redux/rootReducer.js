import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import menu from './modules/menu'
import login from './modules/login'
import class_plan from './modules/class-plan'
import worker from './modules/worker'
import study from './modules/professional_study'
import accident from './modules/accident'

export default combineReducers({
	menu,
	router,
	login,
	class_plan,
	worker,
	study,
	accident
})
