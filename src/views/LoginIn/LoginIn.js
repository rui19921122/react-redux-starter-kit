/**
 *
 * Created by Administrator on 2016/1/26.
 */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LoginInForm from '../../components/LoginIn/login'
import {Col,Row} from 'antd'
import {Counter} from '../../redux/modules/counter'
export class LoginIn extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <LoginInForm />
        </Col></Row>
    )
  }
}

export default LoginIn
