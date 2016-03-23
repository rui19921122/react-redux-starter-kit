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
import Recorder from '../../components/Recorder/Recorder'
import {actions as call_over_actions, get_default_class_number} from '../../redux/modules/call-over'
const mapStateToProps = (state) => ({
	call_over: state.call_over
});
class CallOver extends Component {
	constructor(props) {
		super(props);
	}

  update_photo() {
    if (this.props.call_over.can_upload_image && this.props.call_over.begin) {
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      let video = document.getElementById('video');
      context.drawImage(video, 0, 0);
      canvas.toDataURL('image/png');
      let image_data = canvas.toDataURL('image/png').substr(22);
      this.props.dispatch(call_over_actions.upload_image(image_data))
    } else {
      console.log('can_upload_image为false，无需传输')
    }
  }

	componentDidMount() {
    this.buildVideo();
    setInterval(this.update_photo.bind(this), 20000)
	}

  static componentWillUnmount() {
    clearInterval()
  }

	buildVideo() {
		let video = document.getElementById("video");
    let videoObj = {"video": true};
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
		let getUserMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia);
		// Put video listeners into place
    if (navigator.mediaDevices.getUserMedia) {
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
    } else {
      navigator.webkitGetUserMedia(videoObj, (stream)=> {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        this.props.dispatch(call_over_actions.can_upload_image(true))
      }, (e)=> {
        alert('加载摄像头错误');
        this.props.dispatch(call_over_actions.can_upload_image(false))
      })
    }
	}

	handleFullScreenClick() {
		if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen()
		}
		if (document.documentElement.webkitRequestFullScreen) {
			document.documentElement.webkitRequestFullScreen()
		}
    let audioObj = {"audio": true};
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia);
    let handleAudioStream = (stream) => {
      this.props.dispatch(call_over_actions.can_upload_audio(true));
      let audio_context = new AudioContext();
      let input = audio_context.createMediaStreamSource(stream);
      let recorder = new Recorder(input);
      recorder.record();
      setInterval(
        ()=> {
          try {
            recorder.stop();
            recorder.exportWAV((blob)=> {
              this.props.dispatch(call_over_actions.upload_audio(blob));
              console.log(blob);
            }, 'audio/wav');
            recorder.clear();
            console.log('缓存已清除')
          } catch (e) {
            console.log(e)
          }
          recorder.record();
        }
        , 60000)
    };
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(audioObj).then(
        stream=> {
          handleAudioStream(stream)
        }
      )
    } else {
      navigator.webkitGetUserMedia(audioObj, (stream)=> {
          handleAudioStream(stream)
        },
        (e)=>console.log(e))
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

	handleEndClick() {
    this.props.dispatch(call_over_actions.end(true));
		this.props.dispatch(call_over_actions.can_upload_image(false))
	}

	get_call_over_state() {
    let affix = <Row type="flex">
      <Col span="2"><Affix offset={180}>
        <div><span>
         录音设备状态:{this.props.call_over.can_upload_audio ? '录音中' : '异常'}
       </span></div>
			<div><span>表格字体大小</span>
				<Slider defaultValue={this.props.call_over.options.table_font}
                max={10}
                onChange={this.handleSliderTableUpdate.bind(this)}
        /></div>
			<div><span>段落字体大小</span>
				<Slider defaultValue={this.props.call_over.options.p_font}
                max={10}
                onChange={this.handleSliderPUpdate.bind(this)}
        /></div>
      </Affix></Col></Row>;
		let width = 100;
		let window_height = window.innerHeight;
		let window_width = window.innerWidth;
		let inner_width = (window_width - 200) + 'px';
		let video_panel;
		if (this.props.call_over.can_upload_image) {
			video_panel = <Row style={{position:'fixed'}}>
        <Col>
					<video id="video" width={width} height={width}
					       key="video"/>
				</Col>
			</Row>
    }
		return (
			<div>
				{video_panel}
        {affix}
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
    let contain;
		if (this.props.call_over.begin && !this.props.call_over.end) {
      contain = this.get_call_over_state()
		} else if (!this.props.call_over.begin && !this.props.call_over.end) {
      contain = this.get_initial_state()
		} else if (this.props.call_over.end) {
      contain = this.get_final_state()
		}
    return (
      <div>
        {contain}
        <canvas id="canvas" style={{display:'none'}} width="350" height="350"/>
      </div>

    )
	}
}
export default connect(mapStateToProps)(CallOver);
