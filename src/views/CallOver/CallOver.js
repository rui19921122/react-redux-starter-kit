/**
 *
 * Created by Administrator on 2016/3/16.
 */
import React, {Component} from 'react'
import {Col, Row, Table, Button, Transfer, Select, Modal, QueueAnim} from 'antd'
import ClassPlanTable from './ClassPlanDisplay'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import {actions as call_over_actions, get_default_class_number} from '../../redux/modules/call-over'
const mapStateToProps = (state) => ({
  call_over: state.call_over
});
class CallOver extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.buildVideo()
  }

  buildVideo() {
    let video = document.getElementById("video");
    let videoObj = {"video": true};
    let errBack = function (error) {
      console.log("Video capture error: ", error.name);
      console.log(error)
    };
    let getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia);
    // Put video listeners into place
    navigator.mediaDevices.getUserMedia(videoObj).then(
      stream=> {
        video.src = window.URL.createObjectURL(stream);
        video.play()
        this.props.dispatch(call_over_actions.can_upload_image(true))
      }
    ).catch(
      (e)=> {
        alert('加载摄像头错误');
        this.props.dispatch(call_over_actions.can_upload_image(false))
      }
    )
  }

  handleFullScreenClick() {
    if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    }
    if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen()
    }
    this.props.dispatch(call_over_actions.begin(true))
  }

  get_initial_state() {
    let width = window.innerWidth / 3;
    return (
      <div style={{width:'100%'}}>
        <Row type="flex" justify="center">
          <Col>
            <video id="video" width={width} height={width} key="video"/>
          </Col></Row>
        <Row type="flex" justify="center">
          <Col>
            请调整好摄像头的角度后开始点名，如果没有摄像头可直接点名
          </Col></Row>
        <Row type="flex" justify="center">
          <Col>
            <Button onClick={this.handleFullScreenClick.bind(this)}>开始点名</Button>
          </Col></Row>
      </div>
    )
  }

  get_inner_content() {
    switch (this.props.current_display) {
      case 'class-plan':
        return (<div>
            <Row type="flex" justify="center">
              <Col>
                <h1>班计划</h1>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23">
                <ClassPlanTable class_plan={this.props.call_over.data.class_plan}/>
              </Col>
            </Row>
          </div>
        );
      case 'study':
        return (<div>
            <Row type="flex" justify="center">
              <Col>
                <h1>业务学习</h1>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23">
                <ClassPlanTable class_plan={this.props.call_over.data.class_plan}/>
              </Col>
            </Row>
          </div>
        );
    }
  }

  handleNextClick() {

  }

  get_call_over_state() {
    let width = 100;
    let window_height = window.innerHeight;
    let window_width = window.innerWidth;
    let inner_width = (window_width - 200) + 'px';
    return (
      <div>
        <Row>
          <Col>
            <video id="video" width={width} height={width}
                   style={{position:'fixed'}} key="video"/>
          </Col></Row>
        <Row style={{width:inner_width,marginLeft:'100px'}}>
          {this.get_inner_content()}
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <Button onClick={this.handleNextClick.bind(this)}>
            </Button>
          </Col>
        </Row>

      </div>
    )
  }

  render() {
    if (this.props.call_over.begin) {
      return this.get_call_over_state()
    } else {
      return this.get_initial_state()
    }
  }
}
export default connect(mapStateToProps)(CallOver);
