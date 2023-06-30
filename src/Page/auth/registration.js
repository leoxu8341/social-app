import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  Input,
  Button,
  // message
} from 'antd';
import authActions from '../../redux/auth/actions';

const {registerRequest} = authActions;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  onFinish = (values) => {
    //console.log(values.email, values.password, values.first_name, values.last_name);
    this.props.registerRequest(
      values.email.trim(),
       values.password.trim(), 
       values.first_name.trim(), 
       values.last_name.trim()
       );
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  

  render() {
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
   

    return (
      <Form 
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        style = {{
          'margin': '0 auto',
          'width': '100%',
          'textAlign': 'center',
          'verticalAlign': 'middle',
          'maxWidth': '600px',
          'height': '100%',
          'paddingTop': '200px'
        }}>
        <Form.Item
          {...formItemLayout}
          label="Email"
          name="email"
          rules={[{ required: true,  message: 'Please input your Email!' }, {
            type: 'email'
          }]}
        >
          
            <Input />
          
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password"
          name="password"
          rules={[{
            required: true, message: 'Please input your password!', whitespace: true
          }]}
        >
         
            <Input type="password" />

        </Form.Item>
        {/* <Form.Item
          {...formItemLayout}
          label="Confirm Password"
          name="confirm"
          rules={ [{
              required: true, message: 'Please confirm your password!'
            }, {
              validator: this.compareToFirstPassword,
            }]}
        >
         
            <Input type="password" onBlur={this.handleConfirmBlur} />
        
        </Form.Item> */}
        <Form.Item
          {...formItemLayout}
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          
            <Input />
          
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >

          <Input />

        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.props.loading} style={{marginRight: 10}}>Register</Button>
          Or <a href="/login">Already registered? Login Now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.get('apiToken') !== null,
        errors: state.auth.get('error'),
        loading: state.auth.get('loading')
    }),
    {registerRequest}
)(Registration);