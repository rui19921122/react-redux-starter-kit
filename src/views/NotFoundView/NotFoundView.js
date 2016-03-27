import React from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'
const mapStateToProps = (state) => ({});

export class NotFoundView extends React.Component {
  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(goBack())
  }
  render() {
    return (
      <div className='container text-center'>
        <h1>抱歉，您输入的地址未找到</h1>
        <hr />
        <a onClick={this.handleClick.bind(this)}>返回</a>
      </div>
    )
  }
}

export default connect(mapStateToProps)(NotFoundView)
