import React from 'react';
import {withRouter} from 'react-router'
import {Tabs, Form, Button, Input, Icon, Menu, QueueAnim, Row, Col, Card, Checkbox} from 'vdap-ui';
import {NavLink as Link} from 'react-router-dom';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Login extends React.Component {
  constructor() {
    super();

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {form, history} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        history.push('/ui');
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (

      <div style={{
        width: document.body.width,
        height: '100vh',
        position: 'relative',
        backgroundImage: 'linear-gradient(-90deg, #4f8aee 3%, #2a5bb5 100%)',
        overflow:'hidden'
      }}>

          <div style={{position: 'absolute', left: '15%', width:'1100px',top: '12%',overflow:'hidden'}}><img src={require('assets/images/ui/loginbg.png')}/></div>
          <div style={{marginTop: '-150px', marginLeft: '-160px', position: 'absolute', left: '70%', top: '50%'}}>
            <Tabs style={{
              width: '350px',
              height: '370px',
              padding: '30px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              boxShadow: '0 0 20px 0 rgba(0,0,0,0.04), 0 20px 31px 0 rgba(0,0,0,0.30)'
            }} defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="二维码登陆" key="0">
                <div style={{margin: '30px'}}>
                  <img src={require('assets/images/ui/13.png')}/>
                </div>
                <br />
                <div style={{float: 'left'}}>
                  <div style={{
                    float: 'left',
                    marginLeft: '18px',
                    border: '1px solid #999999',
                    width: '48px',
                    height: '2px'
                  }}/>
                  <span style={{
                    float: 'left',
                    marginLeft: '18px',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: '14px',
                    textAlign: 'left'
                  }}>手机扫码，安全登录</span>
                  <div style={{
                    float: 'left',
                    marginLeft: '18px',
                    border: '1px solid #999999',
                    width: '48px',
                    height: '2px'
                  }}/>
                </div>
                <br />
                <center style={{marginLeft: '28px', marginTop: '10px', fontSize: '14px', color: '#999999'}}>
                  使用OES手机版扫描二维码
                  <Button style={{marginLeft: '8px', fontSize: '16px'}} shape="circle" icon="question"/>
                </center>
              </TabPane>
              <TabPane tab="账号登陆" key="1">

                <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{required: true, message: '请输入账号!'}],
                    })(
                      <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="账号"/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: '请输入密码!'}],
                    })(
                      <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                    )}
                  </FormItem>

                  <Row>
                    <Col span={12}>
                      <FormItem>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>5天内自动记住密码</Checkbox>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={12} className="text-right">
                      <Link to="/password" className="px-0">忘记密码?</Link>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" style={{
                    height: '38px',
                    width: '100%',
                    backgroundImage: 'linear-gradient(-90deg, #4f8aee 3%, #2a5bb5 100%)'
                  }}>
                    登录
                  </Button>


                </Form>


              </TabPane>


            </Tabs>

          </div>

        </div>


    );
  }
}
const WrappedLoginForm = Form.create()(Login);


export default withRouter(WrappedLoginForm);
