import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row, DatePicker, Button} from 'antd'
import ClassPlanTable from '../../components/ClassPlan/queryClassPlan'
import '../../styles/core.scss'
import {date_picker_date_change,get_class_from_server,begin_update_class_plan} from '../../redux/modules/class-plan'
const mapStateToProps = (state) => ({
	class_plan: state.class_plan
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

	render() {
		const disabledDate = function (current) {
			// can not select days after today
			let now = new Date();
			return current && current.getTime() > new Date((now / 1000 + 86400) * 1000);
		};
		return (
			<div>
				<Row type="flex" justify="center"><Col span="18">
					<Row type="flex" align="middle" justify="center">
						<Col>
							<h1 className="head-justify">查询班计划</h1></Col>
					</Row>
					<Row type="flex" justify="end">
						<Col className="head-justify"><DatePicker
							defaultValue={this.props.class_plan.view_date}
							onChange={this.handleDateChange}
							disabledDate={disabledDate}/>
							<Button onClick={this.handleClick}>更新</Button></Col>
					</Row>
					<Row type="flex" align="middle" justify="space-around"><Col span="24">
						<ClassPlanTable class_plan={this.props.class_plan} dispatch={this.props.dispatch}/>
					</Col></Row></Col></Row></div>
		)
	}
}
export default connect(mapStateToProps)(ShowClassPlan)
