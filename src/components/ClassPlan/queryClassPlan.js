/**
 *
 *
 * Created by Administrator on 2016/3/2.
 */
import React from 'react'
import {Table} from 'antd'
import { Spin } from 'antd';


class ClassPlanTable extends React.Component {
	constructor(props) {
		super(props);
		this.updateClassPlan = this.updateClassPlan.bind(this);
		this.updateClassPlan()
	}

	updateClassPlan(e) {
		const {dispatch} = this.props;
	}


	render() {
		if (this.props.class_plan.fetch) {
			return <Spin />
		}
		else {
			return (
				<Table columns={this.props.class_plan.header}
				       dataSource={this.props.class_plan.content? this.props.class_plan.content:''}
				       pagination={false}
				       bordered/>)
		}
	}
}

export default ClassPlanTable
