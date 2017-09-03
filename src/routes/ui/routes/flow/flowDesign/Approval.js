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

const autoPeople=["1张三1","2张三2","3张三3","a张三a","b张三b"];
const autoDepartment=["1部门1","部门2","部门3","部门a","部门b"];
const autoRole=["1角色1","角色2","角色3","角色a","角色b"];
const autoPost=["1岗位1","岗位2","岗位3","岗位a","岗位b"];
const options = [
  { label: '发起人，通常也是制单人或提交人', value: 'creator' },
  { label: '前一环节审批人的部门负责人，比如部门经理', value: 'uniter' },
  { label: '前一环节审批人的上级部门负责人', value: 'parentUniter' },
];

class Approval extends React.Component{
	state={
		checked:true,
	}

	onBusiness = (value) => {
	    console.log(value);	    
	}

	handleAjax = (e,fieldsValue) => {
	    // console.log("****************");
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

  clearVal = ()=>{
    this.props.form.setFieldsValue({
      people:"",
      role: "",    
      department: "",
      post: "",
      flow: [], 
      business:[],
    });
    this.setState({ checked:false });
  }

  componentDidMount = () =>{
    this.props.form.setFieldsValue({
      people:"2张三2",
      role: "角色2",    
      department: "部门a",
      post: "岗位2",
      flow: ["creator"], 
      business:["coporateExpense"],
    });
  }

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div>
      	<Form layout="inline">
			<table width="100%" style={{border:0,margin:'5px 5px 5px 5px'}}>
		    <tbody>             
		      <tr>
		        <td style={{width:"200px",padding:"5px 5px 5px 5px"}}>
		          选人
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 5px",width:'30%'}} >
		          <FormItem >
		            {getFieldDecorator(`people`, {
		                rules: [
		                  { required: true, message: '必填' },
		                ],
		              })(
		              	<AutoComplete dataSource={autoPeople} id="people" style={{ width:320 }}
		                    onSelect={this.onSelectComplete}
		                    onSearch={this.handleSearchComplete}
		                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
		                    placeholder="下拉选人，或者输入名称快速匹配" 
		                >
		                    <Input suffix={<Icon type="search" />} />
		                </AutoComplete>		              
		            )}
		          </FormItem>
		        </td>

		        <td style={{width:"250px",padding:"5px 5px 5px 5px"}}>
		          选角色
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 5px",width:'30%'}} >
		          <FormItem >
		            {getFieldDecorator(`role`, {
		                rules: [
		                  { required: true, message: '必填' },
		                ],
		              })(
		              	<AutoComplete dataSource={autoRole} id="role" style={{ width:320 }}
		                    onSelect={this.onSelectComplete}
		                    onSearch={this.handleSearchComplete}
		                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
		                    placeholder="下拉选择角色或分组，或者输入名称快速匹配" 
		                >
		                    <Input suffix={<Icon type="search" />} />
		                </AutoComplete>		              
		            )}
		          </FormItem>
		        </td>                        
		      </tr>
		      <tr>                       
		        <td style={{padding:"5px 5px 5px 5px"}}>
		          选部门
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>
		        <td style={{padding:"5px 5px 5px 5px"}}>
		          <FormItem >
		              {getFieldDecorator(`department`, {
		                  rules: [
		                    { required: true, message: '必填' },
		                  ],
		                })(
		                <AutoComplete dataSource={autoDepartment} id="department" style={{ width:320 }}
		                    onSelect={this.onSelectComplete}
		                    onSearch={this.handleSearchComplete}
		                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
		                    placeholder="下拉选择部门，或者输入名称快速匹配" 
		                >
		                    <Input suffix={<Icon type="search" />} />
		                </AutoComplete>	                      
		              )}
		          </FormItem>
		        </td>

		        <td style={{padding:"5px 5px 5px 5px"}}>
		          选岗位
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 5px"}}>
		          <FormItem >
		              {getFieldDecorator(`post`, {
		                  rules: [
		                    { required: true, message: '必填' },
		                  ],
		                })(
		                <AutoComplete dataSource={autoPost} id="post" style={{ width:320 }}
		                    onSelect={this.onSelectComplete}
		                    onSearch={this.handleSearchComplete}
		                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
		                    placeholder="下拉选择部门，或者输入名称快速匹配" 
		                >
		                    <Input suffix={<Icon type="search" />} />
		                </AutoComplete>	 
		              )}
		          </FormItem>		          
		        </td>
		      </tr>
		      
		      <tr>
		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          从前面的流程环节中选择
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 5px"}}>
		        	<div style={{width:320,border:'1px solid #ccc'}}>
			        <FormItem >
			              {getFieldDecorator(`flow`, {
			                  rules: [
			                    { required: true, message: '必填' },
			                  ],
			                })(
			                <CheckboxGroup id="flow" options={options} onChange={this.onCheckGroup} />
			              )}
			        </FormItem>
		         	</div>
		        </td>

		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          从关联的表单或业务数据中选择
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          :
		        </td>                       
		        <td style={{padding:"5px 5px 5px 5px",verticalAlign:"top"}}>
		          <FormItem >
		              {getFieldDecorator(`business`, {
		                  rules: [
		                    { required: true, message: '必填' },
		                  ],
		                })(
		                <TreeSelect
					        showSearch
					         id="business"
					        style={{ width: 320 }}				        
					        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
					        placeholder=""
					        allowClear
					        multiple
					        treeDefaultExpandAll
					        onChange={this.onBusiness}
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
		              )}
		          </FormItem>
		        </td>
		      </tr>
		      <tr>
		        <td style={{padding:"5px 5px 5px 5px"}}>
		          高级选项
		        </td> 
		        <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
		          :
		        </td>                       
		        <td colSpan="4" style={{padding:"5px 5px 5px 5px"}}>
		        <div style={{width:320,border:'1px solid #ccc'}}>
		          <FormItem >
		              {getFieldDecorator(`setSame`, {
		                  rules: [
		                   
		                  ],
		                })(
		                <Checkbox onChange={this.onCheck} id="setSame" checked={this.state.checked}  >
		                以上选择的审批人必须和制单人(提交人)在同一部门
		                </Checkbox>
		              )}
		          </FormItem>
		        </div>
		        </td>
		       </tr>
		      <tr>
		        <td colSpan="6">
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

Approval.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(Approval));	
	