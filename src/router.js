import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReduxRouter, ReduxRouterSelector } from '@lagunovsky/redux-react-router'
import {connect} from 'react-redux';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import App from './App';
import Login from './Page/auth/login';
import UserProfiles from './Page/profile/userProfiles';
import Logins from './Page/report/logins';
import ProfilesCreated from './Page/report/profilesCreated';
import Senders from './Page/report/senders';
import Users from './Page/report/users';
import UsersView from './Page/report/usersView';
import Inbox from './Page/letter/inbox';
import Profile from './Page/profile/profile';
import ProfileDetail from './Page/profile/profileDetail';
import Registration from './Page/auth/registration';
import Letter from './Page/letter/letterDetail';


const PublicRoutes = ({history, isLoggedIn}) => {
    const routerSelector: ReduxRouterSelector<State> = (state) => state.navigator

    return (
       
        <ReduxRouter history={history} routerSelector={routerSelector} >
            {/* <div style={{'height': '100%'}}> */}
     
                <Routes>
                    {/* Public Routes */} 
                <Route exact path={'/login'} element={<Login />} />
                    <Route exact path={'/register'} element={<Registration />} />
                    <Route path="*" element={<h1>404 - Not Found</h1>} replace />
                    {/* Authenticated Routes */}
                    <Route element={<AuthenticatedRoutes isLoggedIn />}>
                        <Route exact path={'/'} element={<App />} >
                            <Route exact path={'/profile'} element={<Profile />} />
                            <Route exact path={'/users/profile'} element={<UserProfiles />} />
                            <Route exact path={'/users/profile/:id'} element={<ProfileDetail />} />
                            <Route exact path={'/inbox'} element={<Inbox />} />
                            <Route exact path={'/letters/:id'} element={<Letter />} />
                            <Route exact path={'/reports/logins'} element={<Logins />} />
                            <Route exact path={'/reports/top/senders'} element={<Senders />} />
                            <Route exact path={'/reports/profiles/created'} element={<ProfilesCreated />} />
                            <Route exact path={'/reports/profiles/users'} element={<Users />} />
                            <Route exact path={'/reports/profiles/users/:id/view'} element={<UsersView />} />
                        </Route> 
                        
                    </Route>
                </Routes>

            {/* </div> */}
        </ReduxRouter>
    );
};

export default connect(state => ({
    isLoggedIn: state.auth.get('apiToken') !== null
}))(PublicRoutes);
