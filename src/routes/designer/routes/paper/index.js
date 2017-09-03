import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainApp from './components/MainApp';

import Dashboard from './routes/dashboard/';
import Editor from './routes/editor/';


class Paper extends Component {
  render() {
    const {match} = this.props;

    return (
      <MainApp>
        <Switch>
          <Route exact={true} path={`${match.url}/`} name="概览" component={Dashboard}/>
          <Route path={`${match.url}/new`} name="设计器" component={Editor}/>

        </Switch>
      </MainApp>
    )
  }
}

export default Paper;
