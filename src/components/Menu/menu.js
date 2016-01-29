/**
 *
 * Created by Administrator on 2016/1/26.
 */
import {Menu, Icon} from 'antd'
import React from 'react'
export default class CustomMenu extends React.Component {
	extract_menu(obj) {
		let r = '';
		for (let i in obj) {
			r = r + i.name
		}
		return r
	}

	return_menu(obj, index) {
		if (obj.type === 'single') {
			return <Menu.Item key={index}>obj.name</Menu.Item>
		}
	}

	render() {
		return (
			<Menu
				mode="horizontal"
				defaultSelectedKeys="1"
			>
				<Menu.Item>{this.extract_menu(this.props.menu)}</Menu.Item>
			</Menu>
		)
	}
}
