import React from 'react';
import {Table, Input,Form,Button, Icon, Select, Modal, Popconfirm,AutoComplete} from 'vdap-ui';
import {notification} from 'antd';
import {connect} from 'react-redux';
import FlowChart from './FlowChart';
import EditFlowModal from './EditFlowModal';
import AddFlowModal from './AddFlowModal';

const ButtonGroup = Button.Group;
const autoSource=["张三","李四","通信报销审批"];

class FlowContent extends React.Component{
  constructor(props) {
    super(props);
    this.columns =[{
      title: '状态',
      dataIndex: 'status',
      width: '10%',
    }, {
      title: '逾期',
      dataIndex: 'expandPeriod',
      width: '10%',
    }, {
      title: '流程',
      dataIndex: 'flow',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div>           
            <span style={{padding:'6px 10px'}} onClick={()=>this.showFlowModal(index)} >
                <font style={{color:"blue",textDecoration:"underline"}}>{text}</font>
            </span>
          </div>)
      }
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      width: '10%',
    }, {
      title: '发起人',
      dataIndex: 'creator',
      width: '10%',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      width: '10%',
    }, {
      title: '模型',
      dataIndex: 'model',
      width: '10%',
    }, {
      title: '单据号',
      dataIndex: 'documentNum',
      width: '10%',
    }, {
      title: '部门',
      dataIndex: 'department',
      width: '10%',
    }, {
      title: '编辑',
      width: '10%',
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
    selectedRowKeys: [], 
    flowVisible: false,
    flowId: "",
    addVisible: false,
    editVisible: false,
    flowRecord:{},
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
        flowId:index,
        flowRecord:record,
      });
  }

  hideEditModal = () => {
    this.setState({
      editVisible: false,
      flowId: "",
      flowRecord:{},
    });
  }

   onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
    console.log(selectedRowKeys.length);
    console.log(selectedRowKeys[0]);
  }

  showFlowModal = (index) => {
      console.log(index);
      this.setState({
        flowVisible: true,
        flowId: index,
      });
  }

  hideFlowModal = () => {
    this.setState({
      flowVisible: false,
      flowId: "",
    });
  }

  componentDidMount() {
    // const {dispatch} = this.props;
    // // dispatch(fetchFlowCol());
    // dispatch(fetchFlowData("unfinished"));
  }

  info =()=> {
    Modal.info({
      title: '请至少选择一行数据',
      onOk() {},
    });
  }

  endClick=()=> {
    const {dispatch} = this.props;    
    var selectedRowKeys = this.state.selectedRowKeys;   
    if(selectedRowKeys.length>0){
    	this.setState({selectedRowKeys: [],});
     	notification.success({
	      message: selectedRowKeys.length+'条记录已经终止！',
	    });
    //   this.setState({ selectedRowKeys:[] });
    //   confirm({
    //     title: '是否确认删除?',
    //     onOk() {
    //       axios.post('/api/user/deleteBatch/'+selectedRowKeys,
    //       {headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //         } 
    //       })
    //       .then(function (response) {
    //       	   this.setState({selectedRowKeys: [],}); 
    //             dispatch(fetchUserData());
    //             notification.success({
    //               message: '删除了'+response.data+'条记录',
    //             });
    //       })
    //       .catch(function (error) {
    //         notification.error({
    //           message: '删除失败',
    //         }); 
            
    //       });
    //     },
    //     onCancel() {
    //       console.log('取消了');
    //     },
    //   });
    //   // this.getTable();
    }else{
       this.info();
    }	  
  }

  deleteClick=()=> {
    const {dispatch} = this.props;    
    var selectedRowKeys = this.state.selectedRowKeys;   
    if(selectedRowKeys.length>0){
     	notification.success({
	      message: '删除了'+selectedRowKeys.length+'条记录',
	    });
    //   this.setState({ selectedRowKeys:[] });
    //   confirm({
    //     title: '是否确认删除?',
    //     onOk() {
    //       axios.post('/api/user/deleteBatch/'+selectedRowKeys,
    //       {headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //         } 
    //       })
    //       .then(function (response) { 
    //             dispatch(fetchUserData());
    //             notification.success({
    //               message: '删除了'+response.data+'条记录',
    //             });
    //       })
    //       .catch(function (error) {
    //         notification.error({
    //           message: '删除失败',
    //         }); 
            
    //       });
    //     },
    //     onCancel() {
    //       console.log('取消了');
    //     },
    //   });
    //   // this.getTable();
    }else{
       this.info();
    }	  
  }


  render(){
  	// console.log(this.props);
    let flowData = [];
    // let flowCol = [];
    let count = 0;
    if (this.props.flowModel != undefined) {
      flowData = this.props.flowModel.flowDataBack;
      // flowCol = this.props.flowModel.flowColBack;
      count = flowData.length;
    }
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // onSelection: this.onSelection,
    }

  	 return (
      <div>
        <table style={{width:'100%'}}>
		 <tbody>
		  <tr>
		   <td>
		      	<AutoComplete dataSource={autoSource} style={{ width:300 }}
                onSelect={this.onSelectComplete}
                onSearch={this.handleSearchComplete}
                placeholder="输入流程、发起人、单据号关键字快速查询" 
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
	       </td>
	       <td > 
		       &nbsp;&nbsp;
		       <div style={{float:'right'}}>
			        <ButtonGroup>                     
			          <Button onClick={this.showAddModal} > <Icon type="plus" />新建</Button>               
			          <Button onClick={this.deleteClick} > <Icon type="minus" />删除</Button>
                <Button onClick={this.endClick} > <Icon type="disconnect" />终止</Button>
			          <Button onClick={this.flashClick} > <Icon type="retweet" />刷新</Button>
			        </ButtonGroup>
			    </div>
	        </td>
	      </tr>
		  <tr>
		  <td colSpan="2">
	        <Table style={{margin: '5px 0'}} columns={this.columns} dataSource={flowData} scroll={{ y:document.body.clientHeight -427}}
	            rowKey={record => record.id} rowSelection={rowSelection}  size='middle' 
	            pagination={{pageSize: 13,
	            	showTotal: function () {  //设置显示一共几条数据
		            	return '共'+count +'  条数据';
			        }
			    }}
		    />
          </td>
         </tr>
		 </tbody>
		</table>

		<Modal className="siderModal"
          title={"流程图"+this.state.flowId}
          width='840px'
          style={{background: '#fff',  top: 0, right: 0, position: 'absolute'}}
          visible={this.state.flowVisible}
          closable
          onCancel={this.hideFlowModal}
          footer={null}
        >
          <FlowChart flowId={this.state.flowId}/>
    </Modal>

    <Modal className="siderModal"
      title={"新建流程"+this.state.flowId}
      width='840px'
      style={{background: '#fff', top: 0, right: 0, position: 'absolute'}}
      visible={this.state.addVisible}
      closable
      onCancel={this.hideAddModal}
      footer={null}
    >
      <AddFlowModal />
    </Modal>

    <Modal className="siderModal"
      title={"编辑流程"+this.state.flowId}
      width='840px'
      style={{background: '#fff', top: 0, right: 0, position: 'absolute'}}
      visible={this.state.editVisible}
      closable
      onCancel={this.hideEditModal}
      footer={null}
      // okText="保存"
      // cancelText="取消"
    >
      <EditFlowModal flowRecord={this.state.flowRecord}/>
    </Modal>

      </div>
    )
  }
}

FlowContent.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(FlowContent);

