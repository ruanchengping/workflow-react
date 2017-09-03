import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Table} from 'vdap-ui';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';
import {connect} from 'react-redux';
import { fetchVariableData,fetchActivityData,fetchTaskData} from './models/flowModel';
import Task from './Task';

const TabPane = Tabs.TabPane;

class FlowChart extends React.Component{
	constructor(props) {
	    super(props);
	    this.columns =[{
	      title: '活动编号',
	      dataIndex: 'actid',
	      width: '50%',
	    }, {
	      title: '活动名称',
	      dataIndex: 'actname',
	      width: '50%',
	    }]

	    this.vcolumns =[{
	      title: '变量名称',
	      dataIndex: 'vName',
	      width: '25%',
	    },{
	      title: '类型',
	      dataIndex: 'vType',
	      width: '25%',
	    },{
	      title: '值',
	      dataIndex: 'vValue',
	      width: '25%',
	    },{
	      title: '更新时间',
	      dataIndex: 'updatetime',
	      width: '25%',
	    }]
	  };

  state = {
    activeKey:'tasks',
    activeTaskKey:'waited',
    selectedRowKeys: [], 
    flowVisible: false,
    flowId: "",
  }

  tabClick = (activeKey) => {
  	console.log(activeKey);
    this.setState({ activeKey });
    const {dispatch} = this.props;
    if(activeKey=="variable"){
    	dispatch(fetchVariableData());
    }else if(activeKey=="activity"){
    	dispatch(fetchActivityData());
    }
    
    
  };

  tabTaskClick = (activeTaskKey) => {
    this.setState({ activeTaskKey });
    const {dispatch} = this.props;
    dispatch(fetchTaskData(activeTaskKey));
  };

   onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  }

  componentDidMount() {
    
  }

  render() {
    let activityData = [],variableData= [];
    let count = 0,vcount = 0;
    if (this.props.flowModel != undefined) {
      activityData = this.props.flowModel.activityData;
      variableData = this.props.flowModel.variableData;
      count = activityData.length;
      vcount = variableData.length;
    }
    const {selectedRowKeys,vselectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const vrowSelection = {
      vselectedRowKeys,
      onChange: this.vonSelectChange,
    }
    console.log(this.state.activeTaskKey);
    return (
    	<div style={{height:'90vh',overflow: 'auto',backgroundColor:'white'}}>
    		<div id={"flowChart"+this.props.flowId} style={{margin:'5px 50px 5px 50px',border:'1px solid #ccc'}}></div>
  			<div style={{margin:'5px 5px 5px 50px',width:'90%',border:'0'}}>
  				
  				<Tabs activeKey={this.state.activeKey} type="card" onChange={this.tabClick}>
		            <TabPane tab="任务" key="tasks" >
		                <div>
					        
				          <Tabs activeKey={this.state.activeTaskKey} type="card" onChange={this.tabTaskClick}>
				            <TabPane tab="待办" key="waited" >
				              <div><Task flag="waited" /></div>
				            </TabPane>
				            <TabPane tab="逾期" key="expandPeriod" >
				              <div><Task flag="expandPeriod" /></div>
				            </TabPane>
				            <TabPane tab="完成" key="finished" >
				              <div><Task flag="finished" /></div>
				            </TabPane>
				            <TabPane tab="全部" key="allData" >
				              <div><Task flag="allData" /></div>
				            </TabPane>
				          </Tabs>
				        </div>
		            </TabPane>
		            <TabPane tab="变量" key="variable" >
		              <div>
		              	<Table style={{margin: '5px 0'}} columns={this.vcolumns} dataSource={variableData} scroll={{ y:document.body.clientHeight -427}}
				            rowKey={record => record.id} rowSelection={vrowSelection}  size='middle' 
				            pagination={{pageSize: 10,
				            	showTotal: function () {  //设置显示一共几条数据
					            	return '共'+vcount +'  条数据';
						        }
							  }}
					    />
		              </div>
		            </TabPane>
		            <TabPane tab="活动" key="activity" >
		              <div>
		              	<Table style={{margin: '5px 0'}} columns={this.columns} dataSource={activityData} scroll={{ y:document.body.clientHeight -427}}
				            rowKey={record => record.id} rowSelection={rowSelection}  size='middle' 
				            pagination={{pageSize: 10,
				            	showTotal: function () {  //设置显示一共几条数据
					            	return '共'+count +'  条数据';
						        }
							  }}
					    />
		              </div>
		            </TabPane>
		        </Tabs>

  			</div>
  		</div>
  	)
  }

  componentDidMount(){
  	
  	var graph = new joint.dia.Graph();

	var paper = new joint.dia.Paper({
	    el: $('#flowChart'+this.props.flowId),
	    width: '80%',
	    height: 200,
	    gridSize: 1,
	    model: graph
	});


	var uml = joint.shapes.uml;


    joint.shapes.devs.MyImageModel = joint.shapes.basic.Rect.extend({

        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><image/><text class="label"/></g>',

        defaults: _.defaultsDeep({

            type: 'devs.MyImageModel',
            size: { width: 80, height: 80 },
            attrs: {
                rect: {
                    stroke: '#d1d1d1',
                    fill: {
                        type: 'linearGradient',
                        stops: [{ offset: '0%', color: 'white' }, { offset: '50%', color: '#d1d1d1' }],
                        attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                    }
                },
                '.label': { text: '审批任务', 'ref-y': -20 },
                image: {
                    'xlink:href': require('assets/images/ui/female.png'),
                    width: 30,
                    height: 30,
                    'ref-x': 0,
                    'ref-y': 0,
                    ref: 'rect',
                    'x-alignment': 'left',
                    'y-alignment': 'top'
                }
            }

        }, joint.shapes.devs.Model.prototype.defaults)
    });

    joint.shapes.devs.MyImageModelView = joint.shapes.devs.ModelView;

	var states = {

	    s0: new uml.StartState({
	        position: { x:20  , y: 60 },
	        size: { width: 30, height: 30 },
	        attrs: {
	            'circle': {
	                fill: '#4b4a67',
	                stroke: 'none',
	            },
	            // text: { text: '开始', 'font-size': 28 }
	            
	        }
	    }),

	    s1: new joint.shapes.devs.MyImageModel({
	        position: { x:100  , y: 60 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务1', 'ref-y': -20 },
            },
	    }),

	    s2: new joint.shapes.basic.Rhombus({
		    position: { x: 250, y: 60 },
		    size: { width: 30, height: 30 },
		    attrs: { text: { text: '×', 'font-size': 28 } }
		}),

		s3: new joint.shapes.devs.MyImageModel({
	        position: { x:320  , y: 40 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务2', 'ref-y': -20 },
            },
	    }),

	    s4: new joint.shapes.devs.MyImageModel({
	        position: { x:320  , y: 130 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务3', 'ref-y': -20 },
            },
	    }),

	    se: new uml.EndState({
	        position: { x:500  , y: 60 },
	        size: { width: 30, height: 30 },
	        attrs: {
	            '.outer': {
	                stroke: "#4b4a67",
	                'stroke-width': 2
	            },
	            '.inner': {
	                fill: '#4b4a67'
	            }
	        }
	    })

	};
	_.each(states, function(c) { graph.addCell(c); });

	var linkAttrs =  {
	    'fill': 'none',
	    'stroke-linejoin': 'round',
	    'stroke-width': '2',
	    'stroke': '#4b4a67'
	};

	var transitons = [
	    new uml.Transition({
	        source: { id: states.s0.id },
	        target: { id: states.s1.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s1.id },
	        target: { id: states.s2.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s2.id },
	        target: { id: states.s3.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s2.id },
	        target: { id: states.s4.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s3.id },
	        target: { id: states.se.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s4.id },
	        target: { id: states.se.id },
	        attrs: {'.connection': linkAttrs }
	    })
	];

	graph.addCells(transitons);

  }
}

FlowChart.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(FlowChart);

