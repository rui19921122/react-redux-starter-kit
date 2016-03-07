import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row, Table,Popconfirm,Button,Modal} from 'antd'
import '../../styles/core.scss'
import CustomMenu from '../../components/Menu/menu'
import {actions} from '../../redux/modules/professional_study'
import AddStudy from '../../components/ProfessionStudy/addStudyModal'
import ListProfessionStudyTable from '../../components/ProfessionStudy/ListProfessionStudyTable'
const mapStateToProps = (state) => ({
  menu: state.menu,
  study: state.study
});
class manageStudy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span="4">
            <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
          <Col span="20">
            <Row type="flex" justify="center">
              <Col>
                <h1 className="head-justify-first">业务学习内容管理</h1>
              </Col></Row>
            <Row type="flex" justify="end">
              <Col span="4" pull="3" className="head-justify-not-first">
                <Button >增加业务学习</Button>
              </Col></Row>
            <Row type="flex" justify="center">
              <Col span="15">
                <ListProfessionStudyTable study={this.props.study}/>
              </Col></Row>
          </Col>
        </Row>
        <AddStudy dispatch={this.props.dispatch} study={this.props.study}/>
      </div>)
  }
}
export default connect(mapStateToProps)(manageStudy);
