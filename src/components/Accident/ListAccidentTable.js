/**
 *
 * Created by Administrator on 2016/3/7.
 */
import React,{Component} from 'react'
import {Table,Popconfirm} from 'antd'
import {deleteStudy} from '../../redux/modules/professional_study'
export default class ListProfessionStudyTable extends Component {
	constructor(props) {
		super(props);
	}

	deleteClicked(id) {
		let self = this;
		return function () {
			self.props.dispatch(deleteStudy(id))
		}
	}

	renderAction(text, record, index) {
		return (<span>
      <Popconfirm title="确定要删除这个事项吗？"
                  onConfirm={this.deleteClicked(record.id)}><a
	      href="#">删除</a></Popconfirm>
    </span>)
	}

	render() {
		let header = [{
			title: '序号',
			dataIndex: '',
			key: 'number',
			render(text, record, index){
				return index + 1
			}
		},
			{
				title: '内容',
				dataIndex: 'content',
				width: '30%',
				key: 'content'
			}, {
				title: '发布日期',
				dataIndex: 'publish_time',
				key: 'publish_time',
				render(text, record, index){
					return text.split('T')[0]
				}
			}, {
				title: '一班',
				dataIndex: 'checked_by_first',
				key: 'checked_by_first',
				render(text, record, index){
					if (text) {
						return '已学习'
					} else {
						return ''
					}
				}
			},
			{
				title: '二班',
				dataIndex: 'checked_by_second',
				key: 'checked_by_second',
				render(text, record, index){
					if (text) {
						return '已学习'
					} else {
						return ''
					}
				}
			},
			{
				title: '三班',
				dataIndex: 'checked_by_third',
				key: 'checked_by_third',
				render(text, record, index){
					if (text) {
						return '已学习'
					} else {
						return ''
					}
				}
			},
			{
				title: '四班',
				dataIndex: 'checked_by_forth',
				key: 'checked_by_forth',
				render(text, record, index){
					if (text) {
						return '已学习'
					} else {
						return ''
					}
				}
			}, {
				title: '操作',
				dataIndex: 'control',
				key: 'control',
				render: this.renderAction.bind(this)
			}
		];
		return (
			<Table columns={header}
			       className='justify-table'
			       dataSource={this.props.study.content}
			       panigaton={false}
			       bordered/>
		)
	}
}
