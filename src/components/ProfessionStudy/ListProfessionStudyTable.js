/**
 *
 * Created by Administrator on 2016/3/7.
 */
import React,{Component} from 'react'
import {Table} from 'antd'
export default class ListProfessionStudyTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let header = [{
      title: '序号',
      dataIndex: '',
      key: 'number',
      render(text, record, index){
        return index
      }
    },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content'
      }, {
        title: '发布日期',
        dataIndex: 'publish_date',
        key: 'publish_date'
      }
    ];
    console.log(this.props)
    return (
      <Table columns={header}
             dataSource={this.props.study.content}
             bordered/>
    )
  }
}
