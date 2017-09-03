import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Layout} from 'vdap-ui';

const {Sider} = Layout;

class Sidebar extends Component {

  render() {
    return (
      <Sider collapsed={false} style={{backgroundColor: '#263238'}}>
        {this.props.children}
      </Sider>
    )
  }
}

Sidebar.__ANT_LAYOUT_SIDER = true;

export default Sidebar;
