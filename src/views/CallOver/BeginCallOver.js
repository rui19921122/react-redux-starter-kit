/**
 *
 * Created by Administrator on 2016/3/16.
 */
import React,{Component} from 'react'
import CustomMenu from '../../components/Menu/menu'
import {Col,Row, Table,Button, Transfer, Select,Modal} from 'antd'
import {actions} from '../../redux/modules/worker'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import EditWorkerModal from './EditWorkerModal'
import {actions as call_over_actions,get_default_class_number} from '../../redux/modules/call-over'
const mapStateToProps = (state) => ({
  class_plan: state.class_plan,
  accident: state.accident,
  study: state.study,
  menu: state.menu,
  worker: state.worker,
  call_over: state.call_over
});
class BeginCallOver extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(actions.getWorker());
    this.props.dispatch(get_default_class_number())
  }

  handleEditClick() {
    this.props.dispatch(call_over_actions.begin_select())
  }

  BeginCall() {
    this.props.dispatch(call_over_actions.begin_call_over())
  }

  get_default_class_number() {
    this.props.dispatch(call_over_actions.get_default_class_number())
  }

  static showClassNumberChangeModal(key, prev, dispatch) {
    return (Modal.confirm({
        title: '注意',
        content: '您正试图更改班次，这将造成系统数据统计错误，若非必要原因，请不要随意更改此项,您确认要将班次从第' + prev + '班更改为第' + key + '班吗？',
        onOk() {
          dispatch(call_over_actions.update_class_number(key))
        },
        onCancel() {
        }
      })
    )
  }

  handleClassSelectChange(value, label) {
    BeginCallOver.showClassNumberChangeModal(value, this.props.call_over.class_number, this.props.dispatch)
  }

  render() {
    const UsedTableCol = [
      {
        key: 'number',
        title: '序号',
        render(text, record, index){
          return index
        }
      },
      {
        key: 'name',
        title: '姓名',
        dataIndex: 'name'
      },
      {
        key: 'time',
        title: '签到时间',
        dataIndex: 'time'
      }
    ];
    let worker = this.props.worker.worker;
    const UnUsedTableCol = [
      {
        key: 'number',
        title: '序号',
        render(text, record, index){
          return index + 1
        }
      },
      {
        key: 'name',
        title: '姓名',
        render(text, record, index){
          for (let i of worker) {
            if (i.id == record) {
              return i.name
            }
          }
        }
      }, {
        key: 'position',
        title: '职位',
        render(text, record, index){
          for (let i of worker) {
            if (i.id == record) {
              return i.position
            }
          }
        }
      }
    ];

    if (this.props.call_over.can_begin) {
      return (
        <div>
          <Row>
            <Col span="4">
              <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
            <Col span="20">
              <Row type="flex" justify="center">
                <Col>
                  <h1 className="head-justify-first">准备点名</h1>
                </Col></Row>
              <Row type="flex" justify="center" className="head-justify-not-first">
                <h2>使用指纹完成签到的名单</h2><Button>刷新</Button>
              </Row>
              <Row type="flex" justify="center">
                <Col span="20">
                  <Table columns={UsedTableCol}
                         dataSrc={this.props.call_over.used}
                         bordered/></Col>
              </Row>
              <Row type="flex" justify="center" className="head-justify-not-first">
                <h2>未使用指纹完成签到的名单</h2><Button onClick={this.handleEditClick.bind(this)}>编辑</Button>
              </Row>
              <Row type="flex" justify="center" className="head-justify-not-first">
                <Col span="20">
                  <Table columns={UnUsedTableCol}
                         dataSource={this.props.call_over.unused}
                         bordered/></Col>
              </Row>
              <Row type="flex" justify="center" className="head-justify-not-first">
              <span
                style={{
                        height:'30px',
                      fontSize:'20px',
                        lineHeight:'30px'
                      }}
              >第</span>
                <Select onChange={this.handleClassSelectChange.bind(this)}
                        style={{
                      fontSize:'20px',
                        height:'30px',
                        paddingLeft:'10px',
                        paddingRight:'10px'
                      }}
                        dropdownMatchSelectWidth={true}
                        defaultValue={this.props.call_over.class_number}
                >
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                </Select><span
                style={{
                        height:'30px',
                        lineHeight:'30px',
                          fontSize:'20px',
                        paddingRight:'10px'
                      }}
              > 班</span>
                <Button onClick={this.BeginCall.bind(this)}
                        size="large"
                >开始点名</Button>
              </Row>
              <EditWorkerModal call_over={this.props.call_over} dispatch={this.props.dispatch}
                               worker={this.props.worker}/>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
          <Row>
            <Col span="4">
              <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/></Col>
            <Col span="20">
              <Row type="flex" justify="center">
                <Col>
                  <h1 className="head-justify-first">现在不是点名时间，请在7:00-8:00,18:00-19:00之间开始点名</h1>
                </Col></Row>
            </Col>
          </Row>
        </div>

      )
    }
  }
}
export default connect(mapStateToProps)(BeginCallOver);
