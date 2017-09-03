import React from 'react';
import {Table, Input, Button, Icon, Select, Modal, Popconfirm,AutoComplete} from 'vdap-ui';
import EditableCell from '../../../components/editableCell/EditableCell';
import AddTaskView from './AddTaskView';
import {connect} from 'react-redux';
import { fetchtaskData} from './models/taskModel';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const ButtonGroup = Button.Group;

class TaskChart extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '列表视图',
      dataIndex: 'name',
      width: '75%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
    }];
    this.state = {
    	selectedRowKeys: [],  // Check here to configure the default column
    	addVisible: false,
	    data: [{
	        id: '0',
	        name: {
	          editable: false,
	          value: '本周新待办',
	        }
	    }],
    };
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
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

  handleChange(key, index, value) {
  	console.log(value);
  	//后台处理编辑保存
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});   
  }

  componentDidMount() {
    // const {dispatch} = this.props;   
    // dispatch(fetchChartData());
  }
  
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
	    <div style={{margin:'10px'}}>
		    <div style={{margin:'10px',textAlign: 'right'}}>
	            <ButtonGroup>
	              <Button onClick={this.showAddModal}><Icon type="plus" />新建</Button>
	              <Button onClick={this.showDeleteConfirm}><Icon type="minus" />删除</Button>
	            </ButtonGroup>  
	        </div>
			<Table bordered rowKey={record => record.id} rowSelection={rowSelection}
			    pagination={{pageSize: 13}} dataSource={dataSource} columns={columns} />

			<Modal
	          title="新建列表视图"	          
	          visible={this.state.addVisible}
	          closable
	          onCancel={this.hideAddModal}
	          footer={null}
	        >
	          <AddTaskView />
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