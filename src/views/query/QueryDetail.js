import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Col, Row, Table, Popconfirm, Button, Modal, DatePicker} from 'antd'
import {actions} from '../../redux/modules/query_detail'
import CustomMenu from '../../components/Menu/menu'
import RenderWorker from '../../components/QueryDetail/WorkerTable'
const mapStateToProps = (state) => ({
  menu: state.menu,
  query_detail: state.query_detail
});
class QueryDetail extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.params.id;
    if (this.props.query_detail.data[id]) {
    } else {
      this.props.dispatch(actions.getDetail(id))
    }
  }

  render() {
    const id = this.props.params.id;
    const data = this.props.query_detail.data[id.toString()];
    return (
      <div>
        <Row>
          <Col span="4">
            <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
          <Col span="20">
            <Row type="flex" justify="center">
              <Col>
                <h1 className="head-justify-first">查询点名会详细信息</h1>
              </Col></Row>
            <Row type="flex" justify="center">
              <Col span="15">
                <Row type="flex" justify="center">
                  <h2>使用指纹仪签到的职工</h2>
                </Row>
                <Row type="flex" justify="start">
                  <Col span="24"><RenderWorker person={data.person.used}/></Col>
                </Row>
              </Col>
              <Col span="15">
                <Row type="flex" justify="center">
                  <h2>没有使用指纹仪签到的职工</h2>
                </Row>
                <Row type="flex" justify="start">
                  <Col span="24">
                    <RenderWorker person={data.person.unused}/></Col>
                </Row>
              </Col>
              <Col span="15">
                <Row type="flex" justify="center">
                  <h2>图像</h2>
                </Row>
                {data.photo.length > 0 ? data.photo.map(value=> {
                  return <Row type="flex" justify="center">
                    <Col span="20">
                      <span style={{lineHeight:'20px',height:'20px'}}>拍摄时间:{value.date}</span>
                      <image src={value.photo} controls="controls"/>
                    </Col>
                  </Row>
                }) : <p>没有照片</p>}
              </Col>
              <Col span="15">
                <Row type="flex" justify="center">
                  <h2>音频</h2>
                </Row>
                {data.audio.length > 0 ? data.audio.map(value=> {
                  return <Row type="flex" justify="center">
                    <Col span="20">
                      <span style={{lineHeight:'20px',height:'20px'}}>结束时间:{value.date}</span>
                      <audio src={value.audio} controls="controls">您的浏览器不支持audio音频</audio>
                    </Col>
                  </Row>
                }) : <p>没有音频</p>}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(QueryDetail);
