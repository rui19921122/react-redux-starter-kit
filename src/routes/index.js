import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import Login from '../views/LoginIn/LoginIn'
import AddClassPlan from '../views/ClassPlan/queryClassPlan'
import ManageWorker from '../views/Worker/manageWorker'
import ManageProfessionalStudy from '../views/ProfessionalStudy/manageProfessionalStudy'
import ManageAccident from '../views/Accident/manageAccident'
import Begin from '../views/CallOver/BeginCallOver'
import CallOver from '../views/CallOver/CallOver'
import QueryByDepartment from '../views/query/QueryByDepartment'
import QueryDetail from '../views/query/QueryDetail'

export default(store) =>(
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path='/404' component={NotFoundView}/>
    <Route path="/login" component={Login}/>
    <Route path="/add-class-plan" component={AddClassPlan}/>
    <Route path="/manage-worker" component={ManageWorker}/>
    <Route path="/manage-study" component={ManageProfessionalStudy}/>
    <Route path="/manage-accident" component={ManageAccident}/>
    <Route path="/begin" component={Begin}/>
    <Route path="/call-over" component={CallOver}/>
    <Route path="/query-department" component={QueryByDepartment}/>
    <Route path="/query-detail/:id" component={QueryDetail}/>
    <Redirect from='*' to='/404'/>
  </Route>
)
