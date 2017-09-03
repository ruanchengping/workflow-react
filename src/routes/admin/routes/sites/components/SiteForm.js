import React, {Component} from 'react';
import {Row, Col, Form, Input, Button} from 'antd';

const FormItem = Form.Item;
class SiteForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const {form, history, site} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('Received values of props: ', site);

      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {

      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="站点标题">
          {getFieldDecorator('title', {
            rules: [{required: true, message: 'title is required!'}],
          })(<Input />)}
        </FormItem>
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button style={{marginRight: 8}} onClick={this.handleReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit">保存</Button>


          </Col>
        </Row>
      </Form>
    )
  }
}

const onFieldsChange = (props, changedFields) => {
  props.onChange(changedFields);
}

const mapPropsToFields = (props) => {
  return {
    title: {

      value: props.site.title

    },
    site: {
      ...props.site,
    }
  };
}
const onValuesChange = (_, values) => {
  console.log(values);
}

export default Form.create({
  onFieldsChange,
  mapPropsToFields,
  onValuesChange
})(SiteForm);
