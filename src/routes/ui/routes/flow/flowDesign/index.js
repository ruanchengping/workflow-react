import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Timeline,Tabs,Table,Input,Button,Icon,Select,Modal,Card,Form,DatePicker } from 'vdap-ui';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';
import FlowChartDemo from './FlowChartDemo';
import {connect} from 'react-redux';
import reducer from './models/designModel';
import {injectReducer} from 'reducers';
import Approval from './Approval';
import TimeLimit from './TimeLimit';
import Operate from './Operate';
import Events from './Events';
import Remind from './Remind';
import Decision from './Decision';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const { TextArea } = Input;

class FlowDesign extends React.Component{
  state = {
	selectedRowKeys: [],  // Check here to configure the default column
    addVisible: false,
    editVisible: false,
    activeKey:'approver',    
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});   
  }

  tabClick = (activeKey) => {
  	console.log(activeKey);
    this.setState({ activeKey });
    const {dispatch} = this.props;
    if(activeKey=="approver"){
    	// dispatch(fetchExpenseData());
    }else if(activeKey=="timeLimit"){
    	// dispatch(fetchActivityData());
    }else if(activeKey=="operate"){
    	// dispatch(fetchActivityData());
    }else if(activeKey=="events"){
    	// dispatch(fetchActivityData());
    }else if(activeKey=="remind"){
    	// dispatch(fetchActivityData());
    }else if(activeKey=="decision"){
    	// dispatch(fetchActivityData());
    }
    
    
  };
  componentWillMount() {
    const {store} = this.context;
    injectReducer(store, {key: 'designModel', reducer});
  }

  componentDidMount() {
    // const {dispatch} = this.props;
    // dispatch(fetchExpenseData());
  }

  render(){
  	
  	 return (
  	 	<div>
  	 		<FlowChartDemo />
	      	<div style={{margin:'5px 50px 5px 50px',border:'0px solid #ccc'}}>
	      		
  				<Tabs activeKey={this.state.activeKey} type="card" onChange={this.tabClick}>
		            <TabPane tab="审批人" key="approver" >
		                <div>
					      <Approval />
					        
				        </div>
		            </TabPane>
		            <TabPane tab="时限" key="timeLimit" >
		              <TimeLimit />
		            </TabPane>
		            <TabPane tab="操作" key="operate" >
		              <div>
                    <Operate />		              	
		              </div>
		            </TabPane>
		            <TabPane tab="事件" key="events" >
		              <div>
		              	<Events />
		              </div>
		            </TabPane>
		            <TabPane tab="提醒" key="remind" >
		              <div>
		              	<Remind />
		              </div>
		            </TabPane>
		            <TabPane tab="决策" key="decision" >
		              <div>
		              	<Decision />
		              </div>
		            </TabPane>
		        </Tabs>
	      	</div>
      	</div>
    )
  }

}

FlowDesign.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  designModel: state.designModel,
});
export default connect(mapStateToProps)(FlowDesign);