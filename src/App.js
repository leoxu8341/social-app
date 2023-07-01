import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import authAction from './redux/auth/actions';
import { DatabaseOutlined, UserOutlined, LogoutOutlined, MailOutlined, TeamOutlined, UsergroupAddOutlined, ProfileOutlined, LoginOutlined, FundViewOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Avatar, Row, Col, Tooltip } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const { logoutRequest } = authAction;
const App: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isLoggedIn) {
      navigate('/login');
    }
  }, []);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={280}
        onBreakpoint={(broken) => {
          //console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          //console.log(collapsed, type);
        }}
      >

        {props.user ?
          <div style={{ marginTop: 20, marginLeft: 30, marginBottom: 20 }}>
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
            <span style={{ color: 'white', textAlign: 'center', marginLeft: 10 }}>{props.user.first_name} {props.user.last_name}</span>
          </div>
          : null}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['profile']}
          selectedKeys={[props.currentKey]}
          items={[
            {
              key: 'profile',
              icon: <UserOutlined />,
              label: 'My Profile',
              onClick: () => { navigate('/profile'); }
            },
            {
              key: 'users',
              icon: <TeamOutlined />,
              label: 'Users',
              onClick: () => { navigate('/users/profile'); }
            },
            {
              key: 'inbox',
              icon: <MailOutlined />,
              label: 'Inbox',
              onClick: () => { navigate('/inbox'); }
            },
            {
              key: 'reports',
              icon: <DatabaseOutlined />,
              label: 'Reports',
              children: [
                {
                  key: 'report_logins',
                  icon: <LoginOutlined />,
                  label: 'Recent Logins',
                  onClick: () => { navigate('/reports/logins'); }
                },
                {
                  key: 'report_top_senders',
                  icon: <UsergroupAddOutlined />,
                  label: 'Top Senders',
                  onClick: () => {navigate('/reports/top/senders'); }
                },
                {
                  key: 'report_profiles_created',
                  icon: <ProfileOutlined />,
                  label: 'Recent Profiles',
                  onClick: () => {navigate('/reports/profiles/created'); }
                },
                {
                  key: 'report_profile_view_users',
                  icon: <FundViewOutlined />,
                  label: 'Profile Views',
                  onClick: () => { navigate('/reports/profiles/users'); }
                },
              ]
            }
          ]}
        />
      </Sider>
      <Layout style={{ background: '#d5dbe8' }}>
        <Header style={{ padding: 0, background: 'white' }} >
          <Row>
            <Col span={2} offset={22}>
              <Tooltip title="Logout">
                <LogoutOutlined onClick={() => { props.logoutRequest(); navigate('/login') }} />
              </Tooltip>
            </Col>
          </Row>
          </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 680, background: 'white' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(
  state => ({
    user: state.auth.get('user'),
    errors: state.auth.get('error'),
    loading: state.auth.get('loading'),
    isLoggedIn: state.auth.get('apiToken') !== null,
    currentKey: state.app.get('current')
  }),
  { logoutRequest }
)(App);