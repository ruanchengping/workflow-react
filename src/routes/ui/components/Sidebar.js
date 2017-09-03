import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Layout, Row, Affix, Col, Menu, Icon, Tooltip, Button} from 'vdap-ui';

import Favorites from './Favorites';
import {connect} from 'react-redux';

const SubMenu = Menu.SubMenu;
const {Sider} = Layout;

class Sidebar extends Component {

  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = () => {
    let collapsed = !this.state.collapsed;
    this.setState({
      mode: collapsed ? 'vertical' : 'inline',
      collapsed: collapsed,
    });
  };

  getMenus = (menuArray, parentPath) => {
    parentPath = parentPath || '/ui/';
    if (!menuArray) return null;
    return menuArray.map(item => {
      if (item.child) {
        return (
          <SubMenu key={item.key}
                   title={<span> {item.icon ? <Icon type={item.icon}/> : ''}<span>{item.name}</span></span>}>
            {this.getMenus(item.child, parentPath + item.key + '/')}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            {item.url ?
              <a href={item.url}>{item.icon ? <Icon type={item.icon}/> : ''}{item.name}</a> :
              <NavLink to={parentPath + item.key}>
                {item.icon ? <Icon type={item.icon}/> : ''}{item.name}
              </NavLink>
            }
          </Menu.Item>
        )
      }
    })
  };

  render() {

    let {menu, topmenu} = this.props.sideNavPin;
    const menuItems = this.getMenus(menu);
    return (

      <Sider width={240} collapsed={this.state.collapsed}
             style={{backgroundColor: 'white', position: 'relative', marginTop: '70px'}}>

        <Button onClick={this.onCollapse} style={{
          zIndex: '999',
          position: 'absolute',
          top: '-60px',
          right: '0',
          width: '60px',
          height: '50px',
          border: 'none',
          borderRadius: '0',
          background: 'rgb(42, 91, 181)',
          color: '#abc8fd'
        }}>
          <img alt="example" src={require('assets/images/ui/collapse.png')} style={{width: '60px', height: '50px'}}/>
        </Button>

        <Menu theme="light" mode={this.state.mode} style={{border: 'none'}}
              className={this.state.collapsed ? 'show' : 'scroll'}>
          {topmenu ?
            <Menu.Item key={topmenu.key}>
              <div className='topmenu' style={{fontSize: '16px'}}>{topmenu.name}</div>
            </Menu.Item>
            : ''
          }
          {menuItems}
        </Menu>

      </Sider>
    )
  }
}

Sidebar.__ANT_LAYOUT_SIDER = true;
const mapStateToProps = (state, ownProps) => {
  return {
    sideNavPin: state.ui.sideNavPin,
  };
}
export default connect(
  mapStateToProps
)(Sidebar);

