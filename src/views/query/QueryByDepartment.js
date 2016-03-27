import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Col, Row, Table, Popconfirm, Button, Modal, DatePicker} from 'antd'
import {actions} from '../../redux/modules/query_list'
import CustomMenu from '../../components/Menu/menu'
const mapStateToProps = (state) => ({
  menu: state.menu,
  query_list: state.query_list
});
class QueryByDepartment extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDatePickerChange(value) {
    this.props.dispatch(actions.GetList(value[0], value[1]))
  }

  render() {
    const startDisableData = (current) => {
      return current && current.getTime() > Date.now()
    };
    const endDisableData = (current) => {
      let time = current.getTime();
      return current && current > Date.now() && current > this.props.query_list.start
    };
    const headers = [
      {
        title: '序号',
        render(text, record, index) {
          return index + 1
        }
      }, {
        title: '部门',
        dataIndex: 'department'
      }, {
        title: '主持人',
        dataIndex: 'host_person'
      }, {
        title: '日期',
        dataIndex: 'date'
      }, {
        title: '班次',
        dataIndex: 'day_number',
        render(text){
          if (text == '1') {
            return '白班'
          } else {
            return '夜班'
          }
        }
      },
      {
        title: '开始时间',
        dataIndex: 'begin_time',
        render(text){
          if (text) {
            return text
          } else {
            return <span style={{color:'red'}}>缺失</span>
          }
        },
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        render(text){
          if (text) {
            return text
          } else {
            return <span style={{color:'red'}}>缺失</span>
          }
        }
      },
      {
        title: '班次',
        dataIndex: 'class_number'
      },
      {
        title: '操作',
        dataIndex: 'id',
        render(text){
          return <Link to={'/query-detail/' + text}>查看详细</Link>
        }
      }

    ];
    return (
      <div>
        <Row>
          <Col span="4">
            <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
          <Col span="20">
            <Row type="flex" justify="center">
              <Col>
                <h1 className="head-justify-first">查询点名会情况</h1>
              </Col></Row>
            <Row type="flex" justify="center" className="head-justify-not-first">
              <Col offset="7">
                <div>
                  <DatePicker.RangePicker format="yyyy/MM/dd"
                                          onChange={this.handleDatePickerChange.bind(this)}
                  />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="15">
                <Table columns={headers}
                       className='justify-table'
                       dataSource={this.props.query_list.data}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(mapStateToProps)(QueryByDepartment);
