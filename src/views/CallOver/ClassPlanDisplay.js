/**
 *
 *
 * Created by Administrator on 2016/3/2.
 */
import React from 'react'
import {Table} from 'antd'
import {Spin} from 'antd';


class ClassPlanTable extends React.Component {
  constructor(props) {
    super(props);
  }

  get_ordered_data() {
    let all_collection = [];
    let father_collection = [];
    let key = 0;
    let index = 1;
    this.props.class_plan.day_detail.forEach((each)=> {
      let _child = [];
      if (each['publish_detail']) {
        each['publish_detail'].forEach((inner_each)=> {
          all_collection.push({
            'key': key,
            'content': inner_each.detail
          });
          _child.push(key);
          key += 1;
        })
      }
      father_collection.push([each.department, each.style, _child, index]);
    });
    return {'father_collection': father_collection, 'all_collection': all_collection}

  }


  render() {
    let get_parent = (origin, child)=> {
        let parent = [];
        let first = false;
        let each;
        for (each of origin) {
          if (each[2].find((n)=>n == child.key) != undefined) {
            parent = each;
            each[2][0] == child.key ? first = true : first = false;
            break;
          }
        }
        return {
          parent: parent
          ,
          first: first
        }
      }
      ;
    let _ = this.get_ordered_data();
    let father_collection = _.father_collection;
    let all_collection = _.all_collection;
    const header = [
      {
        title: '名称',
        dataIndex: 'style',
        key: 'name',
        width: '10%',
        render(text, record, index){
          let data = get_parent(father_collection, record);
          if (data.parent && data.first) {
            return {
              children: data.parent[1],
              props: {rowSpan: data.parent[2].length}
            }
          } else {
            return {
              children: data.parent[1],
              props: {rowSpan: 0}
            }
          }
        }
      }
      ,
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width: '70%',
        props: {
          style: {'text-align': 'left'}
        }
      }
      ,
      {
        title: '涉及部门',
        dataIndex: 'department',
        key: 'department',
        width: '20%',
        render(text, record, index){
          let data = get_parent(father_collection, record);
          if (data.parent && data.first) {
            return {
              children: data.parent[0],
              props: {rowSpan: data.parent[2].length}
            }
          } else {
            return {
              children: data.parent[0],
              props: {rowSpan: 0}
            }
          }
        }
      }
    ];
    return (
      <Table columns={header}
             className='justify-table'
             dataSource={all_collection}
             pagination={false}
             bordered/>)
  }
}

export default ClassPlanTable
