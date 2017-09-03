import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card} from 'vdap-ui';
import {Button, Icon,Avatar} from 'antd';

import Users from './components/Users';
import UserCard from './components/UserCard';

const ButtonGroup = Button.Group;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];


class Page extends Component {
  state = {
    model: 'list'
  };
  toggleModel = (model) => {
    this.setState({
      model: model
    })
  };
  setListClick = (e) => {
    this.toggleModel('list');
  };
  setCardClick = (e) => {
    this.toggleModel('card');
  };

  render() {
    const {users, dispatch} = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col span={24}>

            <ButtonGroup>
              <Button icon="bars" onClick={this.setListClick} key="list"/>

              <Button icon="appstore-o" onClick={this.setCardClick} key="card"/>
            </ButtonGroup>
          </Col>
        </Row>

        {
          this.renderContent(dataSource)
        }


      </div>
    )
  }

  renderContent = (users) => {
    if (this.state.model === 'list') {
      return (<Row><Col><Users list={users}/></Col></Row>)
    } else {
      return (
        <Row gutter={10}>
          {
            users.map((user, i) => {
              return (<Col span={6} key={user.key}><UserCard user={user}/></Col>)
            })
          }
        </Row>

      )
    }
  }
}


const mapStateToProps = (state, ownProps) => ({
  users: state.users,
});
export default connect(mapStateToProps)(Page);

