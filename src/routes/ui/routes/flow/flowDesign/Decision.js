import React from 'react';
import {Button,Input,Icon,Select,Checkbox,Form,AutoComplete } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {} from './models/designModel';

const FormItem = Form.Item;
const Option = Select.Option;

class Decision extends React.Component{
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

  clearVal = ()=>{
    this.props.form.setFieldsValue({
      department: "", val01: "", val02: "", val03: "", val04: "",
      finance: "", val11: "", val12: "", val03: "", val14: "",finish:"",
    });
  }

  componentDidMount = () =>{
    this.props.form.setFieldsValue({
       department: "all", val01: "expense", val02: "emoney", val03: ">=", val04: "5000",
       finance: "any", val11: "expense", val12: "emoney", val03: "<=", val14: "400",
       finish:"non",
    });
  }

  onSelect = (value) => {
      console.log(value);
  }

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div style={{margin: '5px'}}>
        
        <Form layout="inline">
          <div>
            <FormItem >
                {getFieldDecorator(`department`, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                  <Select  style={{ width: 420}} onChange={this.onSelect}>
                    <Option value="all">当满足下列所有条件时</Option>
                    <Option value="any">当满足下列任一条件时</Option>
                    <Option value="non">当没有找到符合的条件时</Option>
                </Select>
                )}
                <span style={{marginLeft:'50px'}}>流转到：</span>
                <span style={{marginLeft:'50px'}}><font style={{color:"blue"}}>环节：部门总经理审批</font></span>
                <span style={{marginLeft:'50px'}}>
                  <Button> <Icon type="plus" />增加新的条件</Button>
                </span>
            </FormItem>
          </div>
          <hr style={{margin:'5px 0 5px 0'}} /> 
          <div>
            <FormItem >
              {getFieldDecorator(`val01`, {
                  rules: [
                  ],
                })(
                <Select  style={{ width: 300}} onChange={this.onSelect}>
                  <Option value="expense">交通费报销单</Option>
                  <Option value="procedure">流程</Option>
              </Select>
              )}
            </FormItem>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val02`, {
                    rules: [
                    ],
                  })(
                  <Select  style={{ width: 300}} onChange={this.onSelect}>
                    <Option value="emoney">报销金额</Option>
                    <Option value="sdepartment">提交人所在部门</Option>
                </Select>
                )}
              </FormItem>
            </span>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val03`, {
                    rules: [
                    ],
                  })(
                  <Select style={{ width: 320}} onChange={this.onSelect}>
                    <Option value=""></Option>
                    <Option value="="> 等于 </Option>
                    <Option value=">"> 大于 </Option>
                    <Option value=">="> 大于等于 </Option>
                    <Option value="<"> 小于 </Option>
                    <Option value="<="> 小于等于 </Option>
                    <Option value="<>"> 不等于 </Option>
                    <Option value="like"> like </Option>
                    <Option value="in"> 包含于 </Option>
                  </Select>
                )}
              </FormItem>
            </span>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val04`, {
                    rules: [
                    ],
                  })(
                  <Input id="val04" style={{width:"300px"}} />
                )}
              </FormItem>
            </span>             
          </div>

          <div style={{marginTop:"100px"}}>
            <FormItem >
                {getFieldDecorator(`finance`, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                  <Select  style={{ width: 420}} onChange={this.onSelect}>
                    <Option value="all">当满足下列所有条件时</Option>
                    <Option value="any">当满足下列任一条件时</Option>
                    <Option value="non">当没有找到符合的条件时</Option>
                </Select>
                )}
                <span style={{marginLeft:'50px'}}>流转到：</span>
                <span style={{marginLeft:'50px'}}><font style={{color:"blue"}}>环节：部门总经理审批</font></span>
                <span style={{marginLeft:'50px'}}>
                  <Button> <Icon type="plus" />增加新的条件</Button>
                </span>
            </FormItem>
          </div>
          <hr style={{margin:'5px 0 5px 0'}} /> 
          <div>
            <FormItem >
              {getFieldDecorator(`val11`, {
                  rules: [
                  ],
                })(
                <Select  style={{ width: 300}} onChange={this.onSelect}>
                  <Option value="expense">交通费报销单</Option>
                  <Option value="procedure">流程</Option>
              </Select>
              )}
            </FormItem>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val12`, {
                    rules: [
                    ],
                  })(
                  <Select  style={{ width: 300}} onChange={this.onSelect}>
                    <Option value="emoney">报销金额</Option>
                    <Option value="sdepartment">提交人所在部门</Option>
                </Select>
                )}
              </FormItem>
            </span>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val13`, {
                    rules: [
                    ],
                  })(
                  <Select style={{ width: 320}} onChange={this.onSelect}>
                    <Option value=""></Option>
                    <Option value="="> 等于 </Option>
                    <Option value=">"> 大于 </Option>
                    <Option value=">="> 大于等于 </Option>
                    <Option value="<"> 小于 </Option>
                    <Option value="<="> 小于等于 </Option>
                    <Option value="<>"> 不等于 </Option>
                    <Option value="like"> like </Option>
                    <Option value="in"> 包含于 </Option>
                  </Select>
                )}
              </FormItem>
            </span>
            <span style={{marginLeft:'5px'}}>
              <FormItem >
                {getFieldDecorator(`val14`, {
                    rules: [
                    ],
                  })(
                  <Input id="val04" style={{width:"300px"}} />
                )}
              </FormItem>
            </span>             
          </div>

          <div style={{marginTop:"100px"}}>
            <FormItem >
                {getFieldDecorator(`finish`, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                  <Select  style={{ width: 420}} onChange={this.onSelect}>
                    <Option value="all">当满足下列所有条件时</Option>
                    <Option value="any">当满足下列任一条件时</Option>
                    <Option value="non">当没有找到符合的条件时</Option>
                </Select>
                )}
                <span style={{marginLeft:'50px'}}>流转到：</span>
                <span style={{marginLeft:'50px'}}><font style={{color:"blue"}}>环节：结束</font></span>
                
            </FormItem>
          </div>

          <center>
            <FormItem>                      
                <Button type="primary" icon="rollback" style={{margin:"10px"}} onClick={this.clearVal}>清空值</Button>
                <Button type="primary" icon="save" style={{margin:"10px"}} onClick={this.handleAjax} htmlType="submit">保存</Button>                      
            </FormItem>
          </center>      
        </Form>
      </div>
    )
  }
}

Decision.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(Decision));