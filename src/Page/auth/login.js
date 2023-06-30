import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Form, Input, Button
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import authActions from '../../redux/auth/actions';
import notification from '../../notification';
import {withRouter} from '../../withRouter';

const {loginRequest, removeErrors} = authActions;

class Login extends Component {
   componentDidMount() {
    if (this.props.isLoggedIn === true) {
      this.props.navigate('/users/profile');
    }
  }
  onFinish = (values) => {
   this.props.loginRequest(values.email.trim(), values.password.trim());
    notification('info', 'Logging you in...', 'Please wait...', 120, 'topRight');
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification('Failed', errorInfo, 'Please wait...', 120, 'topRight');
  };

  
  render() {
  
    return (
      <Form 
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        className = "login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600, 
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          verticalAlign: 'middle', 
          paddingTop: '200px'
        }}
        >
          <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
          >
          <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} loading={this.props.loading} >
              Log in
            </Button>
            Or <a href="/register">register now!</a>
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
    {loginRequest, removeErrors}
)(withRouter(Login));