/**
 *
 *
 * Created by Administrator on 2016/1/26.
 */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row,Form,Input,Button} from 'antd'
import style from './style.scss'
import LoginForm from '../../components/LoginForm/LoginForm'
const mapStateToProps = (state) => ({
	login: state.login
});
export class Login extends React.Component {

	render() {
		return (
			<div>
			<Row className={style.form}><Col>
				<LoginForm  {...this.props}/></Col></Row></div>
		)
	}
}

export default connect(mapStateToProps)(Login)
