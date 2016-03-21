/**
 *
 * Created by Administrator on 2016/3/16.
 */
import React, {Component} from 'react'
import {Col, Row, Table, Button, Transfer, Select, Modal, Slider, Affix} from 'antd'
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
				video.play();
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

	display_study(obj) {
		return (<div>
				<Row type="flex" justify="center">
					<Col>
						<h2 style={{fontSize:(this.props.call_over.options.p_font + 1) + 'em'}}>业务知识学习</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span="20" style={{fontSize:this.props.call_over.options.p_font + 'em'}}>
						{obj.map(
							(key, value, index)=> {
								return <p>第{value + 1}条: {key.content}</p>
							}
						)}
					</Col>
				</Row>
			</div>
		);
	}

	display_accident(obj) {
		return (<div>
				<Row type="flex" justify="center">
					<Col>
						<h2 style={{fontSize:(this.props.call_over.options.p_font + 1) + 'em'}}>事故案例学习</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span="20" style={{fontSize:this.props.call_over.options.p_font + 'em'}}>
						{obj.map(
							(key, value, index)=> {
								return <p>第{value + 1}条: {key.content}</p>
							}
						)}
					</Col>
				</Row>
			</div>
		);
	}

	display_class_plan(obj) {
		return (<div>
				<Row type="flex" justify="center">
					<Col>
						<h2 style={{fontSize:(this.props.call_over.options.table_font + 1) + 'em'}}>班计划</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span="20">
						<ClassPlanTable class_plan={obj} font_size={this.props.call_over.options.table_font}/>
					</Col>
				</Row>
			</div>
		);
	}

	get_inner_content() {
		let data = this.props.call_over.data;
		return (
			<div className="call-over-display">
				{this.display_class_plan(data['class_plan'])}
				{this.display_accident(data['accident'])}
				{this.display_study(data['study'])}
			</div>
		);
	}

	handleSliderTableUpdate(v) {
		this.props.dispatch(call_over_actions.update_table_font(v))
	}

	handleSliderPUpdate(v) {
		this.props.dispatch(call_over_actions.update_p_font(v))
	}

	render_video() {
		return (<Row type="flex" jusitfy="end">
			<Col span="2">
				<Affix offset={75}>
					<div><span>表格字体大小</span>
						<Slider defaultValue={this.props.call_over.options.table_font}
						        onChange={this.handleSliderTableUpdate.bind(this)}
						        min={1}
						        max={10}/></div>
					<div><span>段落字体大小</span>
						<Slider defaultValue={this.props.call_over.options.p_font}
						        onChange={this.handleSliderPUpdate.bind(this)}
						        min={1}
						        max={10}/></div>
				</Affix></Col></Row>)
	}

	handleEndClick() {
		console.log(555)
		this.props.dispatch(call_over_actions.end(true))
		this.props.dispatch(call_over_actions.can_upload_image(false))
	}

	get_call_over_state() {
		let affix = <Affix offset="180">
			<div><span>表格字体大小</span>
				<Slider defaultValue={this.props.call_over.options.table_font}
				        onChange={this.handleSliderTableUpdate.bind(this)}
				        min={1}
				        max={10}/></div>
			<div><span>段落字体大小</span>
				<Slider defaultValue={this.props.call_over.options.p_font}
				        onChange={this.handleSliderPUpdate.bind(this)}
				        min={1}
				        max={10}/></div>
		</Affix>;
		let width = 100;
		let window_height = window.innerHeight;
		let window_width = window.innerWidth;
		let inner_width = (window_width - 200) + 'px';
		let video_panel;
		if (this.props.call_over.can_upload_image) {
			video_panel = <Row style={{position:'fixed'}}>
				<Col span="2">
					<video id="video" width={width} height={width}
					       key="video"/>
				</Col>
			</Row>
		} else {
			video_panel = <Row style={{position:'fixed'}}>
				<Col span="2">
					<span style={{fontSize:'15px',color:'red'}}>未发现摄像头</span>
				</Col>
			</Row>
		}
		return (
			<div>
				{video_panel}
				<Row type="flex">
					<Col span="2">
						{affix}</Col></Row>
				<Row style={{width:inner_width,marginLeft:'100px'}}>
					{this.get_inner_content()}
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<Button onClick={this.handleEndClick.bind(this)}>
							结束点名
						</Button>
					</Col>
				</Row>
			</div>
		)
	}

	get_final_state() {
		let width = window.innerHeight / 3;
		return (
			<Row type="flex" justify="center" style={{marginTop:width +'px'}}>
				<Col>
					<h1>点名结束，（需要一些提示语）</h1>
					<p style={{textAlign:'center'}}>您可以</p>
				</Col></Row>
		)
	}

	render() {
		if (this.props.call_over.begin && !this.props.call_over.end) {
			return this.get_call_over_state()
		} else if (!this.props.call_over.begin && !this.props.call_over.end) {
			return this.get_initial_state()
		} else if (this.props.call_over.end) {
			return this.get_final_state()
		}
	}
}
export default connect(mapStateToProps)(CallOver);
