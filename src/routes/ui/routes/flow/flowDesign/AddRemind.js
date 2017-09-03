import React from 'react';
import {TreeSelect ,Table,Input,Button,Icon,Select,Modal,Checkbox,Form,DatePicker,AutoComplete } from 'vdap-ui';
import {connect} from 'react-redux';

const TreeNode = TreeSelect.TreeNode;
const Search = Input.Search;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const options = [
  { label: '发起人，通常也是制单人或提交人', value: 'creator' },
  { label: '审批人，本环节的所有审批的人员', value: 'auditor' },
  { label: '抄送人，本环节关注或监管人员', value: 'copier' },
  { label: '流程监管员', value: 'supervisor' },
];
const submits = [
  { label: '邮件', value: 'email' },
  { label: '短消息', value: 'sms' },
  { label: '微信', value: 'wechat' },
  { label: '应用系统内建消息', value: 'message' },
];

class AddRemind extends React.Component{
	state={
		checked:true,
	}

	onBusiness = (value) => {
	    console.log(arguments);	    
	}

	handleAjax = (e,fieldsValue) => {
	    
	    this.props.form.validateFields((err, values) => {
	      console.log(values);
	      if(err==null){
	        // const {dispatch} = this.props;
	        // dispatch(editSave(this.props));
	        // var doaminJson = this.props.unitCatalogModel.domainId;
	        // var flag=0;
	        // if(JSON.stringify(this.props.unitCatalogModel.domainId)==""){
	        //   notification.error({
	        //       message: '修改组织信息 失败！',
	        //     });
	        // }else{
	        //   notification.success({
	        //       message: '修改组织信息 成功！',
	        //     }); 
	        //   flag=1;
	        // }
	        // if(flag==1){
	        //   dispatch(getView('show'));
	        //   dispatch(fetchAreaData(doaminJson.id));
	        // }
	        
      	}
    });
  }

  	onCheckGroup=(checkedValues)=> {
	  console.log('checked = ', checkedValues);	 
	}

	onCheck=(checkedValues)=> {
	  console.log('checked = ', checkedValues);
	  this.setState({ checked:!this.state.checked });
	}

	onChangeM = (value) => {
	    var myFilter = this.state.filter +" "+ value +" ";
	    this.setState({ filter:myFilter});
	}
	onSelect = (value) => {
	    console.log(value);
	}

  clearVal = ()=>{
    this.props.form.setFieldsValue({//需求界面的设计不全，表格和编辑消息界面内容不一致
		remindName:'',
		flowReceiver:[],
		orgReceiver:'',
		remark:'',
		remindEvents:'',
		remindMode:[],
    });
  }

  componentDidMount = () =>{
  	console.log(this.props.expRecord);
  	let expRecord = this.props.expRecord;
    this.props.form.setFieldsValue({//需求界面的设计不全，表格和编辑消息界面内容不一致
		remindName:'',
		flowReceiver:[],
		orgReceiver:'',
		remark:'',
		remindEvents:'',
		remindMode:[],
    });
  }

    constructor(props) {
	    super(props);
	    this.state = {
	      filter: '',
	      textValue: '',
	    };
	}
	  emitEmpty = () => {
	    this.setState({ filter: '' });
	  }

	  onChangeM = (value,title) => {
	  	var myFilter = this.state.filter +" {"+ title +"} ";
	    this.setState({ filter:myFilter});
	  }

	  onChangeText = (e) => {
	  	console.log(e.target.value);
	    this.setState({ textValue: e.target.value});
	  }

	  getTextValue = () => {
	  	var myFilter = this.state.filter +" "+ this.state.textValue +" ";
	    this.setState({ filter:myFilter});
	  }

