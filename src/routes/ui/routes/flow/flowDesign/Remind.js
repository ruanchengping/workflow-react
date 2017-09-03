import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal,Button,Input,Icon,Select,Checkbox,Form,Tabs,Table} from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {fetchRemind} from './models/designModel';
import AddRemind from './AddRemind';
import EditRemind from './EditRemind';

const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

class Remind extends React.Component{
constructor(props) {
    super(props);

    this.columns = [ {
      title: '序号',
      dataIndex: 'id',
      width: '12%',
      render: (text, record, index) => {
        return (index+1)
      }
    }, {
      title: '提醒名称',
      dataIndex: 'remindName',
      width: '16%',
    }, {
      title: '起停用',
      dataIndex: 'startStop',
      width: '12%',
    }, {
      title: '事件',
      dataIndex: 'events',
      width: '12%',
    }, {
      title: '接收人',
      dataIndex: 'receiver',
      width: '12%',
    }, {
      title: '方式',
      dataIndex: 'remindMode',
      width: '12%',
    }, {
      title: '类型',
      dataIndex: 'remindType',
      width: '12%',
    }, {
      title: '编辑',
      width: '12%',
      render: (text, record, index) => {
        return (
          <div>           
            <span style={{padding:'6px 10px'}} onClick={()=>this.showEditModal(index,record)} >
                <Icon type="edit"  />
            </span>
          </div>)
      }
    }]
  };

  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    addVisible: false,
    editVisible: false, 
    expRecord:{},  
  }

  showDeleteConfirm=()=> {
    var selectedRowKeys = this.state.selectedRowKeys;
    if(selectedRowKeys.length>0) {
      confirm({
        title: '是否确认删除?',
      });
    }else{
      this.info();
    }
  }

  startClick=()=> {
    var selectedRowKeys = this.state.selectedRowKeys;
    if(selectedRowKeys.length>0) {
      confirm({
        title: '是否确认启用?',
      });
    }else{
      this.info();
    }
  }

  stopClick=()=> {
    var selectedRowKeys = this.state.selectedRowKeys;
    if(selectedRowKeys.length>0) {
      confirm({
        title: '是否确认停用?',
      });
    }else{
      this.info();
    }
  }

  info = () => {
    Modal.info({
      title: '请至少选择一行数据',
      onOk() {
      },
    });
  }

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  }
  hideAddModal = () => {
    this.setState({
      addVisible: false,
    });
  }

  showEditModal = (index,record) => {
      this.setState({
        editVisible: true,
        expRecord:record,
      });
  }

  hideEditModal = () => {
    this.setState({
      editVisible: false,
      expRecord:{},
    });
  }

   onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});   
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchRemind());
  }

  render(){
  	let remindBack = [];
    let count = 0;
    if (this.props.designModel != undefined) {
      remindBack = this.props.designModel.remindBack;
      count = remindBack.length;
    }
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    
    return (
    <div>     
      <div style={{textAlign: 'right'}}>
        <ButtonGroup>                     
          <Button onClick={this.showAddModal} > <Icon type="plus" />创建新的提醒</Button>
          <Button onClick={this.showDeleteConfirm} > <Icon type="minus" />删除</Button>
          <Button onClick={this.startClick} > <Icon type="check" />启用</Button>
          <Button onClick={this.stopClick} > <Icon type="lock" />停用</Button>
        </ButtonGroup>
      </div>
      <Table style={{margin: '5px 0'}}  columns={this.columns} dataSource={remindBack} scroll={{ y:document.body.clientHeight -427}}
          rowSelection={rowSelection} rowKey={record => record.id} size='middle' pagination={{
           pageSize: 7,
           showTotal: function () {  //设置显示一共几条数据
            return '共'+count +'  条数据';
          }}}/>

      <Modal className="siderModal"
          title="新建提醒消息"
          width='840px'
          style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
          visible={this.state.addVisible}
          closable
          onCancel={this.hideAddModal}
          footer={null}
        >
          <AddRemind />
        </Modal>

        <Modal className="siderModal"
          title="编辑提醒消息"
          width='840px'
          style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
          visible={this.state.editVisible}
          closable
          onCancel={this.hideEditModal}
          footer={null}
        >
          <EditRemind expRecord={this.state.expRecord}/>
        </Modal>
    </div>
    )
  }
}

Remind.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Remind);



