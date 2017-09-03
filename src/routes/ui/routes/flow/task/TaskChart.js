import React from 'react';
import {Table, Input, Button, Icon, Select, Modal, Popconfirm,AutoComplete} from 'vdap-ui';
import {connect} from 'react-redux';
import { fetchChartData} from './models/taskModel';
import AddChart from './AddChart';
import EditChart from './EditChart';
import ShowChart from './ShowChart';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class TaskChart extends React.Component{
	constructor(props) {
    super(props);

    this.columns = [{
      title: '图表名称',
      dataIndex: 'chartName',
      width: '20%',
    }, {
      title: '图表类型',
      dataIndex: 'chartType',
      width: '20%',
    }, {
      title: '合计字段',
      dataIndex: 'totalField',
      width: '20%',
    }, {
      title: '分组字段',
      dataIndex: 'groupField',
      width: '20%',
    }, {
      title: '操作',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div>           
            <span style={{padding:'6px 10px'}} onClick={()=>this.showEditModal(index,record)} >
                <Icon type="edit"  />
            </span>
            <span style={{padding:'6px 10px'}} onClick={()=>this.showModal(index,record)} >
                <Icon type="pie-chart"  />
            </span>
          </div>)
      }
    }]
  };

  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    addVisible: false,
    editVisible: false,
    showVisible: false,
    expRecord:{},
  };

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

  showModal = (index,record) => {
      this.setState({
        showVisible: true,
        expRecord:record,
      });
  }

  hideModal = () => {
    this.setState({
      showVisible: false,
      expRecord:{},
    });
  }


  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});   
  }

  componentDidMount() {
    const {dispatch} = this.props;   
    dispatch(fetchChartData());
  }
  render(){
  	let chartData = [];
    let count = 0;
    if (this.props.taskModel != undefined) {
      chartData = this.props.taskModel.chartData;
      count = chartData.length;
    }

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
  	 return (
      <div style={{height:'90vh',overflow: 'auto',backgroundColor:'white'}}>
        <div style={{margin:'5px'}}>
          <div style={{textAlign: 'right'}}>
            <ButtonGroup>
              <Button onClick={this.showAddModal}><Icon type="plus" />新建</Button>
              <Button onClick={this.showDeleteConfirm}><Icon type="minus" />删除</Button>
            </ButtonGroup>  
          </div>
        	<Table style={{margin: '5px 0'}} rowSelection={rowSelection} columns={this.columns} dataSource={chartData} scroll={{ y:document.body.clientHeight -427}}
           rowKey={record => record.id} size='middle' pagination={{
           pageSize: 13,
           showTotal: function () {  //设置显示一共几条数据
            return '共'+count +'  条数据';
          }}}/>
        </div>

        <Modal
          title="新建统计图"
          width='1000px'
          visible={this.state.addVisible}
          closable
          onCancel={this.hideAddModal}
          footer={null}
        >
          <AddChart />
        </Modal>

        <Modal className="siderModal"
          title="编辑统计图"
          width='1000px'       
          visible={this.state.editVisible}
          closable
          onCancel={this.hideEditModal}
          footer={null}
        >
          <EditChart expRecord={this.state.expRecord} />
        </Modal>
        <Modal className="siderModal"
          title="查看统计图"
          width='1000px'       
          visible={this.state.showVisible}
          closable
          onCancel={this.hideModal}
          footer={null}
        >
          <ShowChart expRecord={this.state.expRecord}/>
        </Modal>
  
      </div>
    )
  }
}

TaskChart.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  taskModel: state.taskModel,
});
export default connect(mapStateToProps)(TaskChart);