  render(){
  	const { getFieldDecorator } = this.props.form;
  	const { filter } = this.state;
  	 return (
      <div>
      	<Form layout="inline">
			<table width="100%" style={{border:0,margin:'5px 5px 5px 50px'}}>
		    <tbody>             
		      <tr>
		        <td style={{width:"200px",padding:"5px 5px 5px 5px"}}>
		          提醒名称<font style={{color:"red"}}>*</font>
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 25px"}} >
		          <FormItem >
		            {getFieldDecorator(`remindName`, {
		                rules: [
		                  { required: true, message: '必填' },
		                ],
		              })(
		              	<Input id="remindName" style={{width:"420px"}} />	              
		            )}
		          </FormItem>
		        </td>		                        
		      </tr>
		      <tr>
		        <td style={{width:"200px",padding:"5px 5px 5px 5px"}}>
		          描述
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 25px"}} >
		          <FormItem >
		            {getFieldDecorator(`remark`, {
		                rules: [		                 
		                ],
		              })(
		              	<TextArea rows={4} style={{width:"420px",padding:"5px 5px 5px 5px"}}></TextArea>              
		            )}
		          </FormItem>
		        </td>		                        
		      </tr>
		      <tr>
		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          接收人
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 25px"}}>
		        	从流程中选择
		        	<div style={{width:420,border:'1px solid #ccc'}}>		        	
			        <FormItem >
			              {getFieldDecorator(`flowReceiver`, {
			                  rules: [
			                  ],
			                })(
			                <CheckboxGroup id="flowReceiver" options={options} onChange={this.onCheckGroup} />
			              )}
			        </FormItem>
		         	</div>
		         	从组织中选择		        			        	
			        <div><FormItem >
		              {getFieldDecorator(`orgReceiver`, {
		                  rules: [
		                  ],
		                })(
		                <Select  style={{ width: 420}} onChange={this.onSelect}>
			              <Option value="person1">人员1</Option>
			              <Option value="person2">人员2</Option>
			            </Select>
		              )}
			        </FormItem></div>
		        </td>		        
		      </tr>
		      <tr>                       
		        <td style={{padding:"5px 5px 5px 5px"}}>
		          事件<font style={{color:"red"}}>*</font>
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 25px"}}>
		          <FormItem >
		              {getFieldDecorator(`remindEvents`, {
		                  rules: [
		                    { required: true, message: '必填' },
		                  ],
		                })(
		                  <Select  style={{ width: 420}} onChange={this.onSelect}>
				            <Option value="pass">审批通过</Option>
				            <Option value="reject">驳回</Option>
				          </Select>                   
		              )}
		          </FormItem>
		        </td>		        
		      </tr>
			  <tr>
		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          发送方式<font style={{color:"red"}}>*</font>
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 25px"}}>
		          	        			        	
			        <FormItem >
			              {getFieldDecorator(`remindMode`, {
			                  rules: [
			                  	{ required: true, message: '必填' },
			                  ],
			                })(
			                <CheckboxGroup options={submits} onChange={this.onCheckGroup} />
			              )}
			        </FormItem>	
			      	         	
		        </td>		        
		      </tr>
		      <tr>
		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          消息内容
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 25px"}}>
		          <div style={{width:420,border:'1px solid #ccc',padding:'5px 0 5px 0'}}>	
		        	<label>
			            <span style={{ width: 60,display:'inline-block' }}>数据</span>			            
			            <TreeSelect
					        showSearch
					         id="business"
					        style={{ width: 320 }}				        
					        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
					        placeholder=""
					        allowClear
					        multiple
					        treeDefaultExpandAll
					        onChange={this.onChangeM}
					    >
					        <TreeNode value="coporateExpense" title="公司活动经费报销单" key="0-1">
					          <TreeNode value="researchExpense" title="研发部门活动经费报销单" key="0-1-1">
					            <TreeNode value="leaf1" title="研发部门组织人" key="0-1-1-1" />
					            <TreeNode value="leaf2" title="研发部门费用负责人" key="0-1-2" />
					          </TreeNode>
					          <TreeNode value="executiveExpense" title="行政部门活动经费报销单" key="0-1-2">
					            <TreeNode value="leaf3" title="行政部门组织人" key="0-1-2-1" />
					            <TreeNode value="leaf4" title="行政部门费用负责人" key="0-1-2-2" />
					          </TreeNode>
					        </TreeNode>
					    </TreeSelect>
			        </label>

			        <label>
			            <span style={{ width: 60,display:'inline-block' }}>内容</span>
			            <Input style={{ width: 255 }} onChange={this.onChangeText} />
			            <Button style={{margin:'0 5px 0 5px'}}  onClick={this.getTextValue} >完成</Button>
			        </label>

			        <p style={{padding:'0', width:410,textAlign:'center',fontSize:'16px',color:'#333'}}>生成过滤条件</p>

			        <p style={{padding:'0', width:385 }}>
			            <Button style={{margin:'5px 8px',float:'right',}}  onClick={this.emitEmpty} >全部删除</Button>
			        </p>     	        	
			        
			        <TextArea id="remindContent" rows={4} style={{ width: 320,marginLeft:'60px'}}  value={filter} />	
			           
	         	  </div>	
		        </td>		        
		      </tr>
		      <tr>
		        <td colSpan="3">
		          <center>
		            <FormItem>                      
		                <Button type="primary" icon="rollback" style={{margin:"10px"}} onClick={this.clearVal}>清空值</Button>
		                <Button type="primary" icon="save" style={{margin:"10px"}} onClick={this.handleAjax} htmlType="submit">保存</Button>                      
		            </FormItem>
		            </center>		          
		        </td>                        
		      </tr>
		    </tbody>
		 </table>
		 </Form>
      </div>
    )
  }
}

AddRemind.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(AddRemind));	
	