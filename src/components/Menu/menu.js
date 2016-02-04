/**
 *
 * Created by Administrator on 2016/1/26.
 */
import {Menu, Icon} from 'antd'
import React from 'react'
import {Link} from 'react-router'
export default class CustomMenu extends React.Component {
	//todo 解决链接第一次点击不跳转问题


	static processSingle(single, index) {
		return <Menu.Item key={single.key}><Link to={single.href}>{single.name}</Link></Menu.Item>
	};

	static processMultiChildren(single, index) {
		return <Menu.Item key={single.key}>
			<Link to={single.href}>{single.name}</Link>
		</Menu.Item>
	};

	static processMulti(multi, index) {
		return (<Menu.SubMenu title={multi.name} key={index+1}>
			{multi.children.map(CustomMenu.processMultiChildren)}
		</Menu.SubMenu>);
	};

	static process(inner, index) {
		if (inner.type === 'single') {
			return CustomMenu.processSingle(inner, index)
		} else {
			return CustomMenu.processMulti(inner, index)
		}
	}


	render() {
		return (
			<Menu
				mode="inline"
				defaultSelectedKeys={[this.props._menu]}
			>
				{this.props.menu.map(CustomMenu.process)}
			</Menu>
		)
	}
}
CustomMenu.propTypes = {
	menu: React.PropTypes.array.isRequired,
	_menu: React.PropTypes.string
};
