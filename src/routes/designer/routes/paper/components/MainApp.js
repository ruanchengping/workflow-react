import React from 'react';
import {Layout, Menu, Icon} from 'vdap-ui';

import Header from './Header';
import Sidebar from './Sidebar';
import Aside from './Aside';

const {Content} = Layout;
const MenuItem = Menu.Item;

class MainApp extends React.Component {
  render() {
    const {children, location, routes, params} = this.props;

    return (

      <Layout className="app">
        <Sidebar>
          <Icon type="appstore" style={{fontSize:'48px',color:'#63c2de',padding:'8px'}}/>

          <Menu mode="inline">
            <Menu.Item key="1">
              <Icon type="bars" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="area-chart" />
            </Menu.Item>
          </Menu>
        </Sidebar>
        <Layout className="main">
          <Header/>
          <Content className="container-fluid">
            {children}
          </Content>

        </Layout>
      </Layout>

    );
  }
}

export default MainApp;
