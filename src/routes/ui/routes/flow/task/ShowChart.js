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

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

class ShowChart extends React.Component{
	state={
		echartDemo:<EchartsPie />,
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

  componentDidMount() {
    this.chartTypeChange(this.props.expRecord.chartType);
  }

  render(){
    
    let expRecord = this.props.expRecord;
     return (
      <div >
      <br/>
      
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
                  {expRecord.chartName}
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
                  {expRecord.chartType}
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
                  {expRecord.totalField}
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
                  {expRecord.groupField}                
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
      </div>
    )
  }
}

export default ShowChart;