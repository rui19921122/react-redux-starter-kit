/**
 *
 * Created by Administrator on 2016/3/3.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button, Form ,Input, Checkbox, Radio, Row, Col, Tooltip, Icon ,Select } from 'antd';
import {actions} from '../../redux/modules/worker'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let UpdateWorkerForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    let form = this.props.form.getFieldsValue();
    this.props.dispatch(actions.addWorker(form['name'], form['class_number'], form['is_study'], form['alter'], form['position']));
  },

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="姓名："
          key="name">
          <Input type="text" {...getFieldProps('name')} placeholder="请输入姓名"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          key="is_study"
          label="学员：">
          <RadioGroup {...getFieldProps('is_study', {initialValue: false})}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          key="alter"
          {...formItemLayout}
          label="替班：">
          <RadioGroup {...getFieldProps('alter', {initialValue: false})}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          key="class_number"
          {...formItemLayout}
          label="班次">
          <Select {...getFieldProps('class_number')}>
            {[1, 2, 3, 4].map((value)=>(
              <Option value={value}>{value}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          key="position"
          label="职位">
          <Select {...getFieldProps('position')}>
            {this.props.position.map((value)=>(
              <Option value={value.id} key={'sel'+value.id}>{value.name}</Option>
            ))}
          </Select>
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

UpdateWorkerForm = Form.create()(UpdateWorkerForm);
export class AddWorkerModal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleOk() {
  }

  handleCancel() {
    this.props.dispatch(actions.finish_create_user())
  }

  render() {
    return (
      <Modal title="增加员工"
             visible={this.props.worker.adding}
             onOk={this.handleOk}
             onCancel={this.handleCancel}
             footer={[
      ]}>
        <UpdateWorkerForm position={this.props.worker.position} dispatch={this.props.dispatch}/>
      </Modal>
    )
  }
}

