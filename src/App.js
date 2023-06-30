import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { DatabaseOutlined, UserOutlined, MailOutlined, TeamOutlined, UsergroupAddOutlined, ProfileOutlined, LoginOutlined, FundViewOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Avatar } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const App: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  // function getItem(label, key, icon, children, onClick) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //     onClick
  //   };
  // }

  // const items = [
  //   getItem('Option 1', '1', <PieChartOutlined />),
  //   getItem('Option 2', '2', <DesktopOutlined />),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ])
  // ];


  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
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
          defaultSelectedKeys={['users']}
          items={[
            {
              key: 'profile',
              icon: <UserOutlined />,
              label: 'My Profile',
              onClick: () => { console.log('profile clicked'); navigate('/profile'); }
            },
            {
              key: 'users',
              icon: <TeamOutlined />,
              label: 'Users',
              onClick: () => { console.log('users clicked'); navigate('/users/profile'); }
            },
            {
              key: 'inbox',
              icon: <MailOutlined />,
              label: 'Inbox',
              onClick: () => { console.log('inbox clicked'); navigate('/inbox'); }
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
                  onClick: () => { console.log('inbox clicked'); navigate('/reports/logins'); }
                },
                {
                  key: 'report_top_senders',
                  icon: <UsergroupAddOutlined />,
                  label: 'Top Senders',
                  onClick: () => { console.log('inbox clicked'); navigate('/reports/top/senders'); }
                },
                {
                  key: 'report_profiles_created',
                  icon: <ProfileOutlined />,
                  label: 'Recent Profiles',
                  onClick: () => { console.log('inbox clicked'); navigate('/reports/profiles/created'); }
                },
                {
                  key: 'report_profile_view_users',
                  icon: <FundViewOutlined />,
                  label: 'Profile Views',
                  onClick: () => { console.log('inbox clicked'); navigate('/reports/profiles/users'); }
                },
              ]
            }
          ]}
        />
      </Sider>
      <Layout style={{ background: '#d5dbe8' }}>
        <Header style={{ padding: 0, background: 'white' }} />
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
    loading: state.auth.get('loading')
  }),
  {}
)(App);