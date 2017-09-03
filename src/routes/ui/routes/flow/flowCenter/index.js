import React from 'react';
import {Tabs, Card, Table, Icon,Button} from 'vdap-ui';
import FlowContent from './FlowContent';
import {connect} from 'react-redux';
import reducer from './models/flowModel';
import {injectReducer} from 'reducers';
import { fetchFlowData} from './models/flowModel';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;


class Flow extends React.Component{
  constructor(props) {
    super(props);
  };
  
  state={
    activeKey:'unfinished',
  }

  tabClick = (activeKey) => {
      console.log(activeKey);
    this.setState({ activeKey });
    const {dispatch} = this.props;
    dispatch(fetchFlowData(activeKey));
  };

  componentWillMount() {
    const {store} = this.context;
    injectReducer(store, {key: 'flowModel', reducer});
  }

  componentDidMount() {
    const {dispatch} = this.props;
    // dispatch(fetchFlowCol());
    // this.tabClick("unfinished");
    dispatch(fetchFlowData("unfinished"));
  }


  render(){
  	 return (
      <div>
      	<div style={{marginLeft: '30px'}}>
	        
          <Tabs activeKey={this.state.activeKey} type="card" onChange={this.tabClick}>
            <TabPane tab="未完成" key="unfinished" >
              <div><FlowContent /></div>
            </TabPane>
            <TabPane tab="完成" key="finished" >
              <div><FlowContent /></div>
            </TabPane>
            <TabPane tab="全部" key="allData" >
              <div><FlowContent /></div>
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}

Flow.contextTypes = {
  store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
  flowModel: state.flowModel,
});
export default connect(mapStateToProps)(Flow);

