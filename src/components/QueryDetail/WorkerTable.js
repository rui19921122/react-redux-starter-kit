/**
 * Created by Administrator on 2016/3/27.
 */
import {Col, Row, Table, Popconfirm, Button, Modal, DatePicker} from 'antd'
import React from 'react'

export default class RenderWorker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.person;
    const column = [
      {
        title: '序号',
        key: 'number',
        render(text, record, index){
          return index + 1
        }
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '职位',
        dataIndex: 'position'
      },
      {
        title: '学员',
        dataIndex: 'is_study',
        render(text){
          if (text) {
            return '是'
          } else {
            return '否'
          }
        }
      },
      {
        title: '替班',
        dataIndex: 'alter',
        render(text){
          if (text) {
            return '是'
          } else {
            return '否'
          }
        }
      }
    ];
    return (
      <Table columns={column}
             className="justify-table"
             pagination={false}
             dataSource={data}
      />
    )
  }
}
