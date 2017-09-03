import React, { Component } from 'react';
import {NavLink as Link} from 'react-router-dom';
import {Layout,Icon} from 'vdap-ui';

const Wapper =Layout.Header;

class Header extends Component {

  constructor(props) {
    super(props);

  }




  render() {
    return (
      <Wapper style={{backgroundColor:'white'}}>

        <Link  to="/">返回</Link>

      </Wapper>
    )
  }
}

export default Header;
