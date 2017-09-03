import React from 'react';
import {Button,Icon,Form,InputNumber,Checkbox } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {} from './models/designModel';

const FormItem = Form.Item;

class Operate extends React.Component{
  state={
    rchecked:true,
    achecked:true,
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

  clearVal = ()=>{
   this.setState({ rchecked:false,achecked:false });
  }

  onRcheck=(checkedValues)=> {
    console.log('checked = ', checkedValues);
    this.setState({ rchecked:!this.state.rchecked });
  }
  onAcheck=(checkedValues)=> {
    console.log('checked = ', checkedValues);
    this.setState({ achecked:!this.state.achecked });
  }

  componentDidMount = () =>{   
  }

  	onChange = (value)=> {
	  console.log('changed', value);
	}

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div style={{margin: '5px'}}>
        设置审批处理时的方式和控制
        <hr style={{margin:'5px 0 5px 0'}} />
        
        <Form layout="inline">
			  <div style={{width:"100%",border:'1px solid #ccc'}}>
          <div><FormItem >
              {getFieldDecorator(`rollbacks`, {
                  rules: [
                    { required: true, message: '必填' },
                  ],
                })(
                <Checkbox onChange={this.onRcheck} id="rollbacks" checked={this.state.rchecked}>
                可驳回-允许驳回到提交人(制单人)或其他环节
                </Checkbox>
              )}
          </FormItem></div>
          <div><FormItem >
              {getFieldDecorator(`assigns`, {
                  rules: [
                    { required: true, message: '必填' },
                  ],
                })(
                <Checkbox onChange={this.onAcheck} id="assigns" checked={this.state.achecked}>
                可改派-允许把当前环节的审批待办改派给其他人处理
                </Checkbox>
              )}
          </FormItem></div>
        </div>
			  <div style={{marginLeft:'100px'}}>
				    <FormItem>                      
                <Button type="primary" icon="rollback" style={{margin:"10px"}} onClick={this.clearVal}>清空值</Button>   
                <Button type="primary" icon="save" style={{margin:"10px"}} onClick={this.handleAjax} htmlType="submit">保存</Button>                      
            </FormItem>
			  </div>
	        
        </Form>
      </div>
    )
  }
}

Operate.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(Operate));