import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Icon} from 'vdap-ui';
import SiteForm from './components/SiteForm';

class Sites extends Component {


  handleFormChange = (changedFields) => {
    console.log(changedFields);
  };

  render() {
    const {site} = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col span={16}>
            <Card title={site.title} extra={<Icon type="info-circle" style={{fontSize: 16, color: '#08c'}}/>}>
              <SiteForm {...this.props} onChange={this.handleFormChange}/>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  site: state.site || {},
});
export default connect(mapStateToProps)(Sites);
