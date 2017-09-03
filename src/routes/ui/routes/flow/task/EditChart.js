import React from 'react';
import { Select,Input,Button,Icon,Form } from 'vdap-ui';
import moment from 'moment';
import {notification} from 'antd';
import ReactEcharts from '../../../components/ReactECharts';
import EchartsPie from '../../../components/ReactECharts/EchartsPie';
import EchartsGauge from '../../../components/ReactECharts/EchartsGauge';
import EchartsColumn from '../../../components/ReactECharts/EchartsColumn';
import EchartsBar from '../../../components/ReactECharts/EchartsBar';
import EchartsLine from '../../../components/ReactECharts/EchartsLine';
import EchartsBar4 from '../../../components/ReactECharts/EchartsBar4';
import EchartsBar7 from '../../../components/ReactECharts/EchartsBar7';
import EchartsColumnLine from '../../../components/ReactECharts/EchartsColumnLine';
import EchartsFunnel from '../../../components/ReactECharts/EchartsFunnel';
import EchartsScatter from '../../../components/ReactECharts/EchartsScatter';
import { connect } from 'react-redux';
import {} from './models/taskModel';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

class EditChart extends React.Component{
	state={
		echartDemo:<EchartsPie />,
	}
    showSaveConfirm = () =>{

    }

    xround = (x, num) => {
	    return Math.round(x * Math.pow(10, num)) / Math.pow(10, num) ;
	}

    chartTypeChange = (value) => {
	  console.log(`selected ${value}`);
	  if(value=='pie'){
	  	this.setState({
  			echartDemo:<EchartsPie />,
  		});
	  }else if(value=='gauge'){
	  	this.setState({
  			echartDemo:<EchartsGauge />,
  		});
	  }else if(value=='column'){
      this.setState({
        echartDemo:<EchartsColumn />,
      });
    } else if(value=='bar'){
      this.setState({
        echartDemo:<EchartsBar />,
      });
    } else if(value=='line'){
      this.setState({
        echartDemo:<EchartsLine />,
      });
    }else if(value=='bar4'){
      this.setState({
        echartDemo:<EchartsBar4 />,
      });
    } else if(value=='bar7'){
      this.setState({
        echartDemo:<EchartsBar7 />,
      });
    } else if(value=='columnLine'){
      this.setState({
        echartDemo:<EchartsColumnLine />,
      });
    } else if(value=='funnel'){
      this.setState({
        echartDemo:<EchartsFunnel />,
      });
    } else if(value=='scatter'){
      this.setState({
        echartDemo:<EchartsScatter />,
      });
    } 
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
      chartName: '',
      chartType: '',
      totalField: '',
      groupField: '', 
    });
  }

  componentDidMount = () =>{
    let expRecord = this.props.expRecord;
    this.props.form.setFieldsValue({
      id:expRecord.id,
      chartName: expRecord.chartName,
      chartType: expRecord.chartType,
      totalField: expRecord.totalField,
      groupField: expRecord.groupField,
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    
     return (
      <div >
      <br/>
      <Form layout="inline">
      <table width="100%" style={{margin:'5px'}}>
	  <tbody>
	  <tr>
	  <td style={{verticalAlign:'top',width:"40%",borderRight:'1px solid #e5e5e5'}}>
        <table>
            <tbody>             
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  图表名称
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>
                <td style={{padding:"5px 5px 5px 5px"}} >
                  <FormItem >
                    {getFieldDecorator(`chartName`, {
                        rules: [
                          { required: true, message: '必填' },
                        ],
                      })(
                      <Input id="chartName" style={{width:"150px",marginLeft:'24px'}} />
                    )}
                  </FormItem>
                </td>                        
              </tr>
              <tr>                       
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  图表类型
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`chartType`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Select id="chartType" style={{width:"150px",marginLeft:'24px'}} onChange={this.chartTypeChange}>
					      <Option value="pie">饼图</Option>
					      <Option value="column">柱状图</Option>
					      <Option value="bar">横向柱状图</Option>
					      <Option value="line">折线图</Option>
					      <Option value="bar4">横向堆积图</Option>
					      <Option value="bar7">瀑布图</Option>
					      <Option value="gauge">油表图</Option>
					      <Option value="columnLine">柱线组合图</Option>
					      <Option value="funnel">漏斗图</Option>
					      <Option value="scatter">散点图</Option>
					    </Select>                     
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  合计字段
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>                       
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`totalField`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Select id="totalField" style={{width:"150px",marginLeft:'24px'}}>
					      <Option value="报销金额">报销金额</Option>
					      <Option value="票面金额">票面金额</Option>
					    </Select>                         
                      )}
                  </FormItem>
                  
                </td>
              </tr>
              <tr>
                <td style={{width:"100px",padding:"5px 5px 5px 5px"}}>
                  分组字段
                </td> 
                <td style={{width:"10px",padding:"5px 5px 5px 5px"}}>
                  :
                </td>                       
                <td style={{padding:"5px 5px 5px 5px"}}>
                  <FormItem >
                      {getFieldDecorator(`groupField`, {
                          rules: [
                            { required: true, message: '必填' },
                          ],
                        })(
                        <Select id="groupField" style={{width:"150px",marginLeft:'24px'}}>
					      <Option value="部门">部门</Option>
					      <Option value="逾期">逾期</Option>
					      <Option value="任务">任务</Option>
					      <Option value="业务">业务</Option>
					      <Option value="优先级">优先级</Option>
					      <Option value="提交人">提交人</Option> 
					    </Select>                       
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
                        <Input type="hidden" style={{width:"150px",marginLeft:'24px'}} />
                      )}
                  </FormItem>
                </td>                        
              </tr>
            </tbody>
         </table>
        </td>
	    <td style={{width:"60%"}}>
            <div style={{verticalAlign:'top',height:"400px",marginLeft:'5px',overflow: 'auto'}}>
            	<font style={{color:"blue"}}>统计图demo预览</font>
				<br/><br/>
				<div>
	                {this.state.echartDemo}
	            </div>
            </div>
	    </td>
	    </tr>
	    </tbody>
	    </table>       
       </Form>
      </div>
    )
  }
}

EditChart.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  taskModel: state.taskModel,
});
export default connect(mapStateToProps)(Form.create()(EditChart));