import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainApp from './components/MainApp';

import Bpmn from './routes/bpmn/';
import Paper from './routes/paper/';

class Designer extends Component {
  render() {
    const {match} = this.props;
    return (
      <div className="app">
        <Switch>
          <Route path={`${match.url}/bpmn`} name="规则设计器" component={Bpmn}/>
          <Route path={`${match.url}/paper`} name="打印设计器" component={Paper}/>
          <Redirect from={match.url} to={`${match.url}/bpmn`}/>
        </Switch>
      </div>
    )
  }
}

export default Designer
