import React from 'react';
import { Input,Button,Icon,Form,DatePicker } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {} from './models/taskModel';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

class EditModal extends React.Component{

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
      expands: '',
      updated: null,
      tasks: '',
      business: '',
      priority: '',
      expandTime: null,
      department: '',
      numbers: '',
      submitTime:null,
      submitter: '',    
      createTime:null, 
    });
  }

  componentDidMount = () =>{
    let expRecord = this.props.expRecord;
    this.props.form.setFieldsValue({
      id:expRecord.id,
      expands: expRecord.expands,
      updated: expRecord.updated==''?null:moment(expRecord.updated, dateFormat),
      tasks: expRecord.tasks,
      business: expRecord.business,
      priority: expRecord.priority,
      expandTime: expRecord.expandTime==''?null:moment(expRecord.expandTime, dateFormat),
      department: expRecord.department,
      numbers: expRecord.numbers,      
      submitTime: expRecord.submitTime==''?null:moment(expRecord.submitTime, dateFormat),
      submitter:expRecord.submitter,
      createTime: expRecord.createTime==''?null:moment(expRecord.createTime, dateFormat),
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
     return (
      <div style={{height:'90vh',overflow: 'auto',backgroundColor:'white'}}>
      <Form layout="inline">
        <table width="70%" style={{border:0,margin:'5px 5px 5px 100px'}}>
            <tbody>             
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  逾期
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>
                <td style={{padding:"5px 5px 5px 5px"}} >
                  <FormItem >
                    {getFieldDecorator(`expands`, {
                        rules: [
                          { required: true, message: '必填' },
                        ],
                      })(
                      <Input id="expands" style={{width:"300px",marginLeft:'24px'}} />
                    )}
                  </FormItem>
                </td>                        
              </tr>
              <tr>                       
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  最近更新
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`updated`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="" 
                          id="updated" style={{width:"300px",marginLeft:'24px'}}
                        />                        
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  任务
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>                       
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`tasks`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Input id="tasks" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem>
                  
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  业务
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>                       
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`business`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Input id="business" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem>
                  
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  优先级
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>                       
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`priority`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Input id="priority" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem>                  
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  到期时间
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td> 
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`expandTime`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="" 
                          id="expandTime" style={{width:"300px",marginLeft:'24px'}}
                        />                        
                      )}
                  </FormItem> 
                </td>                        
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  部门
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
                        <Input id="department" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem> 
                </td>                        
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  单号
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td> 
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`numbers`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Input id="numbers" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem> 
                </td>                        
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  提交时间
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td> 
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`submitTime`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder=""
                          id="submitTime" style={{width:"300px",marginLeft:'24px'}}
                        />                        
                      )}
                  </FormItem> 
                </td>                        
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  提交人
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td> 
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`submitter`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Input id="submitter" style={{width:"300px",marginLeft:'24px'}} />
                      )}
                  </FormItem> 
                </td>                        
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  创建时间
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td> 
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`createTime`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder=""
                          id="createTime" style={{width:"300px",marginLeft:'24px'}}
                        />                        
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

EditModal.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  taskModel: state.taskModel,
});
export default connect(mapStateToProps)(Form.create()(EditModal));