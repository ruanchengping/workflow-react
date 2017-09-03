import React from 'react';
import { Layout } from 'vdap-ui';

import Header from './Header';
import Sidebar from './Sidebar';
import Aside from './Aside';

const { Footer, Sider, Content } = Layout;

class MainApp extends React.Component {
  render() {
    const {children, location, routes, params} = this.props;

    return (

    <Layout className="app">
      <Sidebar/>
      <Layout>
        <Header/>
        <Content>
          {children}
        </Content>

      </Layout>
    </Layout>

    );
  }
}

export default MainApp;
