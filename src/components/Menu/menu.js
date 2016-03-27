/**
 *
 * Created by Administrator on 2016/1/26.
 */
import {Menu, Icon} from 'antd'
import React from 'react'
import {Link} from 'react-router'
import {getMenu} from '../../redux/modules/menu'

export default class CustomMenu extends React.Component {
	constructor(props) {
		super(props);
    if (this.props.menu.items.length > 0) {
    } else {
      props.dispatch(getMenu())
    }
	}


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
				defaultSelectedKeys={[this.props.menu._menu]}
			>
				{this.props.menu.items.map(CustomMenu.process)}
			</Menu>
		)
	}
}
CustomMenu.propTypes = {
	menu: React.PropTypes.array.isRequired,
	_menu: React.PropTypes.string
};
