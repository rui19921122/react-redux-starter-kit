import React from 'react'
import { Link } from 'react-router'


export class NotFoundView extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <h1>抱歉，您输入的地址未找到</h1>
        <hr />
        <Link to='/'>返回首页</Link>
      </div>
    )
  }
}

export default NotFoundView
