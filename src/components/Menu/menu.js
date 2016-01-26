/**
 *
 * Created by Administrator on 2016/1/26.
 */
import {Menu, Icon} from 'antd'
import React from 'react'
export default class CustomMenu extends React.Component {

  render() {
    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys="1"
      >
        <Menu.Item key="1">
          5
        </Menu.Item>
      </Menu>
    )
  }
}
