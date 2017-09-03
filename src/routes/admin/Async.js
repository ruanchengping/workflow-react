import React, {Component} from 'react';
import Loadable from 'components/Loadable';

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "admin" */'./Page')

});


class Page extends Component {
  state = {
    Component: null
  };

  componentWillMount() {
    // import(/* webpackChunkName: "admin" */'./Page').then(component => {
    //   this.setState({Component:component.default});
    // });
  }

  componentDidMount() {

  }

  render() {
    // let {Component} = this.state;
    //
    //
    // if (!Component) {
    //   return <div>Loading...</div>;
    // } else {
    //   return <Component {...this.props}/>;
    // }

    return (<LoadableComponent/>)
  }
}

export default Page;

