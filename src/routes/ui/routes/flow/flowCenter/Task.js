import React from 'react';
import {Table, Input, Button, Icon, Select, Modal, Popconfirm,AutoComplete} from 'vdap-ui';
import {connect} from 'react-redux';
import { fetchTaskData} from './models/flowModel';

const ButtonGroup = Button.Group;
const autoSource=["张三","李四","通信报销审批"];

class Task extends React.Component{
  constructor(props) {
    super(props);
    this.columns =[{
      title: '状态',
      dataIndex: 'status',
      width: '11%',
    },{
      title: '任务名称',
      dataIndex: 'taskName',
      width: '11%',
    },{
      title: '执行人',
      dataIndex: 'executor',
      width: '11%',
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      width: '11%',
    },{
      title: '到期时间',
      dataIndex: 'expiration',
      width: '11%',
    },{
      title: '结束时间',
      dataIndex: 'endTime',
      width: '11%',
    }, {
      title: '是否逾期',
      dataIndex: 'isexpand',
      width: '11%',
    }, {
      title: '流程实例名称',
      dataIndex: 'processName',
      width: '11%',
    }, {
      title: '单据号',
      dataIndex: 'documentNum',
      width: '11%',
    }];

    this.vcolumns =[{
      title: '变量名称',
      dataIndex: 'vName',
      width: '25%',
    },{
      title: '类型',
      dataIndex: 'vType',
      width: '25%',
    },{
      title: '值',
      dataIndex: 'vValue',
      width: '25%',
    },{
      title: '更新时间',
      dataIndex: 'updatetime',
      width: '25%',
    }]
  };

  state = {
    selectedRowKeys: [],
    vselectedRowKeys: [],  
    flowVisible: false,
    flowId: "",
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
    console.log(selectedRowKeys.length);
    console.log(selectedRowKeys[0]);
  }

  componentDidMount() {
  	if(this.props.flag=="waited"){
  		const {dispatch} = this.props;
    	dispatch(fetchTaskData(this.props.flag));
  	}   
  }

  info =()=> {
    Modal.info({
      title: '请至少选择一行数据',
      onOk() {},
    });
  }

  render(){
  	let taskData = [];
    let count = 0,vcount = 0;
    if (this.props.flowModel != undefined) {
      taskData = this.props.flowModel.taskData;
      count = taskData.length;
    }
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

  	 return (
      <div>
      	<div style={{display: 'inline-block'}}>
		  	<AutoComplete dataSource={autoSource} style={{ width:300 }}
			    onSelect={this.onSelectComplete}
			    onSearch={this.handleSearchComplete}
			    placeholder="输入任务名称查询" 
			>
		    	<Input suffix={<Icon type="search" />} />
			</AutoComplete>
		</div>
		<div style={{display: 'inline-block'}}> 
		   &nbsp;&nbsp;
		   <div style={{float:'right'}}>
		        <ButtonGroup>                     
		          <Button onClick={this.endClick} > <Icon type="export" />改派</Button>
		          <Button onClick={this.flashClick} > <Icon type="retweet" />刷新</Button>
		        </ButtonGroup>
		    </div>
		</div>
		<Table style={{margin: '5px 0'}} columns={this.columns} dataSource={taskData} scroll={{ y:document.body.clientHeight -427}}
            rowKey={record => record.id} rowSelection={rowSelection}  size='middle' bordered
            pagination={{pageSize: 7,
            	showTotal: function () {  //设置显示一共几条数据
	            	return '共'+count +'  条数据';
		        }
		    }}
	    />
      </div>
    )
  }
}

Task.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(Task);
