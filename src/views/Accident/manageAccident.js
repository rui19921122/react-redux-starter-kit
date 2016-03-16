import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row, Table,Popconfirm,Button,Modal} from 'antd'
import '../../styles/core.scss'
import CustomMenu from '../../components/Menu/menu'
import {actions} from '../../redux/modules/accident'
import AddAccident from '../../components/Accident/addAccidentModal'
import ListProfessionStudyTable from '../../components/Accident/ListAccidentTable'
const mapStateToProps = (state) => ({
	menu: state.menu,
	accident: state.accident
});
class manageStudy extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		this.props.dispatch(actions.begin_update())
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
								<h1 className="head-justify-first">事故案例内容管理</h1>
							</Col></Row>
						<Row type="flex" justify="end">
							<Col span="4" pull="3" className="head-justify-not-first">
								<Button onClick={this.handleClick.bind(this)}>添加事故案例</Button>
							</Col></Row>
						<Row type="flex" justify="center">
							<Col span="15">
								<ListProfessionStudyTable accident={this.props.accident} dispatch={this.props.dispatch}/>
							</Col></Row>
					</Col>
				</Row>
				<AddAccident dispatch={this.props.dispatch} accident={this.props.accident}/>
			</div>)
	}
}
export default connect(mapStateToProps)(manageStudy);
