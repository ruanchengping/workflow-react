import React from 'react';
import {Table, Input, Button, Icon, Select, Modal, Popconfirm,AutoComplete} from 'vdap-ui';

import AddModal from './AddModal';
import EditModal from './EditModal';
import TaskModal from './TaskModal';
import ShowField from './ShowField';
import FilterView from './FilterView';
import TaskChart from './TaskChart';
import TaskView from './TaskView';
import {connect} from 'react-redux';
import reducer from './models/taskModel';
import {injectReducer} from 'reducers';
import { fetchtaskData} from './models/taskModel';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const autoSource=["任务1","任务2","任务3"];
class TaskManagement extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '逾期',
      dataIndex: 'expands',
      width: '5%',
      render: (text, record, index) => {
        return (<font style={{color:"blue"}}>{text}</font>)
      }
    }, {
      title: '最近更新',
      dataIndex: 'updated',
      width: '10%',
    }, {
      title: '任务',
      dataIndex: 'tasks',
      width: '10%',
    }, {
      title: '业务',
      dataIndex: 'business',
      width: '10%',
    }, {
      title: '优先级',
      dataIndex: 'priority',
      width: '5%',
    }, {
      title: '到期时间',
      dataIndex: 'expandTime',
      width: '10%',
      render: (text, record, index) => {
        return (<font style={{color:"blue"}}>{text}</font>)
      }
    }, {
      title: '部门',
      dataIndex: 'department',
      width: '10%',
    }, {
      title: '单号',
      dataIndex: 'numbers',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div>           
            <span style={{padding:'6px 10px'}} onClick={()=>this.showTaskModal(index,record)} >
                <font style={{color:"blue",textDecoration:"underline"}}>{text}</font>
            </span>
          </div>)
      }
    }, {
      title: '提交时间',
      dataIndex: 'submitTime',
      width: '10%',
    }, {
      title: '提交人',
      dataIndex: 'submitter',
      width: '5%',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '10%',
    }, {
      title: '编辑',
      width: '5%',
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
    filterVisible: false,
    fieldVisible: false,
    viewVisible: false,
    chartVisible: false,
    taskName: '',
    columns: [],
    taskData: [],
    taskVisible: false,
    taskId: "",
    taskRecord:{},
    expRecord:{},
  };

  showTaskModal = (index,record) => {
      console.log(index);
      this.setState({
        taskVisible: true,
        taskId: index,
        taskRecord:record,
      });
  }

  hideTaskModal = () => {
    this.setState({
      taskVisible: false,
      taskId: "",
      taskRecord:{},
    });
  }

  onDelete = (index) => {
    let taskData = this.props.taskModel.taskDataBack;
    taskData.splice(index, 1);
    this.setState({ taskData });
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

  info = () => {
    Modal.info({
      title: '请至少选择一行数据',
      onOk() {
      },
    });
  }

  showFilterModal = () => {
    this.setState({
      filterVisible: true,
    });
  }
  hideFilterModal = () => {
    this.setState({
      filterVisible: false,
    });
  }

  showFieldModal = () => {
    this.setState({
      fieldVisible: true,
    });
  }
  hideFieldModal = () => {
    this.setState({
      fieldVisible: false,
    });
  }

  showTaskview = () => {
    this.setState({
      viewVisible: true,
    });
  }
  hideTaskview = () => {
    this.setState({
      viewVisible: false,
    });
  }
  showChart = () => {
    this.setState({
      chartVisible: true,
    });
  }
  hideChart = () => {
    this.setState({
      chartVisible: false,
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

  componentWillMount() {
    const {store} = this.context;
    injectReducer(store, {key: 'taskModel', reducer});
  }

  componentDidMount() {
    const {dispatch} = this.props;
    
    dispatch(fetchtaskData("waites"));
  }

  getTable = (value) => {
    console.log(value);
    const {dispatch} = this.props;
    dispatch(fetchtaskData(value));
  }

  render() {   
    let taskData = [];
    let count = 0;
    if (this.props.taskModel != undefined) {
      taskData = this.props.taskModel.taskDataBack;
      console.log(taskData);
      count = taskData.length;
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
      <div>
        <div style={{padding: '5px'}}>
          <table width="100%" style={{border: 0, margin: '5px'}}>
            <tbody>
            <tr>
              <td width="20px" rowSpan="2">
                <Icon type='credit-card' style={{
                  fontSize: 30,
                  color: '#FFF',
                  background: '#a1c2f9',
                  padding: '10px',
                  borderRadius: '50%',
                  margin: '15px'
                }}/>
              </td>
              <td style={{padding: '5px'}}>
                <p style={{marginTop: '10px'}}>任务的创建、维护、查询，审批或处理的事项</p>
              </td>
            </tr>
            <tr>
              <td style={{padding: '5px'}}>
                
                <AutoComplete dataSource={autoSource} style={{ width:300 }}
                    onSelect={this.onSelectComplete}
                    onSearch={this.handleSearchComplete}
                    placeholder="输入任务名称、编码关键字快速查询" 
                >
                    <Input suffix={<Icon type="search" />} />
                </AutoComplete>
              </td>
              <td style={{textAlign: 'right'}}>

                <Select defaultValue="waites" style={{width: 120, margin: '5px'}} onChange={this.getTable}>
                  <Option value="waites">我的待办</Option>
                  <Option value="todays">今天</Option>
                  <Option value="expands">所有逾期</Option>
                  <Option value="copies">抄送我的</Option>
                  <Option value="delegates">我代理的</Option>
                  <Option value="did">我的已办</Option>
                </Select>

                <Button style={{margin: '0 5px'}} onClick={this.showAddModal}><Icon type="plus" />新建</Button>
                <Button style={{margin: '0 5px'}} onClick={this.showDeleteConfirm}><Icon type="minus" />删除</Button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div style={{borderRadius: '5px'}}>
          <table width="100%" style={{border: 0, margin: '5px'}}>
            <tbody>
            <tr>
              <td width="50%">
                &nbsp;
              </td>

              <td style={{textAlign: 'right'}}>
                <Button style={{margin: '0 5px '}} onClick={this.showTaskview}>
                  <Icon type="desktop" />任务视图
                </Button>
                <Button style={{margin: '0 5px '}} onClick={this.showChart}>
                  <Icon type="line-chart" />统计图
                </Button>
                <Button style={{margin: '0 5px '}} onClick={this.showFieldModal}>
                  <Icon type="bars" />显示字段
                </Button>
                <Button style={{margin: '0 5px'}} onClick={this.showFilterModal}>
                  <Icon type="filter" />过滤
                </Button>
                <Button style={{margin: '0 13px 0 5px'}}>
                  <Icon type="retweet" />刷新
                </Button>
              </td>
            </tr>
            </tbody>
          </table>

          <Table style={{margin: '5px 0'}} rowSelection={rowSelection} columns={this.columns} dataSource={taskData} scroll={{ y:document.body.clientHeight -427}}
                 rowKey={record => record.id} size='middle' pagination={{
                 pageSize: 13,
                 showTotal: function () {  //设置显示一共几条数据
                  return '共'+count +'  条数据';
                }}}/>
        </div>


        <Modal
          title="新建任务"
          width='840px'
          style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
          visible={this.state.addVisible}
          closable
          onCancel={this.hideAddModal}
          footer={null}
        >
          <AddModal />
        </Modal>

        <Modal className="siderModal"
          title="任务编辑"
          width='840px'
          style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
          visible={this.state.editVisible}
          closable
          onCancel={this.hideEditModal}
          footer={null}
        >
          <EditModal expRecord={this.state.expRecord}/>
        </Modal>

        <Modal
          title="选择要显示的字段"
          width='840px'
          visible={this.state.fieldVisible}
          closable
          onCancel={this.hideFieldModal}
          okText="保存"
          cancelText="取消"
        >
          <ShowField />
        </Modal>

        <Modal
          title="过滤当前的视图"
          width='580px'
          visible={this.state.filterVisible}
          closable
          onCancel={this.hideFilterModal}
          okText="保存"
          cancelText="取消"
        >
          <FilterView />
        </Modal>

        <Modal className="siderModal"
          title={"任务处理"+this.state.taskId}
          width='840px'
          style={{background: '#fff',  top: 0, right: 0, position: 'absolute'}}
          visible={this.state.taskVisible}
          closable
          onCancel={this.hideTaskModal}
          footer={null}
        >
          <TaskModal taskId={this.state.taskId} taskRecord={this.state.taskRecord} />
        </Modal>

        <Modal className="siderModal"
          title="统计图"
          width='840px'
          style={{background: '#fff',  top: 0, right: 0, position: 'absolute'}}
          visible={this.state.chartVisible}
          closable
          onCancel={this.hideChart}
          footer={null}
        >
          <TaskChart />
        </Modal>
        <Modal className="siderModal"
          title={"任务视图"}
          // width='840px'
          // style={{background: '#fff',  top: 0, right: 0, position: 'absolute'}}
          visible={this.state.viewVisible}
          closable
          onCancel={this.hideTaskview}
          footer={null}
        >
          <TaskView />
        </Modal>
      </div>
    );
  }
}
TaskManagement.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  taskModel: state.taskModel,
});
export default connect(mapStateToProps)(TaskManagement);


