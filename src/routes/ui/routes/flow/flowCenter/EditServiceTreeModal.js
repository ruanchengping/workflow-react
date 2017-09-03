import React from 'react';
import { Input,Button,Icon,Form,DatePicker } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import reducer from './models/flowModel';
import {injectReducer} from 'reducers';
import {} from './models/flowModel';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

class EditFlowTreeModal extends React.Component{
	showSaveConfirm = () =>{

    }

  handleAjax = (e,fieldsValue) => {
    // console.log("****************");
    this.props.form.validateFields((err, values) => {
      // console.log(values);
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
      title: '',
      parentTitle: '',
    });
  }

  componentDidMount = () =>{
	this.props.form.setFieldsValue({
		id: this.props.id,
      	title: this.props.title,
    });
  }

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div >
      <Form layout="inline" onSubmit={this.handleAjax}>
      	<table width="70%" style={{border:0,margin:'5px 5px 5px 100px'}}>
            <tbody>             
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  分类名称
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>
                <td style={{padding:"5px 5px 5px 5px"}} >
                  <FormItem >
                    {getFieldDecorator(`title`, {
                        rules: [
                          { required: true, message: '必填' },
                        ],
                      })(
                      <Input id="title" style={{width:"300px",marginLeft:'24px'}} />
                    )}
                  </FormItem>
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
	                <FormItem >
	                    {getFieldDecorator(`id`, {})(
	                      <Input type="hidden" style={{width:"300px",marginLeft:'24px'}} />
	                    )}
	                </FormItem>
                </td>                        
              </tr>
            </tbody>
         </table>
         </Form>
      </div>
    )
  }
}

EditFlowTreeModal.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(Form.create()(EditFlowTreeModal));

