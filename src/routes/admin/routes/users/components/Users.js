import React, {Component} from 'react';
import {Card, Table} from 'antd';


const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];
class Users extends Component {
  render() {
    const {list, dispatch} = this.props;
    return (
      <Card>
        <Table dataSource={list} columns={columns}/>
      </Card>
    )
  }
}


export default Users;

