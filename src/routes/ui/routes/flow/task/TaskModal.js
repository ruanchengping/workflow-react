import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Timeline,Tabs,Table,Input,Button,Icon,Select,Modal,Card } from 'vdap-ui';
import {connect} from 'react-redux';
import { fetchExpenseData} from './models/taskModel';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const { TextArea } = Input;

class TaskModal extends React.Component{
	constructor(props) {
    super(props);

    this.columns = [ {
      title: '序号',
      dataIndex: 'id',
      width: '10%',
      render: (text, record, index) => {
        return (index+1)
      }
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      width: '15%',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      width: '15%',
    }, {
      title: '报销标准',
      dataIndex: 'expendStandard',
      width: '15%',
    }, {
      title: '票据金额(元)',
      dataIndex: 'paperMoney',
      width: '15%',
    }, {
      title: '报销金额(元)',
      dataIndex: 'expendMoney',
      width: '15%',
    }]
  };

  state = {
	  selectedRowKeys: [],  // Check here to configure the default column
    addVisible: false,
    editVisible: false,
    activeKey:'expense',    
  }

   onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});   
  }

  tabClick = (activeKey) => {
  	console.log(activeKey);
    this.setState({ activeKey });
    const {dispatch} = this.props;
    if(activeKey=="expense"){
    	dispatch(fetchExpenseData());
    }else if(activeKey=="approval"){
    	// dispatch(fetchActivityData());
    }   
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchExpenseData());
  }

  render() {
    let expenseData = [];
    let count = 0;
    if (this.props.taskModel != undefined) {
      expenseData = this.props.taskModel.expenseDataBack;
      count = expenseData.length;
    }
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'all-data',
        text: '全选数据',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()],  // 0...45
          });
        },
      }, {
        key: 'odd',
        text: '选奇数行',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({selectedRowKeys: newSelectedRowKeys});
        },
      }, {
        key: 'even',
        text: '选偶数行',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({selectedRowKeys: newSelectedRowKeys});
        },
      }],
      onSelection: this.onSelection,
    };
    
    return (
    <div style={{height:'90vh',overflow: 'auto',backgroundColor:'white'}}>
    	<br/>
        <div style={{backgroundColor:'#f8fafb',padding:'5px'}}>
          <table width="100%" style={{border:0,margin:'5px'}}>
            <tbody>
            <tr>
              <td width="20px" rowSpan='2' >
                <Icon type='bulb' style={{ fontSize: 30, color: '#FFF', background:'#a1c2f9',padding:'10px',borderRadius:'50%',margin:'15px' }} />
              </td>
              <td style={{padding:'5px' }}>
                <p  style={{padding:'20px 0 0',color:'#2267A7' }}>
                {this.props.taskRecord.submitter} 的 {this.props.taskRecord.business}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{padding:'5px' }}>&nbsp;</td>
              <td style={{position:"absolute",right:'30px'}}>
		        <ButtonGroup>                     
		          <Button onClick={this.flashClick} > <Icon type="check" />同意</Button>
		          <Button onClick={this.flashClick} > <Icon type="rollback" />驳回</Button>
		          <Button onClick={this.endClick} > <Icon type="export" />改派</Button>
		        </ButtonGroup>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <br />

        <div style={{padding:'5px 50px'}}>
          <table width="100%" >
            <tbody>
            <tr>
              <td style={{padding:'10px 0'}} width="10%" >任务：</td>
              <td width="25%" >{this.props.taskRecord.tasks}</td>
              <td width="10%" >创建时间：</td>
              <td width="25%" >{this.props.taskRecord.createTime}</td>
              <td width="10%" >提交人：</td>
              <td>{this.props.taskRecord.submitter}</td>
            </tr>
            <tr>
              <td style={{padding:'10px 0'}} width="5%" >业务/流程：</td>
              <td style={{paddingRight:'40px'}}>{this.props.taskRecord.business}</td>
              <td >到期时间：</td>
              <td>{this.props.taskRecord.expandTime}</td>
              <td >优先级：</td>
              <td>{this.props.taskRecord.priority}</td>
            </tr>
            </tbody>
          </table>
          </div>
  			<div style={{margin:'5px 5px 5px 50px',width:'90%',border:'0'}}>
  				
  				<Tabs activeKey={this.state.activeKey} type="card" onChange={this.tabClick}>
		            <TabPane tab="报销单" key="expense" >
		                <div>
					      <table width="100%" >
				            <tbody>
				            <tr>
				              <td style={{padding:'10px 0'}} width="10%" >单号：</td>
				              <td width="25%" >{this.props.taskRecord.numbers}</td>
				              <td width="10%" >提交时间：</td>
				              <td width="25%" >{this.props.taskRecord.submitTime}</td>
				              <td width="10%" >报销人：</td>
				              <td>笨蛋猪</td>
				            </tr>
				            <tr>
				              <td style={{padding:'10px 0'}} width="5%" >报销金额：</td>
				              <td style={{paddingRight:'40px'}}>389.12</td>
				              <td >报销项目：</td>
				              <td>日常费用</td>
				              <td >部门：</td>
				              <td>{this.props.taskRecord.department}</td>
				            </tr>
				            <tr>
				              <td style={{padding:'10px 0'}} width="5%" >承担部门：</td>
				              <td colSpan='5' style={{paddingRight:'40px'}}>专项实施部</td>				              
				            </tr>
				            </tbody>
				          </table>

				          <Table style={{margin: '5px 0'}}  columns={this.columns} dataSource={expenseData} scroll={{ y:document.body.clientHeight -427}}
			                 rowKey={record => record.id} size='middle' pagination={{
			                 pageSize: 7,
			                 showTotal: function () {  //设置显示一共几条数据
			                  return '共'+count +'  条数据';
			                }}}/>
				        </div>
		            </TabPane>
		            <TabPane tab="审批历史" key="approval" >
		              <div style={{margin: '5px'}}>
                    <Timeline>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">2017-03-31 08:30:56，我，部门经理审批</Timeline.Item>
                      <Timeline.Item dot={<Icon type="check-square" style={{ fontSize: '16px' }} />} color="green">2017-03-21 18:30:56，张花，项目经理审批，审批通过</Timeline.Item>
                      <Timeline.Item dot={<Icon type="menu-unfold" style={{ fontSize: '16px' }} />} color="green">2017-03-21 08:30:56，王虎，改派给张花</Timeline.Item>
                      <Timeline.Item color="green">{this.props.taskRecord.submitTime}，{this.props.taskRecord.submitter}，提交 </Timeline.Item>
                    </Timeline>
		              </div>
		            </TabPane>
		            <TabPane tab="评语" key="comment" >
		              <div>
		              	<TextArea rows={4} defaultValue="继续努力"></TextArea>
		              </div>
		            </TabPane>
		        </Tabs>

  			</div>
  		</div>
  	)
  }
}

TaskModal.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  taskModel: state.taskModel,
});
export default connect(mapStateToProps)(TaskModal);


