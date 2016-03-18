import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import menu from './modules/menu'
import login from './modules/login'
import class_plan from './modules/class-plan'
import worker from './modules/worker'
import study from './modules/professional_study'
import accident from './modules/accident'
import call_over from './modules/call-over'

export default combineReducers({
  router,
  menu,
  login,
  class_plan,
  worker,
  study,
  accident,
  call_over
})
