import React from 'react'
import {HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';


const browserHistory = createBrowserHistory();

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (

    <route.component {...props} routes={route.routes}/>
  )}/>
);

class App extends React.Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired,
  //   routes: PropTypes.object.isRequired,
  // }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {store, routes,match} = this.props;

    return (
      <Provider store={store}>

        <Router history={browserHistory}>
          <Switch>

            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} store={store}/>
              )
            )}

          </Switch>

        </Router>

      </Provider>
    )
  }


}

export default App
