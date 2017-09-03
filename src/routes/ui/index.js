import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {MainApp} from './components';

import JointjsDemo from './routes/jointjs/';
import Devs from './routes/jointjs/devs/index.js';
import Erd from './routes/jointjs/erd/index.js';
import Fsa from './routes/jointjs/fsa/index.js';
import HtmlDemo from './routes/jointjs/html/index.js';
import Hull from './routes/jointjs/hull/index.js';
import Links from './routes/jointjs/links/index.js';
import Logic from './routes/jointjs/logic/index.js';
import Org from './routes/jointjs/org/index.js';
import Paper from './routes/jointjs/paper/index.js';
import PortDefault from './routes/jointjs/ports/index.js';
import Puzzle from './routes/jointjs/puzzle/index.js';
import Routing from './routes/jointjs/routing/index.js';
import Shapes from './routes/jointjs/shapes/index.js';
import Umlcd from './routes/jointjs/umlcd/index.js';
import Umlsc from './routes/jointjs/umlsc/index.js';
import ThreeD from './routes/jointjs/3d.js';
import BasicDemo from './routes/jointjs/basic.js';
import Clipping from './routes/jointjs/clipping.js';
import Filters from './routes/jointjs/filters.js';
import Gradients from './routes/jointjs/gradients.js';
import HypeLinks from './routes/jointjs/hyperlinks.js';
import Interpreter from './routes/jointjs/interpreter.js';
import Iphone from './routes/jointjs/iphone.js';
import JumpOver from './routes/jointjs/jump-over-connector.js';
import Graph from './routes/jointjs/graph.js';
import LineDraw from './routes/jointjs/line-draw.js';
import LinksSticky from './routes/jointjs/links-sticky-points.js';
import LinksDemo from './routes/jointjs/links.js';
import Nested from './routes/jointjs/nested.js';
import Nested2 from './routes/jointjs/nested2.js';
import NestedClone from './routes/jointjs/nested-clone.js';
import Performance from './routes/jointjs/performance.js';
import Ports from './routes/jointjs/ports.js';
import RouteOrth from './routes/jointjs/router-orthogonal.js';
import Sketched from './routes/jointjs/sketched.js';
import Solar from './routes/jointjs/solar.js';
import TextPath from './routes/jointjs/textpath.js';
import Transition1 from './routes/jointjs/transition.js';

import Flow from './routes/flow/flowCenter';
import FlowModel from './routes/flow/flowCenter/FlowModel';
import SetService from './routes/flow/flowCenter/SetService';
import FlowDesign from './routes/flow/flowDesign';
import TaskManagement from './routes/flow/task/TaskManagement';
class UI extends Component {
  render() {
    const {match} = this.props;

    return (
      <MainApp {...this.props}>
        <Switch>
         
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-0`} component={JointjsDemo}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-1`} component={Devs}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-2`} component={Erd}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-3`} component={Fsa}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-4`} component={HtmlDemo}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-5`} component={Hull}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-6`} component={Links}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-7`} component={Logic}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-8`} component={Org}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-9`} component={Paper}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-10`} component={PortDefault}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-11`} component={Puzzle}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-12`} component={Routing}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-13`} component={Shapes}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-14`} component={Umlcd}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-15`} component={Umlsc}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-16`} component={ThreeD}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-17`} component={BasicDemo}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-18`} component={Clipping}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-19`} component={Filters}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-20`} component={Gradients}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-21`} component={HypeLinks}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-22`} component={Interpreter}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-23`} component={Iphone}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-24`} component={JumpOver}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-25`} component={Graph}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-26`} component={LineDraw}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-27`} component={LinksSticky}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-28`} component={LinksDemo}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-29`} component={Nested}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-30`} component={Nested2}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-31`} component={NestedClone}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-32`} component={Performance}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-33`} component={Ports}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-34`} component={RouteOrth}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-35`} component={Sketched}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-36`} component={Solar}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-37`} component={TextPath}/>
          <Route path={`${match.url}/extendcomp/extendcomp-6/extendcomp-6-38`} component={Transition1}/>

          <Route path={`${match.url}/flow/flow-1`} component={Flow}/>
          <Route path={`${match.url}/flow/flow-2`} component={FlowModel}/>
          <Route path={`${match.url}/flow/flow-3`} component={SetService}/>
          
          <Route path={`${match.url}/task`} component={TaskManagement}/>
          <Route path={`${match.url}/flowDesign`} component={FlowDesign}/>


          <Redirect from={match.url} to={`${match.url}/homepage`}/>
        </Switch>
      </MainApp>
    )
  }
}

export default UI
