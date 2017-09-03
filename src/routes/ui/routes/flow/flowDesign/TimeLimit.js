import React from 'react';
import {Button,Icon,Form,InputNumber } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {} from './models/designModel';

const FormItem = Form.Item;

class TimeLimit extends React.Component{
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

  clearVal = ()=>{
    this.props.form.setFieldsValue({
      days:0,
      minutes:0,
      seconds:0, 
    });
  }
  
  componentDidMount = () =>{
    this.props.form.setFieldsValue({
      days:3,
      minutes:0,
      seconds:0,    
    });
  }

  	onChange = (value)=> {
	  console.log('changed', value);
	}

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div style={{margin: '5px'}}>
        设置从任务分配开始，到完成任务的时间限制
        <hr style={{margin:'5px 0 5px 0'}} />
        
        <Form layout="inline">
			<table style={{border:0,margin:'5px 5px 5px 5px'}}>
		     <tbody>             
		      <tr>
		        <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
		          到期时间
		        </td> 
		        
		        <td style={{padding:"5px 5px 5px 5px"}} >
			        <FormItem>	        
			          {getFieldDecorator(`days`, {
			              rules: [
			                { required: true, message: '必填' },
			              ],
			            })(
			            <InputNumber min={0} max={366} onChange={this.onChange} />							    
			          )}天
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator(`minutes`, {
			              rules: [
			                { required: true, message: '必填' },
			              ],
			            })(
			            <InputNumber min={0} max={24} onChange={this.onChange} />
									    
			          )}时
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator(`seconds`, {
			              rules: [
			                { required: true, message: '必填' },
			              ],
			            })(
			            <InputNumber min={0} max={60} onChange={this.onChange} />
									    
			          )}分
			        </FormItem>
			    </td>
			   </tr>
			   <tr><td colSpan='2' style={{textAlign:"center"}}>
				    <FormItem>                      
	                    <Button type="primary" icon="rollback" style={{margin:"10px"}} onClick={this.clearVal}>清空值</Button>   
	                    <Button type="primary" icon="save" style={{margin:"10px"}} onClick={this.handleAjax} htmlType="submit">保存</Button>                      
	                </FormItem>
			   </td></tr>
			  </tbody>
			</table>
	        
        </Form>
      </div>
    )
  }
}

TimeLimit.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(TimeLimit));