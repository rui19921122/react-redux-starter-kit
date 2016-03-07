import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row, DatePicker, Button, Upload, message,Modal} from 'antd'
import ClassPlanTable from '../../components/ClassPlan/queryClassPlan'
import CustomMenu from '../../components/Menu/menu'
import '../../styles/core.scss'
import {date_picker_date_change,get_class_from_server,begin_update_class_plan,save_upload_file_to_state,
  confirm_upload_file} from '../../redux/modules/class-plan'
const mapStateToProps = (state) => ({
  class_plan: state.class_plan,
  menu: state.menu
});
class ShowClassPlan extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
  }


  handleClick() {
    this.props.dispatch(get_class_from_server(this.props.class_plan.view_date))
    this.props.dispatch(begin_update_class_plan())
  }

  handleDateChange(value) {
    this.props.dispatch(date_picker_date_change(value));
  }

  showConfirm() {
    let okClicked = ()=> {
      this.props.dispatch(confirm_upload_file());
    };
    return (Modal.confirm({
      title: '您正在提交' + this.props.class_plan.view_date + '的班计划，您提交的文件名为' + this.props.class_plan.cache_upload.name + '，请仔细核对',
      onOk: okClicked.bind(this),
      onCancel() {
      }
    }))
  }

  saveUploadToState(file) {
    let isExcel = file.type === ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || "application/vnd.ms-excel");
    let shouldUpload = false;
    if (!isExcel) {
      message.error('只能上传 excel 文件哦！');
      return isExcel;
    } else {
      //todo 解决提醒框的问题
      //this.props.dispatch(save_upload_file_to_state(file));
      //this.showConfirm.bind(this)();
      return true
    }
  }


  render() {
    let date = this.props.class_plan.view_date;
    let _date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    const uploadProps = {
      action: '/api/upload/class-plan/' + _date,
      beforeUpload: this.saveUploadToState.bind(this)
    };
    const disabledDate = function (current) {
      // can not select days after today
      let now = new Date();
      return current && current.getTime() > new Date((now / 1000 + 86400) * 1000);
    };
    return (
      <div>
        <Row>
          <Col span="4">
            <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
          <Col span="20">
            <Row type="flex" justify="center">
              <Col>
                <h1 className="head-justify-first">查询班计划</h1></Col>
            </Row>
            <Row type="flex" justify="end" className="head-justify-not-first">
              <Col className="head-justify" span="4" pull="4"><DatePicker
                defaultValue={this.props.class_plan.view_date}
                onChange={this.handleDateChange}
                disabledDate={disabledDate}/>
                <Button onClick={this.handleClick}>更新</Button>
                <Upload dispatch={this.props.dispatch} {...uploadProps}
                ><Button>上传</Button></Upload>
              </Col>
            </Row>
            <Row type="flex" align="middle" justify="space-around"><Col span="15">
              <ClassPlanTable class_plan={this.props.class_plan} dispatch={this.props.dispatch}/>
            </Col></Row></Col></Row></div>
    )
  }
}
export default connect(mapStateToProps)(ShowClassPlan)
