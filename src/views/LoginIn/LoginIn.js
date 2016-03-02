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
class LoginIn extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		alert(this.props.form)
	}

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<Row className={style.form}><Col>
				<Form horizontal onSubmit={this.handleSubmit}>
					<Form.Item id="username" label="用户名" labelCol={{span:6}} wrapperCol={{span:14}}>
						<Input id="username" placeholder="请输入您的用户名" {...getFieldProps('username')}/>
					</Form.Item>
					<Form.Item id="username" label="密码" labelCol={{span:6}} wrapperCol={{span:14}}>
						<Input id="username" type="password" placeholder="请输入您的密码"/>
					</Form.Item>
					<Row>
						<Col span="16" offset="6">
							<Button type="primary" htmlType="submit">登陆</Button>
						</Col>
					</Row>
				</Form></Col></Row>
		)
	}
}

LoginIn = Form.create()(LoginIn);
export default LoginIn
