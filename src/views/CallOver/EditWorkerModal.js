/**
 * Created by Administrator on 2016/3/16.
 */
import React,{Component} from 'react'
import {Modal,Transfer, Button} from 'antd'
import {actions} from '../../redux/modules/call-over'

export default class EditWorkerModal extends Component {
  handleCancel() {
    this.props.dispatch(actions.end_select())
  }

  handleOk() {
    this.props.dispatch(actions.commit_select())
  }

  getSource() {
    const worker = this.props.worker.worker;
    const used = this.props.call_over.used;
    const unused = this.props.call_over.unused;
    let not_used = [];
    if (used) {
    } else {
      for (let i of used) {
        not_used.push(i.id)
      }
    }
    if (unused) {
    } else {
      for (let i of unused) {
        not_used.push(i)
      }
    }
    let data = [];
    for (let i of worker) {
      if (i.id in not_used) {
      } else {
        data.push(Object.assign({}, i, {key: i.id}));
      }
    }
    return data
  }

  onChange(targetKeys, direction, moveKeys) {
    if (direction == 'right') {
      this.props.dispatch(actions.add_unused(targetKeys));
    } else {
      this.props.dispatch(actions.reduce_unused(targetKeys));
    }
  }

  render() {
    return (
      <Modal visible={this.props.call_over.select_visible}
             onCancel={this.handleCancel.bind(this)}
             footer={[
         <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
              提交
            </Button>
        ]}>
        <Transfer dataSource={this.getSource()}
                  targetKeys={this.props.call_over.unused_cache}
                  onChange={this.onChange.bind(this)}
                  render={item=>item.name}/>
      </Modal>
    )
  }
}
