import React from 'react';
import { Table,Input,Button,Icon,Select,Tree,Tooltip,Popconfirm,Modal,AutoComplete } from 'vdap-ui';
import {connect} from 'react-redux';
import { fetchServiceTree,fetchServiceData} from './models/flowModel';
import AddService from './AddService';
import EditService from './EditService';
import AddServiceTreeModal from './AddServiceTreeModal';
import EditServiceTreeModal from './EditServiceTreeModal';

const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
const data = [];
const autoSource=["采购审批","库存审批","通信报销审批"];

class SetService extends React.Component{
	constructor(props) {
    super(props);
    this.columns =[{
      title: '名称',
      dataIndex: 'serviceName',
      width: '15%',
      render: (text, record, index) => {
        return (<font style={{color:"blue"}}>{text}</font>)
      }
    }, {
      title: '分类',
      dataIndex: 'sorting',
      width: '15%',
      render: (text, record, index) => {
        return (<font style={{color:"blue"}}>{text}</font>)
      }
    }, {
      title: '注册时间',
      dataIndex: 'createTime',
      width: '15%',
    }, {
      title: '注册人',
      dataIndex: 'creator',
      width: '15%',
    }, {
      title: '描述',
      dataIndex: 'description',
      width: '15%',
    }, {
      title: '类型',
      dataIndex: 'serviceType',
      width: '10%',
    }, {
      title: 'URL',
      dataIndex: 'url',
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
      id:"",
      title:"",
      isLeaf:"",
      selectedRowKeys: [],
      count: 0,
      sumcount: 0,
      size:'middle',
      dataSource: data,
      gData: [],
      flowVisible: false,
      flowId: "",
      addVisible: false,
      editVisible: false,
      addTreeVisible: false,
      editTreeVisible: false,
      expRecord:{},
    }

  showAddTreeModal = () => {
    this.setState({
      addTreeVisible: true,
    });
  }
  hideAddTreeModal = () => {
    this.setState({
      addTreeVisible: false,
    });
  }

  showEditTreeModal = () => {
    if(this.state.id==""){
      this.treeInfo();
    }else{
      this.setState({
        editTreeVisible: true,
      });
    }     
  }

  hideEditTreeModal = () => {
    this.setState({
      editTreeVisible: false,
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
        flowId:index,
      });
  }

  hideEditModal = () => {
    this.setState({
      editVisible: false,
      expRecord:{},
    });
  }

  treeInfo =()=> {
    Modal.info({
      title: '请至少选择一个树节点',
      onOk() {},
    });
  }

  deleteTreeClick = ()=>{
    alert(this.state.id);
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

  info =()=> {
    Modal.info({
      title: '请至少选择一行数据',
      onOk() {},
    });
  }

  onSelect = (selectedKeys, info) => {
    if(info.selected){
    	var title = info.selectedNodes[0].props.title;
      this.setState({
      	 id:info.selectedNodes[0].props.id,
	     title: title,
	     isLeaf:info.selectedNodes[0].props.isLeaf 
	 	});
      	const {dispatch} = this.props;
  		dispatch(fetchServiceData(title));
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchServiceTree());
    dispatch(fetchServiceData('库存'));
  }


  render(){
  	let serviceData = [];
  	let count = 0;
    if (this.props.flowModel != undefined) {
      this.state.gData = this.props.flowModel.serviceTree;
      serviceData = this.props.flowModel.serviceData;
      count = serviceData.length;
    }
    console.log(this.state.gData.length);
  	const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.title} isLeaf={item.isLeaf} id={item.id}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} isLeaf={item.isLeaf} id={item.id} />;
    });

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

  	 return (
      <div>

	    <table width="100%" style={{margin:'5px'}}>
	      <tbody>
	        <tr>
	          <td style={{width:"20%",borderRight:'1px solid #e5e5e5'}}>
	            <div>
	              	<ButtonGroup>                     
		              <Button icon="plus" onClick={this.showAddTreeModal} >添加</Button>		              
		              <Button icon="edit" onClick={this.showEditTreeModal} >修改</Button>
		              <Button icon="minus" onClick={this.deleteTreeClick} >删除</Button>
		            </ButtonGroup>
	            </div>
	            <div style={{verticalAlign:'top',height:"80vh",overflow: 'auto'}}>
	            <Tree
	              onSelect={this.onSelect}
	              defaultExpandedKeys={this.state.gData.length>0?['0']:['0','0-0','0-0-0']}
	            >
	              {loop(this.state.gData)}
	            </Tree>
	            </div>
	          </td>
	          <td style={{width:"80%"}}>
	            <div style={{verticalAlign:'top',height:"80vh",marginLeft:'5px',overflow: 'auto'}}>
	              <table style={{width:'100%'}}>
					 <tbody>
					  <tr>
					   <td>
					      	<AutoComplete dataSource={autoSource} style={{ width:300 }}
			                onSelect={this.onSelectComplete}
			                onSearch={this.handleSearchComplete}
			                placeholder="输入名称查询" 
			            	>
			                	<Input suffix={<Icon type="search" />} />
			            	</AutoComplete>
				       </td>
				       <td> 
					       &nbsp;&nbsp;
					       <div style={{float:'right'}}>
						        <ButtonGroup> 
						          <Button onClick={this.showAddModal} > <Icon type="plus" />新建</Button>
				              <Button onClick={this.showDeleteConfirm} > <Icon type="minus" />删除</Button>
						        </ButtonGroup>
						    </div>
				        </td>
				      </tr>
					  <tr>
					  <td colSpan="2">
				        <Table style={{margin: '5px 0'}} columns={this.columns} dataSource={serviceData} scroll={{ y:document.body.clientHeight -427}}
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
	            </div>
	          </td>
	        </tr>
	      </tbody>
	    </table>

      <Modal className="siderModal"
        title={"新建分类"}
        width='640px'
        visible={this.state.addTreeVisible}
        closable
        onCancel={this.hideAddTreeModal}
        footer={null}
      >
        <AddServiceTreeModal />
      </Modal>

      <Modal className="siderModal"
        title={"编辑分类"+this.state.id}
        width='640px'
        visible={this.state.editTreeVisible}
        closable
        onCancel={this.hideEditTreeModal}
        footer={null}
      >
        <EditServiceTreeModal id={this.state.id} title={this.state.title}/>
      </Modal>
      <Modal className="siderModal"
        title={"新建模型"}
        width='840px'
        style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
        visible={this.state.addVisible}
        closable
        onCancel={this.hideAddModal}
        footer={null}
      >
        <AddService />
      </Modal>

      <Modal className="siderModal"
        title={"编辑模型"+this.state.flowId}
        width='840px'
        style={{background: '#fff', height: '100vh', top: 0, right: 0, position: 'absolute'}}
        visible={this.state.editVisible}
        closable
        onCancel={this.hideEditModal}
        footer={null}
      >
        <EditService expRecord={this.state.expRecord} />
      </Modal>


	  </div>
    )
  }
}

SetService.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(SetService);