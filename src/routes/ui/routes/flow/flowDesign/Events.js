import React from 'react';
import {Button,Input,Icon,Select,Checkbox,Form,AutoComplete } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import { connect } from 'react-redux';
import {} from './models/designModel';

const FormItem = Form.Item;
const autoPost=["1服务1","服务2","服务3","服务a","服务b"];

class Events extends React.Component{
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
      passed:'',
      rejected:'',  
    });
  }

  componentDidMount = () =>{
    this.props.form.setFieldsValue({
      passed:"服务2",
      rejected:"服务a",  
    });
  }

  	onChange = (value)=> {
	  console.log('changed', value);
	}

  render(){
  	const { getFieldDecorator } = this.props.form;
  	 return (
      <div style={{margin: '5px'}}>
        设置审批事件的响应或处理
        <hr style={{margin:'5px 0 5px 0'}} />
        
        <Form layout="inline">
          <table width="100%" style={{border:0,margin:'5px 5px 5px 5px'}}>
          <tbody>             
          <tr>
            <td style={{padding:"5px 5px 5px 5px"}}>审批通过时</td>
            <td style={{padding:"5px 5px 5px 5px"}}>
              <FormItem >
                {getFieldDecorator(`passed`, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                  <AutoComplete dataSource={autoPost} id="passed" style={{ width:320 }}
                      onSelect={this.onSelectComplete}
                      onSearch={this.handleSearchComplete}
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                      placeholder="下拉选择事件发生时，要执行的服务或应用程序" 
                  >
                      <Input suffix={<Icon type="search" />} />
                  </AutoComplete>  
                )}
              </FormItem> 
            </td>
        </tr>
        <tr>
          <td style={{padding:"5px 5px 5px 5px"}}>驳回时</td>
          <td style={{padding:"5px 5px 5px 5px"}}>
            <FormItem >
                {getFieldDecorator(`rejected`, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                  <AutoComplete dataSource={autoPost} id="rejected" style={{ width:320 }}
                      onSelect={this.onSelectComplete}
                      onSearch={this.handleSearchComplete}
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                      placeholder="下拉选择事件发生时，要执行的服务或应用程序" 
                  >
                      <Input suffix={<Icon type="search" />} />
                  </AutoComplete>  
                )}
            </FormItem> 
          </td>
        </tr>
			  <tr>
          <td colSpan="2" style={{paddingLeft:'100px'}}>
				    <FormItem>                      
                <Button type="primary" icon="rollback" style={{margin:"10px"}} onClick={this.clearVal}>清空值</Button>   
                <Button type="primary" icon="save" style={{margin:"10px"}} onClick={this.handleAjax} htmlType="submit">保存</Button>                      
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

Events.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(Form.create()(Events));