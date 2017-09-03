import React, { Component } from 'react';
import { Row,Col,Card,Progress } from 'vdap-ui';

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">

        <Row gutter={24}>
          <Col span={6}>
            <Card>

                <div className="h4 m-0">任务项...</div>
                <div>开发A</div>
                <Progress  percent={25} status="active" />
                <small className="text-muted">内容介绍...</small>

            </Card>
          </Col>
          <Col span={6}>
            <Card>

              <div className="h4 m-0">任务项...</div>
              <div>开发A</div>
              <Progress  percent={25} status="active" />
              <small className="text-muted">内容介绍...</small>

            </Card>
          </Col>
          <Col span={6}>
            <Card>

              <div className="h4 m-0">任务项...</div>
              <div>开发A</div>
              <Progress  percent={75} status="exception" />
              <small className="text-muted">内容介绍...</small>

            </Card>
          </Col>
          <Col span={6}>
            <Card>

              <div className="h4 m-0">任务项...</div>
              <div>开发A</div>
              <Progress  percent={100} />
              <small className="text-muted">内容介绍...</small>

            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}

export default Dashboard;
