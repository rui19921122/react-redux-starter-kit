import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col,Row, Table,Popconfirm,Button,Modal} from 'antd'
import '../../styles/core.scss'
import CustomMenu from '../../components/Menu/menu'
import {actions} from '../../redux/modules/worker'
import {AddWorkerModal} from '../../components/Worker/addWorkerModal'
const mapStateToProps = (state) => ({
  worker: state.worker,
  menu: state.menu
});
class manageWorker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.dispatch(actions.getPosition())
    this.props.dispatch(actions.getWorker())
  }

  deleteClicked(index) {
    let self = this;
    return function () {
      self.props.dispatch(actions.deleteWorker(index))
    }
  }

  changeClicked(index) {
    let self = this;
    return function () {

    }
  };

  renderAction(text, record, index) {
    return (<span>
      <Popconfirm title="确定要删除这个人吗"
                  onConfirm={this.deleteClicked(this.props.worker.worker[index]['id'])}><a
        href="#">删除</a></Popconfirm>
          <span className="ant-divider"/>
      <a href="#" onClick={this.changeClicked(index)}>修改</a>
    </span>)
  }

  addWorkerClicked() {
    this.props.dispatch(actions.open_create_user())
  }

  renderPosition(text, record, index) {
    const filter = this.props.worker.position.filter((item)=>item['id'] === record['position'])[0]
    return (
      <span key={'position'+record['id']}>
        {filter ? filter['name'] : ''}
        </span>
    )
  }

  render() {
    let columns = [
      {title: '姓名', dataIndex: 'name', key: 'name'},
      {
        title: '职位', dataIndex: 'position', key: 'position', render: this.renderPosition.bind(this)
      },
      {
        title: '学徒', dataIndex: 'is_study', key: 'is_study', render(text, record){
        if (record.is_study) {
          return <span>是</span>
        }
      }
      },
      {
        title: '替班', dataIndex: 'alter', key: 'ater', render(text, record){
        if (record.alter) {
          return <span>是</span>
        }
      }
      },
      {title: '替班', dataIndex: 'alter', key: 'alter'},
      {title: '班次', dataIndex: 'class_number', key: 'class_number'},
      {
        title: '操作', key: 'handle',
        render: this.renderAction.bind(this)
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
                <h1 className="head-justify-first">职工管理</h1>
              </Col></Row>
            <Row type="flex" justify="end">
              <Col span="4" pull="3" className="head-justify-not-first">
                <Button onClick={this.addWorkerClicked.bind(this)}>增加职工</Button>
              </Col></Row>
            <Row type="flex" justify="center">
              <Col span="15">
                <Table columns={columns}
                       pagination={false}
                       loading={this.props.worker.fetch?true:false}
                       className="justify-table"
                       dataSource={this.props.worker.worker}/>
              </Col></Row>
          </Col>
        </Row>
        <AddWorkerModal dispatch={this.props.dispatch} worker={this.props.worker}/>
      </div>)
  }
}

export
default

connect(mapStateToProps)

(
  manageWorker
)
