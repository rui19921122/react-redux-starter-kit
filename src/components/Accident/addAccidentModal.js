/**
 *
 * Created by Administrator on 2016/3/3.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button, Form ,Input, Checkbox, Radio, Row, Col, Tooltip, Icon ,Select } from 'antd';
import {actions,addStudy,getStudy} from '../../redux/modules/professional_study'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let AddStudyForm = React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		let form = this.props.form.getFieldsValue();
		this.props.dispatch(addStudy(form['content']));
		this.props.dispatch(actions.finish_update_study())
	},

	render() {
		const { getFieldProps } = this.props.form;
		const formItemLayout = {
			labelCol: {span: 2},
			wrapperCol: {span: 22}
		};
		return (
			<Form horizontal onSubmit={this.handleSubmit}>
				<FormItem
					{...formItemLayout}
					label="内容："
					key="content">
					<Input type="textarea" {...getFieldProps('content')} placeholder=""/>
				</FormItem>
				<Row>
					<Col span="16" offset="6">
						<Button type="primary" htmlType="submit">确定</Button>
					</Col>
				</Row>
			</Form>
		);
	}
});

AddStudyForm = Form.create()(AddStudyForm);
export default class AddWorkerModal extends Component {
	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this)
	}

	handleCancel() {
		this.props.dispatch(actions.finish_update_study())
	}

	render() {
		return (
			<Modal title="增加业务学习内容"
			       visible={this.props.study.adding}
			       onOk={this.handleOk}
			       onCancel={this.handleCancel}
			       width="800"
			       footer={[
      ]}>
				<AddStudyForm dispatch={this.props.dispatch}/>
			</Modal>
		)
	}
}

